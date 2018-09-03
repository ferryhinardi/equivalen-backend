export default (sequelize, Sequelize) => {
  const School = sequelize.define('School', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    city: Sequelize.STRING,
    district: Sequelize.STRING,
    province: Sequelize.STRING,
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
    },
  }, {
    tableName: 'schools',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  School.associate = (models) => {
    School.User = models.School.belongsToMany(models.User, {
      through: models.UserSchool,
    });
  };
  return School;
};
