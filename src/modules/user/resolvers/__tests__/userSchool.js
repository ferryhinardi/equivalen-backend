import request from 'modules/shared/libs/jest/request';
import { UserFactory } from 'modules/user/models/factories/user';
import { ProvinceFactory } from 'modules/school/models/factories/province';
import { CityFactory } from 'modules/school/models/factories/city';
import { DistrictFactory } from 'modules/school/models/factories/district';
import { SchoolFactory } from 'modules/school/models/factories/school';
import { sequelize } from 'models';

describe('test userSchool', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  describe('mutation createUserSchool', () => {
    it('should create new school', async () => {
      const user = await UserFactory();
      const province = await ProvinceFactory({ name: 'Province Test' });
      const city = await CityFactory({ name: 'City Test' });
      const district = await DistrictFactory({ name: 'District Test' });
      const school = await SchoolFactory({ name: 'Bina Nusantara University' });
      const query = `
        mutation {
          createUserSchool (
            userSchool: {
              startYear: "2012"
              endYear: "2016"
              school: {
                name: "${school.name}"
                province: {
                  name: "${province.name}"
                }
                city: {
                  name: "${city.name}"
                }
                district: {
                  name: "${district.name}"
                }
              }
            }
          ) {
            startYear
            endYear
            school {
              id
              name
              province {
                name
              }
              city {
                name
              }
              district {
                name
              }
            }
          }
        }
      `;
      const result = await request(query, undefined, {
        Authorization: `Bearer ${user.getToken()}`
      });
      const {
        startYear,
        endYear,
        school: {
          name,
          province: { name: provinceName },
          city: { name: cityName },
          district: { name: districtName },
        }
      } = result.body.data.createUserSchool;
      expect(startYear).toEqual(2012);
      expect(endYear).toEqual(2016);
      expect(name).toEqual('Bina Nusantara University');
      expect(provinceName).toEqual('Province Test');
      expect(cityName).toEqual('City Test');
      expect(districtName).toEqual('District Test');
    });
  });
});
