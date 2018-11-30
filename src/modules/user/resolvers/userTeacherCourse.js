import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, UserTeacherCourse, UserTeacher, Course, sequelize } from 'models';

const Mutation = {};
Mutation.createUserTeacherCourse = async (
  _,
  { courses },
  { user, transaction }
) => {
  const coursesData = await Course.findAll({
    where: { 
      id: {
        [sequelize.Op.in]: courses.map(course => course.id)
      }
    },
    ...(transaction ? { transaction } : {})
  });

  const userTeacher = await UserTeacher.findOne({
    include: [{
      model: User,
      where: {
        id: user.id
      }
    }],
    ...(transaction ? { transaction } : {})
  });

  const [[userTeacherCourse]] = await userTeacher.addCourses(coursesData, {
    ...(transaction ? { transaction } : {})
  });

  return userTeacherCourse;
};

export default {
  UserTeacherCourse: {
    userTeacher: resolver(UserTeacherCourse.UserTeacher),
    courses: resolver(UserTeacherCourse.Course)
  },
  Mutation
};
