import get from 'lodash/get';
import request from 'modules/shared/libs/jest/request';
import { ArchiveFactory } from 'modules/archive/models/factories/archive';
import { UserArchiveFactory } from 'modules/archive/models/factories/userArchive';
import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { UserTeacherFactory } from 'modules/user/models/factories/userTeacher';
import { sequelize } from 'models';

describe('test UserArchive', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation create user archive', () => {
    it('should return 200', async () => {
      const archive = await ArchiveFactory();
      const userStudent1 = await UserStudentFactory();
      const userStudent2 = await UserStudentFactory();
      const userTeacher = await UserTeacherFactory();
      const query = `
        mutation {
          createUserArchives(userArchive:{
            archiveId: ${archive.id}
            users: [
              { id: ${userStudent1.id} },
              { id: ${userStudent2.id} },
            ]
            startTime: "${new Date()}"
            endTime: "${new Date()}"
          }) {
            archive {
              name
            }
            user {
              username
            }
            owner {
              username
            }
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${userTeacher.getToken()}`
      });
      const [
        { archive: { name: archiveName }, user: { username: username1 }, owner: { username: usernameOwner } },
        { user: { username: username2 } }
      ] = result.body.data.createUserArchives;
      expect(archiveName).toEqual(archive.name);
      expect(username1).toEqual(userStudent1.username);
      expect(username2).toEqual(userStudent2.username);
      expect(usernameOwner).toEqual(userTeacher.username);
    });
  });

  describe('mutation update user archive', () => {
    it('should return 200', async () => {
      const userStudent = await UserStudentFactory();
      const userArchive = await UserArchiveFactory({
        user_id: userStudent.id,
      });
      const archiveId = get(userArchive, 'archive_id');
      const openedParam = true;
      const scoreParam = 60.5;
      const totalCorrectParam = 24;
      const totalIncorrectParam = 16;
      const totalDoubtParam = 5;
      const totalUnanswerParam = 5;
      const durationParam = 7000;

      const query = `
        mutation {
          updateUserArchive(userArchive:{
            archive: {
              id: ${archiveId}
            }
            opened: ${openedParam}
            score: ${scoreParam}
            totalCorrect: ${totalCorrectParam}
            totalIncorrect: ${totalIncorrectParam}
            totalDoubt: ${totalDoubtParam}
            totalUnanswer: ${totalUnanswerParam}
            duration: ${durationParam}
          }) {
            opened
            score
            totalCorrect
            totalIncorrect
            totalDoubt
            totalUnanswer
            duration
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${userStudent.getToken()}`
      });
      const {
        opened,
        score,
        totalCorrect,
        totalIncorrect,
        totalDoubt,
        totalUnanswer,
        duration
      } = result.body.data.updateUserArchive;
      expect(opened).toEqual(openedParam);
      expect(score).toEqual(scoreParam);
      expect(totalCorrect).toEqual(totalCorrectParam);
      expect(totalIncorrect).toEqual(totalIncorrectParam);
      expect(totalDoubt).toEqual(totalDoubtParam);
      expect(totalUnanswer).toEqual(totalUnanswerParam);
      expect(duration).toEqual(durationParam);
    });

    it('should fail updated, because archive not found', async () => {
      const userStudent = await UserStudentFactory();
      await UserArchiveFactory({
        user_id: userStudent.id,
      });
      const openedParam = true;
      const query = `
        mutation {
          updateUserArchive(userArchive:{
            archive: {
              id: 2
            }
            opened: ${openedParam}
          }) {
            opened
            score
            totalCorrect
            totalIncorrect
            totalDoubt
            totalUnanswer
            duration
          }
        }
      `;
      let error = null;
      try {
        await request(query, undefined, {
          Authorization: `Bearer ${userStudent.getToken()}`
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeTruthy();
    });
  });
});
