import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Grade } from 'models';

export default {
  Query: {
    grades: resolver(Grade)
  },
};
