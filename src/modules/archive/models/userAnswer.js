export default (sequelize, Sequelize) => {
  const UserAnswer = sequelize.define(
    'UserAnswer',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderNo: {
        field: 'order_no',
        allowNull: true,
        type: Sequelize.INTEGER
      },
      answer: {
        allowNull: true,
        type: Sequelize.STRING
      },
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
      tableName: 'user_answers'
    }
  );
  UserAnswer.associate = models => {
    UserAnswer.User = models.UserAnswer.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    UserAnswer.Archive = models.UserAnswer.belongsTo(models.Archive, {
      foreignKey: 'archive_id'
    });
    UserAnswer.Question = models.UserAnswer.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
  };
  return UserAnswer;
};
