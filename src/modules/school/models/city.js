export default (sequelize, Sequelize) => {
  const City = sequelize.define(
    'City',
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
      tableName: 'cities',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  City.associate = models => {
    City.Province = models.City.belongsTo(models.Province, {
      foreignKey: 'province_id'
    });
    City.District = models.City.hasMany(models.District, {
      foreignKey: 'city_id'
    });
    City.School = models.City.hasMany(models.School, {
      foreignKey: 'city_id'
    });
  };
  return City;
};
