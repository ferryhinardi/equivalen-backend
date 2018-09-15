export default (sequelize, Sequelize) => {
  const UserAuthProvider = sequelize.define(
    'UserAuthProvider',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sourceId: {
        field: 'source_id',
        type: Sequelize.STRING
      },
      payload: Sequelize.STRING,
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
      tableName: 'user_auth_provider'
    }
  );
  UserAuthProvider.associate = models => {
    models.UserAuthProvider.belongsTo(models.AuthProvider, {
      foreignKey: 'auth_provider_id'
    });
    models.UserAuthProvider.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };

  return UserAuthProvider;
};
