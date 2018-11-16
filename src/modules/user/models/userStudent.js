export default (sequelize, Sequelize) => {
  const UserStudent = sequelize.define(
    'UserStudent',
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
      nisnNumber: {
        field: 'nisn_number',
        type: Sequelize.STRING
      },
      grade: Sequelize.STRING,
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
      tableName: 'user_student',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserStudent.associate = models => {
    UserStudent.User = models.UserStudent.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return UserStudent;
};
