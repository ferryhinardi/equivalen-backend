export default (sequelize, Sequelize) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
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
      tableName: 'courses',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Course.associate = models => {
    Course.Curriculum = models.Course.belongsTo(models.Curriculum, {
      foreignKey: 'curriculum_id'
    });
    Course.Chapter = models.Course.hasMany(models.Chapter, {
      foreignKey: 'course_id'
    });
    Course.Question = models.Course.belongsToMany(models.Question, {
      through: models.QuestionInfo,
      foreignKey: 'course_id'
    });
    Course.QuestionInfo = models.Course.hasMany(models.QuestionInfo, {
      foreignKey: 'course_id'
    });
  };
  return Course;
};
