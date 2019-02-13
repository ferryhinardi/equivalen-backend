import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserTeacher } from 'models';
import userTeacherCourse from './userTeacherCourse';

const { createUserTeacherCourse } = userTeacherCourse.Mutation;

export default {
  UserTeacher: {
    courses: resolver(UserTeacher.Course)
  },
  Mutation: {
    createOrUpdateUserTeacher: async (
      _,
      { userTeacher: userTeacherData },
      { user, transaction }
    ) => {
      const { courses, ...userTeacherProps } = userTeacherData;
      const [userTeacher, created] = await UserTeacher.findOrCreate({
        where: {
          userId: user.id
        },
        defaults: userTeacherProps,
        ...(transaction ? { transaction } : {})
      });
      if (!created) {
        await userTeacher.update(userTeacherData, {
          ...(transaction ? { transaction } : {})
        });
      } else {
        await createUserTeacherCourse(_, { courses }, { user, transaction });
      }
    
      return userTeacher;
    }
  }
};
