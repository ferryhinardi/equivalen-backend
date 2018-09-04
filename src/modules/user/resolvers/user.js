import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, sequelize } from 'models';

import { Mutation as MutationUserProfile } from './userProfile';
import { Mutation as MutationUserSchool } from './userSchool';
import { Mutation as MutationUserStudent } from './userStudent';

const { createUserProfile } = MutationUserProfile;
const { createUserSchool } = MutationUserSchool;
const { createUserStudent } = MutationUserStudent;

export default {
  User: {
    gender: resolver(User.Gender),
    userStudent: resolver(User.UserStudent),
    userProfile: resolver(User.UserProfile),
    authProviders: resolver(User.AuthProvider),
    isStudent: (user) => user.isStudent(),
    token: (user) => user.getToken(),
    userSchools: resolver(User.UserSchool),
  },
  Query: {
    user: resolver(User),
    users: resolver(User),
  },
  Mutation: {
    registerUserStudent: (_, { userProfile, userSchool, userStudent }, ctx) => {
      return sequelize.transaction(function(transaction) {
        const ctxWithTransction = {...ctx, transaction};
        return Promise.all([
          createUserProfile(_, { userProfile }, ctxWithTransction),
          createUserSchool(_, { userSchool }, ctxWithTransction),
          createUserStudent(_, { userStudent }, ctxWithTransction),
        ]).then(() => {
          return ctx.user.reload({ transaction });
        });
      });
    }
  }
}