import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, sequelize } from 'models';

import { Mutation as MutationUserProfile } from './userProfile';
import { Mutation as MutationUserSchool } from './userSchool';
import { Mutation as MutationUserStudent } from './userStudent';
import { Mutation as MutationUserDevice } from './userDevice';

const { createOrUpdateUserProfile } = MutationUserProfile;
const { createUserSchool } = MutationUserSchool;
const { createOrUpdateUserStudent } = MutationUserStudent;
const { createUserDevice } = MutationUserDevice;

export default {
  User: {
    gender: resolver(User.Gender),
    userStudent: resolver(User.UserStudent),
    userProfile: resolver(User.UserProfile),
    userDevice: resolver(User.UserDevice),
    authProviders: resolver(User.AuthProvider),
    isStudent: user => user.isStudent(),
    token: user => user.getToken(),
    userSchools: resolver(User.UserSchool)
  },
  Query: {
    user: resolver(User),
    users: resolver(User)
  },
  Mutation: {
    registerUserStudent: (_, { userProfile, userSchool, userStudent, userDevice }, ctx) =>
      sequelize.transaction(transaction => {
        const ctxWithTransction = { ...ctx, transaction };
        return Promise.all([
          createOrUpdateUserProfile(_, { userProfile }, ctxWithTransction),
          createUserSchool(_, { userSchool }, ctxWithTransction),
          createOrUpdateUserStudent(_, { userStudent }, ctxWithTransction),
          createUserDevice(_, { userDevice }, ctxWithTransction)
        ]).then(() => ctx.user.reload({ transaction }));
      })
  }
};
