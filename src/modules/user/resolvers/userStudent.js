import { UserStudent } from 'models';

const Mutation = {};
Mutation.createOrUpdateUserStudent = async (
  _,
  { userStudent: userStudentData },
  { user, transaction }
) => {
  const [userStudent, created] = await UserStudent.findOrCreate({
    where: {
      userId: user.id
    },
    defaults: userStudentData,
    ...(transaction ? { transaction } : {})
  });
  if (!created) {
    await userStudent.update(userStudentData, {
      ...(transaction ? { transaction } : {})
    });
  }
  return userStudent;
};

Mutation.createUserStudent = Mutation.createOrUpdateUserStudent;

export default {
  Mutation
};
