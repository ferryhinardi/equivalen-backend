import PhoneNumber from 'awesome-phonenumber';
import { getToken, verify } from 'modules/shared/libs/jwt';
import bcrypt from 'bcrypt';

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
              const hashedPassword = bcrypt.hashSync(user.password, 8);
              user.password = hashedPassword;
            } catch (e) {
              console.error(e);
            }
          }
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

    if (!user) throw new Error('User not found');
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
    if (userWithEmail) throw new Error('email already registered');
    const userWithUsername = await User.findOne({
      where: {
        username
      }
    });
    if (userWithUsername) throw new Error('username already registered');
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
    if (!user) throw new Error('User not found');
    if (bcrypt.compareSync(password, user.password)) return user;
    return null;
  };
  User.findDevice = async function findDevice({ user, deviceId }) {
    const { UserDevice } = require('models');
    const userDevice = await UserDevice.findOne({
      where: {
        user_id: user.id
      }
    });
    if (!userDevice) throw new Error('Device not found');
    if (userDevice.deviceId !== deviceId) throw new Error('Device not belong to you');
    return userDevice;
  };
  return User;
};
