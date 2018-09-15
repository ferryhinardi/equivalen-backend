export default (sequelize, Sequelize) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: Sequelize.TEXT('long'),
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
      tableName: 'questions',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Question.associate = models => {
    Question.QuestionType = models.Question.belongsTo(models.QuestionType, {
      foreignKey: 'question_type_id',
      as: 'questionType'
    });
    Question.Option = models.Question.belongsToMany(models.Option, {
      through: models.QuestionOption,
      foreignKey: 'question_id'
    });
    Question.QuestionOption = models.Question.hasMany(models.QuestionOption, {
      foreignKey: 'question_id'
    });
  };
  return Question;
};
