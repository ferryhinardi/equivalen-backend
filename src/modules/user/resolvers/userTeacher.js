import { UserTeacher } from 'models';

const Mutation = {};
Mutation.createOrUpdateUserTeacher = async (
  _,
  { userTeacher: userTeacherData },
  { user, transaction }
) => {
  const [userTeacher, created] = await UserTeacher.findOrCreate({
    where: {
      userId: user.id
    },
    defaults: userTeacherData,
    ...(transaction ? { transaction } : {})
  });
  if (!created) {
    await userTeacher.update(userTeacherData, {
      ...(transaction ? { transaction } : {})
    });
  }
  return userTeacher;
};

export default {
  Mutation
};
