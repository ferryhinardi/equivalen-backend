export default (sequelize, Sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
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
      tableName: 'notifications',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Notification.associate = models => {
    Notification.User = models.Notification.belongsToMany(models.User, {
      through: models.UserNotification,
      foreignKey: 'notification_id'
    });
    Notification.UserNotification = models.Notification.hasMany(models.UserNotification, {
      foreignKey: 'notification_id'
    });
  };

  Notification.applyNotification = async function applyNotification(
    { notificationType, total },
    { user, transaction }
  ) {
    const { UserNotification } = require('models');
    const notification = await Notification.findOne({
      where: { name: notificationType },
      ...(transaction ? { transaction } : {})
    });
    const currentUserNotificationData = await UserNotification.findOne({
      where: { user_id: user.id, notification_id: notification.id },
      ...(transaction ? { transaction } : {})
    });
    const isHaveParamTotal = typeof total !== 'undefined';
    let totalNotification;

    if (!currentUserNotificationData) {
      totalNotification = isHaveParamTotal ? total : 1;

      await user.addNotification(notification, {
        through: { total: totalNotification },
        ...(transaction ? { transaction } : {})
      });
    } else {
      totalNotification = isHaveParamTotal ? total : currentUserNotificationData.total + 1;

      await currentUserNotificationData.update(
        { total: totalNotification },
        ...(transaction ? { transaction } : {})
      );
    }

    return user;
  };

  Notification.RELATIONSHIP = 'RELATIONSHIP';
  return Notification;
};
