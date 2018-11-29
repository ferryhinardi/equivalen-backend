import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { UserTeacherFactory } from 'modules/user/models/factories/userTeacher';
import { UserRelationshipFactory } from 'modules/user/models/factories/userRelationship';
import { sequelize } from 'models';

describe('test user relationship', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation addTeacherRelationship', () => {
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
          addTeacherRelationship(userTarget:{id:${usera.id}}) {
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
      const { status } = resultRelation.body.data.addTeacherRelationship;
      expect(status).toEqual('PENDING');
    });
  });

  describe('mutation approveRequestRelationship', () => {
    it('should return 200', async () => {
      const usera = await UserFactory({
        password: 'new secret'
      });
      const userf = await UserFactory({
        username: 'user test',
        password: 'secret'
      });
      const userb = await UserStudentFactory(userf, {
        nisnNumber: '000000000'
      });
      await UserRelationshipFactory({
        user_id: usera.id,
        target_id: userb.id,
        status: 'PENDING'
      });
      const query = `
        mutation {
          approveRequestRelationship(userTarget:{id:${userb.id}}) {
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
        Authorization: `Bearer ${usera.getToken()}`
      });
      const { status } = resultRelation.body.data.approveRequestRelationship;
      expect(status).toEqual('APPROVED');
    });
  });
});
