import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { UserProfile } from 'models';

export default {
  Mutation: {
    createUserProfile: async (_, userProfileData, { user }) => {
      const [userProfile, created] = await UserProfile.findOrCreate({
        where: {
          userId: user.id,
        },
        defaults: userProfileData
      });
      if (!created) {
        await userProfile.update(userProfileData);
      }
      return userProfile;
    }
  }
}