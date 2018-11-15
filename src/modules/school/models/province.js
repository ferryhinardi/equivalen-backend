export default (sequelize, Sequelize) => {
  const Province = sequelize.define(
    'Province',
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
      tableName: 'provinces',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Province.associate = models => {
    Province.City = models.Province.hasMany(models.City, {
      foreignKey: 'province_id'
    });
    Province.School = models.Province.hasMany(models.City, {
      foreignKey: 'province_id'
    });
  };
  return Province;
};
