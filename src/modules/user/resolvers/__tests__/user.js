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
            userDevice: {
              hostname: "Host"
              deviceId: "eca4f803-6a0c-5f1c-92c7-95f2b439be75"
              platform: "darwin"
              licenseCode: "0935887c-061a-4c84-81f4-8c583192af36"
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
        userProfile: { nikNumber },
        userDevice: { hostname },
      } = result.body.data.registerUserStudent;
      expect(isStudent).toEqual(true);
      expect(nisnNumber).toEqual('123');
      expect(nikNumber).toEqual('321');
      expect(hostname).toEqual('Host');
    });
  });
});
