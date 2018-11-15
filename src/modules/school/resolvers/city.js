import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { City } from 'models';

export default {
  City: {
    province: resolver(City.Province),
    districts: resolver(City.District),
    schools: resolver(City.SChool),
  },
  Query: {
    cities: resolver(City),
  }
};
