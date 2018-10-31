import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, sequelize } from 'models';

import { Mutation as MutationUserProfile } from './userProfile';
import { Mutation as MutationUserSchool } from './userSchool';
import { Mutation as MutationUserStudent } from './userStudent';
import { Mutation as MutationUserTeacher } from './userTeacher';

const { createOrUpdateUserProfile } = MutationUserProfile;
const { createUserSchool } = MutationUserSchool;
const { createOrUpdateUserStudent } = MutationUserStudent;
const { createOrUpdateUserTeacher } = MutationUserTeacher;

export default {
  User: {
    gender: resolver(User.Gender),
    userStudent: resolver(User.UserStudent),
    userProfile: resolver(User.UserProfile),
    authProviders: resolver(User.AuthProvider),
    isStudent: user => user.isStudent(),
    isTeacher: user => user.isTeacher(),
    token: user => user.getToken(),
    userSchools: resolver(User.UserSchool)
  },
  Query: {
    user: resolver(User),
    users: resolver(User)
  },
  Mutation: {
    registerUserStudent: (_, { userProfile, userSchool, userStudent }, ctx) =>
      sequelize.transaction(transaction => {
        const ctxWithTransction = { ...ctx, transaction };
        return Promise.all([
          createOrUpdateUserProfile(_, { userProfile }, ctxWithTransction),
          createUserSchool(_, { userSchool }, ctxWithTransction),
          createOrUpdateUserStudent(_, { userStudent }, ctxWithTransction)
        ]).then(() => ctx.user.reload({ transaction }));
      }),
    registerUserTeacher: (_, { userProfile, userSchool, userTeacher }, ctx) =>
      sequelize.transaction(transaction => {
        const ctxWithTransction = { ...ctx, transaction };
        return Promise.all([
          createOrUpdateUserProfile(_, { userProfile }, ctxWithTransction),
          createUserSchool(_, { userSchool }, ctxWithTransction),
          createOrUpdateUserTeacher(_, { userTeacher }, ctxWithTransction)
        ]).then(() => ctx.user.reload({ transaction }));
      }),
  }
};
