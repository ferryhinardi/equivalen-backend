import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { UserTeacherFactory } from 'modules/user/models/factories/userTeacher';
import { sequelize } from 'models';

describe('test user relationship', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation addStudentRelationship', () => {
    it('should return 200', async () => {
      const userb = await UserFactory({
        password: 'new secret'
      });
      const userf = await UserFactory({
        username: 'user test',
        password: 'secret'
      });
      const usera = await UserTeacherFactory(userf, {
        nuptkNumber: '000000000',
      });
      const query = `
        mutation {
          addStudentRelationship(userTarget:{id:${usera.id}}) {
            id
            user {
              id
            }
            userTarget {
              id
            }
            status
          }
        }
      `;
      const resultRelation = await request(query, undefined, {
        Authorization: `Bearer ${userb.getToken()}`
      });
      const { status } = resultRelation.body.data.addStudentRelationship;
      expect(status).toEqual('PENDING');
    });
  });
});
