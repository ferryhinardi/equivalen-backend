export default (sequelize, Sequelize) => {
  const Gender = sequelize.define('Gender', {
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
    },
  }, {
    tableName   : 'genders',
    deletedAt   : 'deleted_at',
    paranoid    : true,
  });
  Gender.associate = (models) => {
    models.Gender.hasMany(models.User, {
      foreignKey: 'gender_id',
      as: 'users',
    });
  };
  return Gender;
};
