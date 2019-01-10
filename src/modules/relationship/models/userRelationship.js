export default (sequelize, Sequelize) => {
  const UserRelationship = sequelize.define(
    'UserRelationship',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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
    UserRelationship.UserTargetUser = models.UserRelationship.belongsTo(models.User, {
      foreignKey: 'target_id'
    });
    UserRelationship.UserTargetClass = models.UserRelationship.belongsTo(models.Classes, {
      foreignKey: 'target_id'
    });
    UserRelationship.Status = models.UserRelationship.belongsTo(models.UserRelationshipStatus, {
      foreignKey: 'status_id'
    });
    UserRelationship.Type = models.UserRelationship.belongsTo(models.UserRelationshipType, {
      foreignKey: 'type_id'
    });
  };
  return UserRelationship;
};
