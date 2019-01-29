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
      used: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      answer: Sequelize.STRING,
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
    Question.Curriculum = models.Question.belongsToMany(models.Curriculum, {
      through: models.QuestionInfo,
      foreignKey: 'curriculum_id'
    });
    Question.Course = models.Question.belongsToMany(models.Course, {
      through: models.QuestionInfo,
      foreignKey: 'course_id'
    });
    Question.Chapter = models.Question.belongsToMany(models.Chapter, {
      through: models.QuestionInfo,
      foreignKey: 'chapter_id'
    });
    Question.QuestionInfo = models.Question.hasMany(models.QuestionInfo, {
      foreignKey: 'question_id'
    });
    Question.Option = models.Question.belongsToMany(models.Option, {
      through: models.QuestionOption,
      foreignKey: 'question_id'
    });
    Question.QuestionOption = models.Question.hasMany(models.QuestionOption, {
      foreignKey: 'question_id'
    });
    Question.Package = models.Question.belongsToMany(models.Package, {
      through: models.PackageQuestion,
      foreignKey: 'question_id'
    });
    Question.PackageQuestion = models.Question.hasMany(models.PackageQuestion, {
      foreignKey: 'question_id'
    });
    Question.CreatedBy = models.Question.belongsTo(models.User, {
      foreignKey: 'created_by'
    });

    Question.UserAnswer = models.Question.hasMany(models.UserAnswer, {
      foreignKey: 'question_id'
    });
  };
  Question.addOptions = async function add(question, options, transaction) {
    return Promise.all([
      ...options
        .map(async (opt) => {
          const { option, content, order } = await opt;
          await question.addOption(option, {
            through: {
              content,
              order
            },
            ...(transaction ? { transaction } : {})
          })
        })
    ]).then(() => question);
  };
  return Question;
};
