import request from 'modules/shared/libs/jest/request';
import { ArchiveFactory } from 'modules/archive/models/factories/archive';
import { UserArchiveFactory } from 'modules/archive/models/factories/userArchive';
import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { QuestionFactory } from 'modules/question/models/factories/question';
import { SaveAnswerFactory } from 'modules/archive/models/factories/saveAnswer';
import { sequelize } from 'models';

describe('test User Answer', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation create user answer', () => {
    it('should return 200, by user archive by archive id', async () => {
      const userStudent = await UserStudentFactory();
      const userArchive = await UserArchiveFactory({
        user_id: userStudent.id
      });
      const question = await QuestionFactory();
      const answerParam = 'A';
      const orderNoParam = 1;

      const query = `
        mutation {
          saveUserAnswer(
            userAnswer: {
              archiveId: ${userArchive.archive_id}
              question: { id: ${question.id} }
              orderNo: ${orderNoParam}
              answer: "${answerParam}"
            }
          ) {
            archive {
              id
            }
            user {
              id
              username
            }
            question {
              content
            }
            orderNo
            answer
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${userStudent.getToken()}`
      });
      const {
        archive: { id: archiveId },
        question: { content },
        orderNo,
        answer
      } = result.body.data.saveUserAnswer;

      expect(archiveId).toEqual(userArchive.archive_id.toString());
      expect(content).toEqual(question.content);
      expect(orderNo).toEqual(orderNoParam);
      expect(answer).toEqual(answerParam);
    });
  });

  describe('mutation create bulk user answer', () => {
    it('should return 200, create bulk by user archive by archive id', async () => {
      const userStudent = await UserStudentFactory();
      const userArchive = await UserArchiveFactory({
        user_id: userStudent.id
      });
      const question1 = await QuestionFactory();
      const answerParam1 = 'A';
      const orderNoParam1 = 1;
      const question2 = await QuestionFactory();
      const answerParam2 = 'B';
      const orderNoParam2 = 2;

      const query = `
        mutation {
          saveUserAnswers(
            userAnswers: {
              archiveId: ${userArchive.archive_id}
              answers: [
                {
                  question: { id: ${question1.id} },
                  orderNo: ${orderNoParam1},
                  answer: "${answerParam1}"
                },
                {
                  question: { id: ${question2.id} },
                  orderNo: ${orderNoParam2},
                  answer: "${answerParam2}"
                }
              ]
            }
          ) {
            archive {
              id
            }
            user {
              id
              username
            }
            question {
              content
            }
            orderNo
            answer
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${userStudent.getToken()}`
      });
      const [
        {
          archive: { id: archiveId },
          question: { content: content1 },
          orderNo: orderNo1,
          answer: answer1
        },
        {
          question: { content: content2 },
          orderNo: orderNo2,
          answer: answer2
        }
      ] = result.body.data.saveUserAnswers;

      expect(archiveId).toEqual(userArchive.archive_id.toString());
      expect(content1).toEqual(question1.content);
      expect(orderNo1).toEqual(orderNoParam1);
      expect(answer1).toEqual(answerParam1);
      expect(content2).toEqual(question2.content);
      expect(orderNo2).toEqual(orderNoParam2);
      expect(answer2).toEqual(answerParam2);
    });
  });

  describe('mutation get score user answer', () => {
    it('should return 200', async () => {
      const userStudent = await UserStudentFactory();
      const archive = await ArchiveFactory({
        totalQuestion: 3,
        minimumScore: 60
      });
      const userArchive = await UserArchiveFactory({
        user_id: userStudent.id,
        archive_id: archive.id
      });
      await SaveAnswerFactory({
        user_id: userStudent.id,
        archive_id: userArchive.archive_id,
        orderNo: 1,
        answer: 'A'
      });
      await SaveAnswerFactory({
        user_id: userStudent.id,
        archive_id: userArchive.archive_id,
        orderNo: 2,
        answer: 'B'
      });

      const query = `
        mutation {
          collectScore(
            archiveId: ${userArchive.archive_id}
          ) {
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
      const { score, totalCorrect, totalIncorrect, totalUnanswer } = result.body.data.collectScore;
      
      expect(score).toEqual(33);
      expect(totalCorrect).toEqual(1);
      expect(totalIncorrect).toEqual(1);
      expect(totalUnanswer).toEqual(1);
    });
  });
});
