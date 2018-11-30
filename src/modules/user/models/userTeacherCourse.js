export default (sequelize, Sequelize) => {
  const UserTeacherCourse = sequelize.define(
    'UserTeacherCourse',
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
      tableName: 'user_teacher_courses',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  UserTeacherCourse.associate = models => {
    UserTeacherCourse.UserTeacher = models.UserTeacherCourse.belongsTo(models.UserTeacher, {
      foreignKey: 'user_teacher_id'
    });
    UserTeacherCourse.Course = models.UserTeacherCourse.belongsTo(models.Course, {
      foreignKey: 'course_id'
    });
  };
  return UserTeacherCourse;
};
