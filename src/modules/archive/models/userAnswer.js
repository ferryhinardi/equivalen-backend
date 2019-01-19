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
    UserAnswer.UserArchive = models.UserAnswer.belongsTo(models.UserArchive, {
      foreignKey: 'user_archive_id'
    });
    UserAnswer.Question = models.UserAnswer.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
  };
  return UserAnswer;
};
