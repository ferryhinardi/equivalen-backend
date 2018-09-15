export default (sequelize, Sequelize) => {
  const QuestionOption = sequelize.define(
    'QuestionOption',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: Sequelize.TEXT('long'),
      order: Sequelize.INTEGER,
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
      tableName: 'question_options',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  QuestionOption.associate = models => {
    QuestionOption.Question = models.QuestionOption.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question'
    });
    QuestionOption.Option = models.QuestionOption.belongsTo(models.Option, {
      foreignKey: 'option_id',
      as: 'option'
    });
  };
  return QuestionOption;
};
