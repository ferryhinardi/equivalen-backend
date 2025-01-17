export default (sequelize, Sequelize) => {
  const School = sequelize.define(
    'School',
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
      tableName: 'schools',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  School.associate = models => {
    School.Province = models.School.belongsTo(models.Province, {
      foreignKey: 'province_id'
    });
    School.City = models.School.belongsTo(models.City, {
      foreignKey: 'city_id'
    });
    School.District = models.School.belongsTo(models.District, {
      foreignKey: 'district_id'
    });
    School.User = models.School.belongsToMany(models.User, {
      through: models.UserSchool,
      foreignKey: 'school_id'
    });
    School.UserSchool = models.School.hasMany(models.UserSchool, {
      foreignKey: 'school_id'
    })
  };
  return School;
};
