import faker from 'faker';
import request from 'modules/shared/libs/jest/request';
import { ArchiveFactory } from 'modules/archive/models/factories/archive';
import { PackageFactory } from 'modules/archive/models/factories/package';
import { QuestionTypeFactory } from 'modules/question/models/factories/questionType';
import { QuestionFactory } from 'modules/question/models/factories/question';
import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { sequelize } from 'models';

describe('test Archive', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation create package random', () => {
    it('should return 200', async () => {
      await QuestionTypeFactory();
      const archive = await ArchiveFactory();
      const archive2 = await ArchiveFactory();
      const package1 = await PackageFactory({
        archive_id: archive.id
      });
      const package2 = await PackageFactory({
        archive_id: archive.id
      });
      const package3 = await PackageFactory({
        archive_id: archive.id
      });
      const package4 = await PackageFactory({
        archive_id: archive.id
      });
      const package5 = await PackageFactory({
        archive_id: archive.id
      });
      const package6 = await PackageFactory({
        archive_id: archive.id
      });
      const package7 = await PackageFactory({
        archive_id: archive2.id
      });

      const question1 = await QuestionFactory();
      const question2 = await QuestionFactory();
      const question3 = await QuestionFactory();
      const question4 = await QuestionFactory();
      const question5 = await QuestionFactory();
      const question6 = await QuestionFactory();
      const question7 = await QuestionFactory();
      const question8 = await QuestionFactory();
      const question9 = await QuestionFactory();
      const question10 = await QuestionFactory();
      const question11 = await QuestionFactory();
      const question12 = await QuestionFactory();
      const question13 = await QuestionFactory();
      const question14 = await QuestionFactory();
      const question15 = await QuestionFactory();
      const question16 = await QuestionFactory();
      const question17 = await QuestionFactory();
      const question18 = await QuestionFactory();
      const question19 = await QuestionFactory();
      const question20 = await QuestionFactory();
      const question21 = await QuestionFactory();

      await package1.addQuestion(question1);
      await package1.addQuestion(question2);
      await package1.addQuestion(question3);
      await package2.addQuestion(question4);
      await package2.addQuestion(question5);
      await package2.addQuestion(question6);
      await package3.addQuestion(question7);
      await package3.addQuestion(question8);
      await package3.addQuestion(question9);
      await package4.addQuestion(question10);
      await package4.addQuestion(question11);
      await package4.addQuestion(question12);
      await package5.addQuestion(question13);
      await package5.addQuestion(question14);
      await package5.addQuestion(question15);
      await package6.addQuestion(question16);
      await package6.addQuestion(question17);
      await package6.addQuestion(question18);
      await package7.addQuestion(question19);
      await package7.addQuestion(question20);
      await package7.addQuestion(question21);

      const userStudent = await UserStudentFactory();

      const query = `
        mutation {
          generateRandomQuestion(
            archiveId: ${archive.id}
          ) {
            orderNo
            user {
              username
            }
            package {
              id
              name
            }
            question {
              id
              content
            }
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${userStudent.getToken()}`
      });
      const [
        { orderNo, user: { username } },
      ] = result.body.data.generateRandomQuestion;

      expect(orderNo).toEqual(1);
      expect(username).toEqual(userStudent.username);
    });
  });
});