export default (sequelize, Sequelize) => {
  const UserDevice = sequelize.define(
    'UserDevice',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      licenseId: {
        field: 'license_id',
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'licenses',
          field: 'id'
        }
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          field: 'id'
        }
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
  };
  return UserDevice;
};
