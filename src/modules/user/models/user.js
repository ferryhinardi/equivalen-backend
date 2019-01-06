import config from 'config/app';
import PhoneNumber from 'awesome-phonenumber';
import { getToken, verify } from 'modules/shared/libs/jwt';
import { encrypt } from 'modules/shared/helpers/encryption';
import bcrypt from 'bcrypt';
import moment from 'moment';

function getHashedPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export default (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: Sequelize.STRING,
      username: Sequelize.STRING,
      phoneNumber: {
        type: Sequelize.STRING,
        field: 'phone_number'
      },
      fullName: {
        type: Sequelize.STRING,
        field: 'full_name'
      },
      password: Sequelize.STRING,
      photoUrl: {
        type: Sequelize.STRING,
        field: 'photo_url'
      },
      placeBod: {
        type: Sequelize.STRING,
        field: 'place_bod'
      },
      dateBod: {
        field: 'date_bod',
        type: Sequelize.DATE
      },
      biography: Sequelize.STRING,
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'users',
      deletedAt: 'deleted_at',
      paranoid: true,
      hooks: {
        beforeCreate: user => {
          if (user.phoneNumber) {
            try {
              const pn = new PhoneNumber(user.phoneNumber, 'ID');
              if (pn.isValid()) {
                user.phoneNumber = pn.getNumber();
              }
            } catch (e) {
              console.error(e);
            }
          }
          if (user.password) {
            try {
              const hashedPassword = getHashedPassword(user.password);
              user.password = hashedPassword;
            } catch (e) {
              console.error(e);
            }
          }
        },
        beforeUpdate: user => {
          if (user.phoneNumber) {
            try {
              const pn = new PhoneNumber(user.phoneNumber, 'ID');
              if (pn.isValid()) {
                user.phoneNumber = pn.getNumber();
              }
            } catch (e) {
              console.error(e);
            }
          }
          if (user.password) {
            try {
              const hashedPassword = getHashedPassword(user.password);
              user.password = hashedPassword;
            } catch (e) {
              console.error(e);
            }
          }

          return user;
        }
      }
    }
  );
  User.associate = models => {
    User.Gender = models.User.belongsTo(models.Gender, {
      foreignKey: 'gender_id',
      as: 'gender'
    });

    User.AuthProvider = models.User.belongsToMany(models.AuthProvider, {
      through: models.UserAuthProvider,
      foreignKey: 'user_id'
    });
    User.UserAuthProvider = models.User.hasMany(models.UserAuthProvider, {
      foreignKey: 'user_id'
    });

    User.UserStudent = models.User.hasOne(models.UserStudent, {
      foreignKey: 'user_id',
      as: 'student'
    });
    User.UserTeacher = models.User.hasOne(models.UserTeacher, {
      foreignKey: 'user_id',
      as: 'teacher'
    });
    User.UserProfile = models.User.hasOne(models.UserProfile, {
      foreignKey: 'user_id',
      as: 'profile'
    });
    User.License = models.User.belongsToMany(models.License, {
      through: models.UserDevice,
      foreignKey: 'user_id'
    });
    User.UserDevice = models.User.hasMany(models.UserDevice, {
      foreignKey: 'user_id'
    });

    User.School = models.User.belongsToMany(models.School, {
      through: models.UserSchool,
      foreignKey: 'user_id'
    });
    User.UserSchool = models.User.hasMany(models.UserSchool, {
      foreignKey: 'user_id'
    });
    User.Question = models.User.hasMany(models.Question, {
      foreignKey: 'created_by'
    });

    User.VideoTutorial = models.User.belongsToMany(models.VideoTutorial, {
      through: models.VideoRecommended,
      foreignKey: 'user_id'
    });
    User.VideoRecommended = models.User.hasMany(models.VideoRecommended, {
      foreignKey: 'user_id'
    });
  };
  User.prototype.getToken = function getUserToken() {
    return getToken({
      id: this.id
    });
  };
  User.prototype.isValidToken = function isValidToken(token) {
    const decoded = verify(token);
    return decoded.id === this.id;
  };
  User.prototype.isStudent = function isStudent() {
    return this.getStudent().then(result => !!result);
  };
  User.prototype.isTeacher = function isTeacher() {
    return this.getTeacher().then(result => !!result);
  };
  User.getCurrentUser = async function getCurrentUser(token) {
    const { id } = verify(token);
    const user = await User.findOne({
      where: { id }
    });

    if (!user) throw new Error('Anda belum terdaftar');
    return user;
  };
  User.register = async function register(userData, userAuthProvider) {
    const { AuthProvider, Gender } = require('models');
    const { email, username, gender: genderName } = userData;
    const userWithEmail = await User.findOne({
      where: {
        email
      }
    });
    if (userWithEmail) throw new Error('email sudah terdaftar');
    const userWithUsername = await User.findOne({
      where: {
        username
      }
    });
    if (userWithUsername) throw new Error('username sudah terdaftar');
    const [[authProvider], user, gender] = await Promise.all([
      AuthProvider.findOrCreate({
        where: {
          name: 'Account Kit'
        }
      }),
      User.create(userData),
      Gender.findOne({
        where: {
          name: genderName
        }
      })
    ]);
    user.setGender(gender);
    await user.addAuthProvider(authProvider, {
      through: {
        sourceId: userAuthProvider.id,
        payload: JSON.stringify(userAuthProvider)
      }
    });
    return user;
  };
  User.findByAuth = async function findByAuth({ username, password }) {
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (!user) throw new Error('Anda belum terdaftar');
    if (!bcrypt.compareSync(password, user.password))
      throw new Error('Password anda salah');

    return user;
  };
  User.findDevice = async function findDevice({ user, deviceId }) {
    const { UserDevice } = require('models');
    const userDevice = await UserDevice.findOne({
      where: {
        user_id: user.id
      }
    });
    if (!userDevice) throw new Error('Device anda belum terdaftar');
    if (userDevice.deviceId !== deviceId) throw new Error('Device bukan milik anda');
    return userDevice;
  };
  User.verificationEmail = async function verificationEmail(email, { transaction }) {
    const { Sequelize: SequelizeModel, ForgotPassword } = require('models');
    const user = await User.findOne({
      where: {
        email
      },
      ...(transaction ? { transaction } : {})
    });
    if (!user) throw new Error('Email tidak ditemukan');
    
    /**
     * Insert into table forgot password to send email
     */
    const expired = moment().add(1, 'hours').format();
    const timestamp = moment().format();
    const encryptKey = encrypt({
      token: user.getToken(),
      timestamp
    });
    const hashUrl = `${config.API_URL}/forgot?key=${encryptKey}`;
    const [forgotPassword] = await ForgotPassword.findOrCreate({
      where: {
        user_id: user.id,
        expired: {
          [SequelizeModel.Op.gt]: moment().toDate()
        }
      },
      defaults: {
        user_id: user.id,
        hashUrl,
        expired
      },
      ...(transaction ? { transaction } : {})
    });
    await forgotPassword.sendEmailForgot(transaction);
    
    return user;
  };
  User.forgotPassword = async function forgotPassword(userId, newPassword) {
    const transaction = await sequelize.transaction();
    const userFound = await User.findOne({
      where: { id: userId },
    }, { transaction });
    
    if (!userFound) {
      throw new Error('Anda belum terdaftar');
    }

    const user = await userFound.update({ password: newPassword }, { transaction });

    transaction.commit();    

    return user;
  };
  User.changePassword = async function changePassword(oldPassword, newPassword, { user: userData, transaction }) {
    const { password } = userData || {};
    if (!bcrypt.compareSync(oldPassword, password)) {
      throw new Error('salah password');
    }

    const user = await userData.update(
      { password: newPassword },
      ...(transaction ? { transaction } : {})
    );

    return user;
  };
  User.updatePersonalData = async function updatePersonalData({ userData }, { user, transaction }) {
    const res = await user.update(userData, 
      ...(transaction ? { transaction } : {})
    );

    return res;
  };
  return User;
};
