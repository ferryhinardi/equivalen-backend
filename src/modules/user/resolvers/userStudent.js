import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserStudent } from 'models';

export default {
  Mutation: {
    createUserStudent: async (_, userStudentData, { user }) => {
      const [userStudent, created] = await UserStudent.findOrCreate({
        where: {
          userId: user.id,
        },
        defaults: userStudentData
      });
      if (!created) {
        await userStudent.update(userStudentData);
      }
      return userStudent;
    }
  }
}