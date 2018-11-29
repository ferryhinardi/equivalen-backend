export default (sequelize, Sequelize) => {
  const UserRelationship = sequelize.define(
    'UserRelationship',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: Sequelize.STRING,
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
      tableName: 'user_relationship',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserRelationship.associate = models => {
    UserRelationship.User = models.UserRelationship.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    UserRelationship.UserTarget = models.UserRelationship.belongsTo(models.User, {
      foreignKey: 'target_id'
    });
  };
  return UserRelationship;
};
