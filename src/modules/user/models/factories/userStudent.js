import faker from 'faker';
import { User, UserStudent } from 'models';
import { UserFactory } from './user';


export async function UserStudentFactory(_user, userStudentData = {}) {
  const user = _user ? _user : await UserFactory();
  const userStudent = await UserStudent.create({
    userId: user.id,
    ...userStudentData
  });
  return user.reload();
}