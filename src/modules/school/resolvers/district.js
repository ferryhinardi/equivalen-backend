import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { District } from 'models';

export default {
  District: {
    city: resolver(District.City),
    schools: resolver(District.School),
  },
  Query: {
    districts: resolver(District),
  }
};
