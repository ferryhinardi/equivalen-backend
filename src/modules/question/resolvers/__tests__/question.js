import request from 'modules/shared/libs/jest/request';
import UserFactory from 'modules/user/models/factories/user';
import { sequelize } from 'models';

describe('test question', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation questions', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      const query = `
        mutation {
          createOrUpdateQuestion(
            question: {
              content:"ABC"
              type:{
                id:1
                name:"OPTION"
              }
              options:[
                {
                  content:"OPT A"
                  order:1
                  option: {
                    name:"A"
                  }
                },
                {
                  content:"OPT B"
                  order:2
                  option: {
                    name:"B"
                  }
                },
                {
                  content:"OPT C"
                  order:3
                  option: {
                    name:"C"
                  }
                },
                {
                  content:"OPT D"
                  order:4
                  option: {
                    name:"D"
                  }
                }
              ]
            }
          ) {
            content
            type {
              name
            }
            options {
              content
            }
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${user.getToken()}`
      });
      const {
        content,
        type: { name },
        options,
      } = result.body.data.createOrUpdateQuestion;
      const optA = options[0].content;
      expect(content).toEqual('ABC');
      expect(name).toEqual('OPTION');
      expect(optA).toEqual('OPT A');
    })
  });
});