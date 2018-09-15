import { UserProfile } from 'models';

const Mutation = {};
Mutation.createOrUpdateUserProfile = async (
  _,
  { userProfile: userProfileData },
  { user, transaction }
) => {
  const [userProfile, created] = await UserProfile.findOrCreate({
    where: {
      userId: user.id
    },
    defaults: userProfileData,
    ...(transaction ? { transaction } : {})
  });
  if (!created) {
    await userProfile.update(userProfileData, {
      ...(transaction ? { transaction } : {})
    });
  }
  return userProfile;
};

Mutation.createUserProfile = Mutation.createOrUpdateUserProfile;

export default {
  Mutation
};
