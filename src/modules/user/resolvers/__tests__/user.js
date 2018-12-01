import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { LicenseFactory } from 'modules/license/models/factories/license';
import { SchoolFactory } from 'modules/school/models/factories/school';
import { CourseFactory } from 'modules/question/models/factories/course';
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
      const school = await SchoolFactory({ name: 'Binus' });
      const query = `
        mutation {
          registerUserStudent (
            userStudent: {
              nisnNumber: "123"
              grade: "8"
            }
            userProfile: {
              nikNumber: "321"
            }
            userSchool: {
              startYear: "2012"
              endYear: "2016"
              school: {
                name: "${school.name}"
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
              grade
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
        userStudent: { nisnNumber, grade },
        userProfile: { nikNumber },
        userSchools: { 0: { startYear, school: { name } } },
        userDevice: { 0: { hostname } },
      } = result.body.data.registerUserStudent;
      expect(isStudent).toBeTruthy();
      expect(nisnNumber).toEqual('123');
      expect(grade).toEqual('8');
      expect(nikNumber).toEqual('321');
      expect(startYear).toEqual(2012);
      expect(name).toEqual('Binus');
      expect(hostname).toEqual('Host');
    });
  });

  describe('mutation registerUserTeacher', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      const school = await SchoolFactory({ name: 'Binus' });
      const course = await CourseFactory();
      const license = await LicenseFactory();
      const query = `
        mutation {
          registerUserTeacher (
            userTeacher: {
              nuptkNumber: "456"
              courses: [{
                id: ${course.id}
              }]
            }
            userProfile: {
              nikNumber: "654"
            }
            userSchool: {
              startYear: "2012"
              endYear: "2016"
              school: {
                name: "${school.name}"
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
            isTeacher
            userTeacher {
              nuptkNumber
              courses {
                id
                name
              }
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
      expect(isTeacher).toBeTruthy();
      expect(nuptkNumber).toEqual('456');
      expect(nikNumber).toEqual('654');
    });
  });
});
