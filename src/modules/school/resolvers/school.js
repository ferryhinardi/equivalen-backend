import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { School } from 'models';

export default {
  Query: {
    schools: resolver(School)
  }
};
