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
      foreignKey: 'curriculum_id',
      as: 'question_info_curriculum'
    });
    QuestionInfo.Course = models.QuestionInfo.belongsTo(models.Course, {
      foreignKey: 'course_id',
      as: 'question_info_course'
    });
    QuestionInfo.Chapter = models.QuestionInfo.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'question_info_chapter'
    });
    QuestionInfo.Question = models.QuestionInfo.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
  };
  return QuestionInfo;
};
