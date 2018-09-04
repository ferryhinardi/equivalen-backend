import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserProfile } from 'models';

export default {
  Mutation: {
    createUserProfile: async (_, { userProfile: userProfileData }, { user, transaction }) => {
      const [userProfile, created] = await UserProfile.findOrCreate({
        where: {
          userId: user.id,
        },
        defaults: userProfileData,
        ...(transaction ? {transaction}: {}),
      });
      if (!created) {
        await userProfile.update(userProfileData, {
          ...(transaction ? {transaction}: {}),
        });
      }
      return userProfile;
    }
  }
}