import { UserStudent } from 'models';
import { UserFactory } from './user';

export async function UserStudentFactory(_user, userStudentData = {}) {
  const user = _user || await UserFactory();
  await UserStudent.create({
    userId: user.id,
    ...userStudentData
  });
  return user.reload();
}

export default UserStudentFactory;
