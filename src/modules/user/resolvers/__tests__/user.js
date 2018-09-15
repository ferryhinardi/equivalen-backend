import request from 'modules/shared/libs/jest/request';
import UserFactory from 'modules/user/models/factories/user';
import { sequelize } from 'models';

describe('test user', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation registerUserStudent', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      const query = `
        mutation {
          registerUserStudent (
            userStudent: {
              nisnNumber: "123"
            }
            userProfile: {
              nikNumber: "321"
            }
            userSchool: {
              startYear: "2012"
              endYear: "2016"
              school: {
                name: "Binus"
              }
            }
          ) {
            id
            isStudent
            userStudent {
              nisnNumber
            }
            userProfile {
              nikNumber
            }
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${user.getToken()}`
      });
      const {
        isStudent,
        userStudent: { nisnNumber },
        userProfile: { nikNumber }
      } = result.body.data.registerUserStudent;
      expect(isStudent).toEqual(true);
      expect(nisnNumber).toEqual('123');
      expect(nikNumber).toEqual('321');
    });
  });
});
