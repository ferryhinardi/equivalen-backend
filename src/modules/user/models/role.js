export default (sequelize, Sequelize) => {
  const Role = sequelize.define('Role', {
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
    tableName   : 'roles',
    deletedAt   : 'deleted_at',
    paranoid    : true,
    underscored : true,
  });
  Role.associate = (models) => {
    Role.UserRole = models.Role.hasMany(models.UserRole, {
      foreignKey: 'role_id',
    });
    Role.User = models.Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'role_id',
    });
  };
  return Role;
};
