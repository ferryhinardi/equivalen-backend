import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { QuestionTypeFactory } from 'modules/question/models/factories/questionType';
import { QuestionFactory } from 'modules/question/models/factories/question';
import { CurriculumFactory } from 'modules/question/models/factories/curriculum';
import { EvaluationFactory } from 'modules/archive/models/factories/evaluation';
import { sequelize } from 'models';

describe('test Archive', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation create archive', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      const questionType = await QuestionTypeFactory();
      const evaluations = await EvaluationFactory();
      const curriculum = await CurriculumFactory();
      const question1 = await QuestionFactory();
      const question2 = await QuestionFactory();
      const query = `
        mutation {
          createArchive(archive:{
            name: "Archive Test"
            minimumScore: 50
            totalQuestion: 50
            questionType: { id: "${questionType.id}" }
            evaluation: {id: "${evaluations[0].id}" }
            curriculum:{ name:"${curriculum.name}" }
            packages:[{
              name:"Package Test"
              questions:[{
                id: "${question1.id}"
              }, {
                id: "${question2.id}"
              }]
            }]
          }) {
            name
            minimumScore
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${user.getToken()}`
      });
      const {
        name,
        minimumScore,
      } = result.body.data.createArchive;
      expect(name).toEqual('Archive Test');
      expect(minimumScore).toEqual(50);
    })
  });
});