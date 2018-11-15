import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { SchoolFactory } from 'modules/school/models/factories/school';
import { sequelize } from 'models';

describe('test school', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('query search School', () => {
    it('should return 200', async () => {
      const user = await UserFactory();
      await SchoolFactory({ name: 'Sekolah Test' });
      const query = `
        query {
          schools {
            id
            name
            city {
              name
            }
            province {
              name
            }
            district {
              name
            }
          }
        }
      `;

      const result = await request(query, undefined, {
        Authorization: `Bearer ${user.getToken()}`
      });
      const {
        name,
      } = result.body.data.schools[0];
      expect(name).toEqual('Sekolah Test');
    });
  });
})