import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Classes, Grade } from 'models';

export default {
  Classes: {
    grade: resolver(Grade)
  },
  Query: {
    Classes: resolver(Classes)
  },
};
