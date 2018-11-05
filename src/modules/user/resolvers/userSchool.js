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
      const [[userSchool]] = await user.addSchool(school, {
        through: {
          startYear,
          endYear
        },
        ...(transaction ? { transaction } : {})
      });

      return userSchool;
    }
  }
};
