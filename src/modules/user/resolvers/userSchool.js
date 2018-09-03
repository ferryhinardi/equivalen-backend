import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserSchool, School } from 'models';

export default {
  UserSchool: {
    school: resolver(UserSchool.School),
    user: resolver(UserSchool.User),
  },
  Mutation: {
    createUserSchool: async (_, { startYear, endYear, school: schoolData }, { user }) => {
      const [school] = await School.findOrCreate({ where: schoolData });
      const [[userSchool]] = await user.addSchool(school, {through: { startYear, endYear }});
      return userSchool;
    }
  }
}