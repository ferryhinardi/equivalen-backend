import request from 'modules/shared/libs/jest/request';
import UserFactory from 'modules/user/models/factories/user';
import { School, UserSchool, sequelize } from 'models';

describe('test userSchool', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach((done) => { // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation createUserSchool', () => {
    it('should create new school', async () => {
      const user = await UserFactory();
      let query = `
        mutation {
          createUserSchool (
            startYear: "2012"
            endYear: "2016"
            school: {
              name: "Bina Nusantara University"
              province: "Jakarta"
              city: "Jakarta Barat"
              district: "Kebon Jeruk"
            }
          ) {
            startYear
            endYear
            school {
              id
              name
              province
              city
              district
            }
          }
        }
      `
      const result = await request(query, undefined, { Authorization: `Bearer ${user.getToken()}`});
      const { startYear, endYear, school: { name, province, city, district } } = result.body.data.createUserSchool;
      expect(startYear).toEqual(2012);
      expect(endYear).toEqual(2016);
      expect(name).toEqual('Bina Nusantara University');
      expect(province).toEqual('Jakarta');
      expect(city).toEqual('Jakarta Barat');
      expect(district).toEqual('Kebon Jeruk');

    });
  })
});