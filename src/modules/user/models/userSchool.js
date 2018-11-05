export default (sequelize, Sequelize) => {
  const UserSchool = sequelize.define(
    'UserSchool',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startYear: {
        field: 'start_year',
        type: Sequelize.INTEGER
      },
      endYear: {
        field: 'end_year',
        type: Sequelize.INTEGER
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
      tableName: 'user_schools',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserSchool.associate = models => {
    UserSchool.School = models.UserSchool.belongsTo(models.School, {
      foreignKey: 'school_id'
    });
    UserSchool.User = models.UserSchool.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return UserSchool;
};
