import PhoneNumber from 'awesome-phonenumber';
import {
  getToken,
  verify
} from 'modules/shared/libs/jwt';
import bcrypt from 'bcrypt';

export default (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    phoneNumber: {
      type: Sequelize.STRING,
      field: 'phone_number',
    },
    fullName: {
      type: Sequelize.STRING,
      field: 'full_name',
    },
    password: Sequelize.STRING,
    birthDate: {
      type: Sequelize.DATE,
      field: 'birth_date',
    },
    photoUrl: {
      type: Sequelize.STRING,
      field: 'photo_url',
    },
    placeBod: {
      type: Sequelize.STRING,
      field: 'place_bod',
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
    },
  }, {
    tableName: 'users',
    deletedAt: 'deleted_at',
    paranoid: true,
    hooks: {
      beforeCreate: (user) => {
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
      },
      beforeUpdate: (user) => {
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
      },
    },
  });
  User.associate = (models) => {
    User.Gender = models.User.belongsTo(models.Gender, {
      foreignKey: 'gender_id',
      as: 'gender',
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
      as: 'student',
    });

    User.School = models.User.belongsToMany(models.School, {
      through: models.UserSchool,
    });
  };
  User.prototype.getToken = function () {
    return getToken({ id: this.id });
  };
  User.prototype.isValidToken = function (token) {
    const decoded = verify(token);
    return decoded.id === this.id;
  }
  User.prototype.isStudent = function () {
    return this.getStudent().then((result) => {
      return !!result;
    });
  }
  return User;
};
