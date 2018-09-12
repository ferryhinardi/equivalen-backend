import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserStudent } from 'models';

export default {
  Mutation: {
    createUserStudent: async (_, { userStudent: userStudentData }, { user, transaction }) => {
      const [userStudent, created] = await UserStudent.findOrCreate({
        where: {
          userId: user.id,
        },
        defaults: userStudentData,
        ...(transaction ? {transaction}: {}),
      });
      if (!created) {
        await userStudent.update(userStudentData, {
          ...(transaction ? {transaction}: {}),
        });
      }
      return userStudent;
    }
  }
}