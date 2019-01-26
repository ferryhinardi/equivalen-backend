import { UserStudent } from 'models';

const Mutation = {};
Mutation.createOrUpdateUserStudent = async (
  _,
  { userStudent: userStudentData },
  { user, transaction }
) => {
  let userStudent = await UserStudent.findOne({
    where: {
      userId: user.id
    },
    ...(transaction ? { transaction } : {})
  });
  if (!userStudent) {
    userStudent = await UserStudent.create({
      ...userStudentData,
      userId: user.id
    }, {
      ...(transaction ? { transaction } : {})
    });
  } else {
    userStudent = await userStudent.update(userStudentData, {
      ...(transaction ? { transaction } : {})
    });
  }

  return [];
};

Mutation.createUserStudent = Mutation.createOrUpdateUserStudent;

export default {
  Mutation
};
