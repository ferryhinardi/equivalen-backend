import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserRole } from 'models';

export default {
  UserRole: {
    role: resolver(UserRole.Role),
    user: resolver(UserRole.User),
  },
  Query: {
    userRole: resolver(UserRole),
    userRoles: resolver(UserRole),
  }
}