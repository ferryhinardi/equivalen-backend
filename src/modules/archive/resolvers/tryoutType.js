import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { TryoutType } from 'models';

export default {
  Query: {
    tryoutTypes: resolver(TryoutType)
  }
};
