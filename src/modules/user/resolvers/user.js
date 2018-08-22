import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, UserRole } from 'models';

export default {
  User: {
    gender: resolver(User.Gender),
    userRoles: resolver(User.UserRole),
    authProviders: resolver(User.AuthProvider),
  },
  Query: {
    user: resolver(User),
    users: resolver(User),
  },
}