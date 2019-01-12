export default (sequelize, Sequelize) => {
  const UserClass = sequelize.define(
    'UserClass',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      tableName: 'user_classes',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserClass.associate = models => {
    UserClass.Class = models.UserClass.belongsTo(models.Classes, {
      foreignKey: 'class_id'
    });
    UserClass.User = models.UserClass.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };

  return UserClass;
};
