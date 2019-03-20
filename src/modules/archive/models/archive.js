import get from 'lodash/get';

export default (sequelize, Sequelize) => {
  const Archive = sequelize.define(
    'Archive',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      minimumScore: {
        field: 'minimum_score',
        type: Sequelize.FLOAT
      },
      totalQuestion: {
        field: 'total_question',
        type: Sequelize.INTEGER
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
      tableName: 'archives',
      deletedAt: 'deleted_at',
      paranoid: true,
      hooks: {
        afterCreate: archive => {
          const { Question } = require('models');
          const packages = get(archive, 'dataValues.packages', []);

          try {
            packages.forEach(async(pack) => {
              const { PackageQuestions } = pack;

              PackageQuestions.forEach(async (packQs) => {
                const { question_id: questionId } = packQs;

                const question = await Question.findById(questionId);
                const currentUsed = question.used + 1;

                await question.update({ used: currentUsed });
              });
            });
          } catch (e) {
            console.error(e);
          }
        },
      }
    }
  );

  Archive.associate = models => {
    Archive.QuestionType = models.Archive.belongsTo(models.QuestionType, {
      foreignKey: 'question_type_id'
    });
    Archive.Curriculum = models.Archive.belongsTo(models.Curriculum, {
      foreignKey: 'curriculum_id'
    });
    Archive.Course = models.Archive.belongsTo(models.Course, {
      foreignKey: 'course_id'
    });
    Archive.Evaluation = models.Archive.belongsTo(models.Evaluation, {
      foreignKey: 'evaluation_id'
    });
    Archive.TryoutType = models.Archive.belongsTo(models.TryoutType, {
      foreignKey: 'tryout_type_id'
    });
    Archive.Package = models.Archive.hasMany(models.Package, {
      foreignKey: 'archive_id',
      as: 'packages'
    });
    Archive.CreatedBy = models.Archive.belongsTo(models.User, {
      foreignKey: 'created_by'
    });

    Archive.User = models.Archive.belongsToMany(models.User, {
      through: models.UserArchive,
      foreignKey: 'archive_id'
    });
    Archive.UserArchive = models.Archive.hasMany(models.UserArchive, {
      foreignKey: 'archive_id'
    });
    Archive.UserAnswer = models.Archive.hasMany(models.UserArchive, {
      foreignKey: 'archive_id'
    });
  };

  return Archive;
};
