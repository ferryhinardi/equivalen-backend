export default (sequelize, Sequelize) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      defaultValue: 'active',
      type: Sequelize.STRING
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_roles',
  });
  UserRole.associate = (models) => {
    UserRole.User = models.UserRole.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    UserRole.Role = models.UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
    });
  };

  return UserRole;
};

