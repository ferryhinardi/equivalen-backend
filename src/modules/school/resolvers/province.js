import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Province } from 'models';

export default {
  Province: {
    cities: resolver(Province.City),
    schools: resolver(Province.SChool)
  },
  Query: {
    provinces: resolver(Province),
  }
};
