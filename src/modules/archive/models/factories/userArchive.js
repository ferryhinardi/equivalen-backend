import { UserArchive } from 'models';
import { ArchiveFactory } from 'modules/archive/models/factories/archive';
import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { UserTeacherFactory } from 'modules/user/models/factories/userTeacher';

export async function UserArchiveFactory(userArchiveData) {
  const archive = await ArchiveFactory();
  const userStudent = await UserStudentFactory();
  const userTeacher = await UserTeacherFactory();

  const data = {
    archive_id: archive.id,
    user_id: userStudent.id,
    owner_id: userTeacher.id,
    ...userArchiveData
  };

  return UserArchive.create(data);
}

export default UserArchiveFactory;
