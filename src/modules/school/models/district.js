export default (sequelize, Sequelize) => {
  const District = sequelize.define(
    'District',
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
      tableName: 'districts',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  District.associate = models => {
    District.City = models.District.belongsTo(models.City, {
      foreignKey: 'city_id'
    });
    District.School = models.District.hasMany(models.School, {
      foreignKey: 'district_id'
    });
  };
  return District;
};
