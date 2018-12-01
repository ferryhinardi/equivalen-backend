import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, sequelize } from 'models';

import { Mutation as MutationUserProfile } from './userProfile';
import { Mutation as MutationUserSchool } from './userSchool';
import { Mutation as MutationUserStudent } from './userStudent';
import { Mutation as MutationUserDevice } from './userDevice';
import { Mutation as MutationUserTeacher } from './userTeacher';

const { createOrUpdateUserProfile } = MutationUserProfile;
const { createUserSchool } = MutationUserSchool;
const { createOrUpdateUserStudent } = MutationUserStudent;
const { createUserDevice } = MutationUserDevice;
const { createOrUpdateUserTeacher } = MutationUserTeacher;

export default {
  User: {
    gender: resolver(User.Gender),
    userStudent: resolver(User.UserStudent),
    userTeacher: resolver(User.UserTeacher),
    userProfile: resolver(User.UserProfile),
    userDevice: resolver(User.UserDevice),
    authProviders: resolver(User.AuthProvider),
    isStudent: user => user.isStudent(),
    isTeacher: user => user.isTeacher(),
    token: user => user.getToken(),
    userSchools: resolver(User.UserSchool)
  },
  Query: {
    user: resolver(User),
    users: resolver(User),
    currentUser: (_, models, ctx) => {
      const user = User.getCurrentUser(ctx.token);
      return user;
    }
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
      }),
    registerUserTeacher: (_, { userProfile, userSchool, userTeacher, userDevice }, ctx) =>
      sequelize.transaction(transaction => {
        const ctxWithTransction = { ...ctx, transaction };
        return Promise.all([
          createOrUpdateUserProfile(_, { userProfile }, ctxWithTransction),
          createUserSchool(_, { userSchool }, ctxWithTransction),
          createOrUpdateUserTeacher(_, { userTeacher }, ctxWithTransction),
          createUserDevice(_, { userDevice }, ctxWithTransction)
        ]).then(() => ctx.user.reload({ transaction }));
      }),
  }
};
