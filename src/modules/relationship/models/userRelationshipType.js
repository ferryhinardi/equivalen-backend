export default (sequelize, Sequelize) => {
  const UserRelationshipType = sequelize.define(
    'UserRelationshipType',
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
      tableName: 'user_relationship_types',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserRelationshipType.associate = models => {
    UserRelationshipType.UserRelationship = models.UserRelationshipType.hasMany(models.UserRelationship, {
      foreignKey: 'type_id'
    });
  };
  UserRelationshipType.USER = 'USER';
  UserRelationshipType.CLASS = 'CLASS';
  return UserRelationshipType;
};
