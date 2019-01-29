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
      imageUrl: {
        field: 'image_url',
        type: Sequelize.STRING
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
      tableName: 'courses',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Course.associate = models => {
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
    Course.UserTeacher = models.Course.belongsToMany(models.UserTeacher, {
      through: models.UserTeacherCourse,
      foreignKey: 'course_id'
    });
    Course.UserTeacherCourse = models.Course.hasMany(models.UserTeacherCourse, {
      foreignKey: 'course_id'
    });
  };
  return Course;
};
