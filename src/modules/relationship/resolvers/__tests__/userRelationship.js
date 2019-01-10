import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { UserTeacherFactory } from 'modules/user/models/factories/userTeacher';
import { UserRelationshipFactory } from 'modules/relationship/models/factories/userRelationship';
import { UserRelationshipStatusFactory } from 'modules/relationship/models/factories/userRelationshipStatus';
import { UserRelationshipTypeFactory } from 'modules/relationship/models/factories/userRelationshipType';
import { ClassesFactory } from 'modules/school/models/factories/classes';
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
      await UserTeacherFactory(userf, {
        nuptkNumber: '000000000',
      });
      await UserRelationshipStatusFactory();
      await UserRelationshipTypeFactory();

      const query = `
        mutation {
          addTeacherRelationship(userTarget:{id:${userf.id}}) {
            id
            user {
              id
            }
            target {
              user {
                id
                username
              }
            }
            status {
              name
            }
            type {
              id
              name
            }
          }
        }
      `;
      const resultRelation = await request(query, undefined, {
        Authorization: `Bearer ${userb.getToken()}`
      });
      const { status: { name: statusName } } = resultRelation.body.data.addTeacherRelationship;
      expect(statusName).toEqual('PENDING');
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
      await UserStudentFactory(userf, {
        nisnNumber: '000000000'
      });
      await UserRelationshipFactory({
        user_id: usera.id,
        target_id: userf.id,
      });

      const query = `
        mutation {
          approveRequestRelationship(userTarget:{id:${userf.id}}) {
            id
            user {
              id
            }
            target {
              user {
                id
                username
              }
            }
            status {
              name
            }
            type {
              id
              name
            }
          }
        }
      `;
      const resultRelation = await request(query, undefined, {
        Authorization: `Bearer ${usera.getToken()}`
      });
      const { status: { name: statusName } } = resultRelation.body.data.approveRequestRelationship;
      expect(statusName).toEqual('APPROVED');
    });
  });

  describe('mutation rejectRequestRelationship', () => {
    it('should return 200', async () => {
      const usera = await UserFactory({
        password: 'new secret'
      });
      const userf = await UserFactory({
        username: 'user test',
        password: 'secret'
      });
      await UserStudentFactory(userf, {
        nisnNumber: '000000000'
      });
      await UserRelationshipFactory({
        user_id: usera.id,
        target_id: userf.id,
      });

      const query = `
        mutation {
          rejectRequestRelationship(userTarget:{id:${userf.id}}) {
            id
            user {
              id
            }
            target {
              user {
                id
                username
              }
            }
            status {
              name
            }
            type {
              id
              name
            }
          }
        }
      `;
      const resultRelation = await request(query, undefined, {
        Authorization: `Bearer ${usera.getToken()}`
      });
      const { status: { name: statusName } } = resultRelation.body.data.approveRequestRelationship;
      expect(statusName).toEqual('REJECTED');
    });
  });

  describe('mutation classRequestRelationship', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      const classes = await ClassesFactory();
      await UserRelationshipStatusFactory();
      await UserRelationshipTypeFactory();

      const query = `
        mutation {
          addClassRelationship(classTarget:{id:${classes.id}}) {
            id
            user {
              id
              username
            }
            target {
              class {
                id
                name
              }
            }
            status {
              name
            }
            type {
              id
              name
            }
          }
        }
      `;
      const resultRelation = await request(query, undefined, {
        Authorization: `Bearer ${user.getToken()}`
      });

      const {
        user: { username },
        target: { class: { name: className } },
        status: { name: statusName },
        type: { name: typeName }
      } = resultRelation.body.data.addClassRelationship;

      expect(username).toEqual(user.username);
      expect(className).toEqual(classes.name);
      expect(statusName).toEqual('APPROVED');
      expect(typeName).toEqual('CLASS');
    });
  });
});
