import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserClass } from 'models';

export default {
  UserClass: {
    user: resolver(UserClass.User),
    class: resolver(UserClass.Class),
  }
};