import { UserTeacher } from 'models';
import { UserFactory } from './user';

export async function UserTeacherFactory(_user, userTeacherData = {}) {
  const user = _user || await UserFactory();
  await UserTeacher.create({
    userId: user.id,
    ...userTeacherData
  });
  return user.reload();
}

export default UserTeacherFactory;
