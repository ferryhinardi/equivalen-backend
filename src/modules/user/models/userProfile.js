
export default (sequelize, Sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'users',
        field: 'id',
      },
    },
    nikNumber: {
      field: 'nik_number',
      type: Sequelize.STRING,
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
    },
  }, {
    tableName: 'user_profile',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  UserProfile.associate = (models) => {
    UserProfile.User = models.UserProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };
  return UserProfile;
};
