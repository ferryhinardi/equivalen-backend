export default (sequelize, Sequelize) => {
  const AuthProvider = sequelize.define(
    'AuthProvider',
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
      }
    },
    {
      tableName: 'auth_providers'
    }
  );
  AuthProvider.associate = models => {
    models.AuthProvider.belongsToMany(models.User, {
      through: models.UserAuthProvider,
      foreignKey: 'auth_provider_id'
    });
  };
  return AuthProvider;
};
