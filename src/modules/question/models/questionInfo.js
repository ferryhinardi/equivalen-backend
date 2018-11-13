export default (sequelize, Sequelize) => {
  const QuestionInfo = sequelize.define(
    'QuestionInfo',
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
      tableName: 'question_infos',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  QuestionInfo.associate = models => {
    QuestionInfo.Curriculum = models.QuestionInfo.belongsTo(models.Curriculum, {
      foreignKey: 'curriculum_id'
    });
    QuestionInfo.Course = models.QuestionInfo.belongsTo(models.Course, {
      foreignKey: 'course_id'
    });
    QuestionInfo.Chapter = models.QuestionInfo.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id'
    });
    QuestionInfo.Question = models.QuestionInfo.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
  };
  return QuestionInfo;
};
