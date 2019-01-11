export default (sequelize, Sequelize) => {
  const UserNotification = sequelize.define(
    'UserNotification',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      total: Sequelize.INTEGER,
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
      tableName: 'user_notifications',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserNotification.associate = models => {
    UserNotification.User = models.UserNotification.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    UserNotification.Notification = models.UserNotification.belongsTo(models.Notification, {
      foreignKey: 'notification_id'
    });
  };
  return UserNotification;
};
