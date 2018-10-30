import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserSchool, School } from 'models';

export default {
  UserSchool: {
    school: resolver(UserSchool.School),
    user: resolver(UserSchool.User)
  },
  Mutation: {
    createUserSchool: async (
      _,
      { userSchool: { startYear, endYear, school: schoolData } },
      { user, transaction }
    ) => {
      const [school] = await School.findOrCreate({
        where: schoolData,
        ...(transaction ? { transaction } : {})
      });
      const userSchoolData = {
        userId: user.id,
        schoolId: school.id,
        startYear,
        endYear,
      };
      const [userSchool, created] = await UserSchool.findOrCreate(userSchoolData, {
        ...(transaction ? { transaction } : {})
      });

      if (!created) {
        throw new Error('User already have school!');
      }

      return userSchool;
    }
  }
};
