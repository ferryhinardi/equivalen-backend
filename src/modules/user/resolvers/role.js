import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Role } from 'models';

export default {
  Role: {
    userRoles: resolver(Role.UserRole),
  },
  Query: {
    role: resolver(Role),
    roles: resolver(Role),
  },
}