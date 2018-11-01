export default (sequelize, Sequelize) => {
  const UserDevice = sequelize.define(
    'UserDevice',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      hostname: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      deviceId: {
        field: 'device_id',
        type: Sequelize.STRING
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'user_devices'
    }
  );
  UserDevice.associate = models => {
    UserDevice.License = models.UserDevice.belongsTo(models.License, {
      foreignKey: 'license_id',
    });
    UserDevice.User = models.UserDevice.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return UserDevice;
};
