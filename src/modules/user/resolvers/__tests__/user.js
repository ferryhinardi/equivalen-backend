import request from 'modules/shared/libs/jest/request';
import UserFactory from 'modules/user/models/factories/user';
import LicenseFactory from 'modules/license/models/factories/license';
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
      const license = await LicenseFactory();
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
              licenseCode: "${license.licenseCode}"
            }
          ) {
            id
            isStudent
            userSchools {
              startYear
              school {
                name
              }
            }
            userStudent {
              nisnNumber
            }
            userProfile {
              nikNumber
            }
            userDevice {
              hostname
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
        userSchools: { 0: { startYear, school: { name } } },
        userDevice: { 0: { hostname } },
      } = result.body.data.registerUserStudent;
      expect(isStudent).toEqual(true);
      expect(nisnNumber).toEqual('123');
      expect(nikNumber).toEqual('321');
      expect(startYear).toEqual(2012);
      expect(name).toEqual('Binus');
      expect(hostname).toEqual('Host');
    });
  });

  describe('mutation registerUserTeacher', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      const query = `
        mutation {
          registerUserTeacher (
            userTeacher: {
              nuptkNumber: "456"
            }
            userProfile: {
              nikNumber: "654"
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
            isTeacher
            userTeacher {
              nuptkNumber
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
        isTeacher,
        userTeacher: { nuptkNumber },
        userProfile: { nikNumber }
      } = result.body.data.registerUserTeacher;
      expect(isTeacher).toEqual(true);
      expect(nuptkNumber).toEqual('456');
      expect(nikNumber).toEqual('654');
    });
  });
});
