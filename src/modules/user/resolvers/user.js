import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User } from 'models';

export default {
  User: {
    gender: resolver(User.Gender),
    userStudent: resolver(User.UserStudent),
    authProviders: resolver(User.AuthProvider),
    isStudent: (user) => user.isStudent(),
    token: (user) => user.getToken(),
    userSchools: resolver(User.UserSchool),
  },
  Query: {
    user: resolver(User),
    users: resolver(User),
  },
}