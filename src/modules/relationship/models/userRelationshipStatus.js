export default (sequelize, Sequelize) => {
  const UserRelationshipStatus = sequelize.define(
    'UserRelationshipStatus',
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
      tableName: 'user_relationship_status',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserRelationshipStatus.associate = models => {
    UserRelationshipStatus.UserRelationship = models.UserRelationshipStatus.hasMany(models.UserRelationship, {
      foreignKey: 'status_id'
    });
  };
  UserRelationshipStatus.PENDING = 'PENDING';
  UserRelationshipStatus.APPROVED = 'APPROVED';
  UserRelationshipStatus.REJECTED = 'REJECTED';
  return UserRelationshipStatus;
};
