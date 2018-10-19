export default (sequelize, Sequelize) => {
  const License = sequelize.define(
    'License',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      licenseCode: {
        field: 'license_code',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      tableName: 'license'
    }
  );
  License.associate = models => {
    License.User = models.License.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return License;
};
