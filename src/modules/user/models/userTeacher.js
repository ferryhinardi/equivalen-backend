export default (sequelize, Sequelize) => {
  const UserTeacher = sequelize.define(
    'UserTeacher',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          field: 'id'
        }
      },
      nuptkNumber: {
        field: 'nuptk_number',
        type: Sequelize.STRING
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
      tableName: 'user_teacher',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserTeacher.associate = models => {
    UserTeacher.User = models.UserTeacher.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return UserTeacher;
};
