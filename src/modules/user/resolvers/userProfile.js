import { UserProfile } from 'models';

const Mutation = {};
Mutation.createOrUpdateUserProfile = async (
  _,
  { userProfile: userProfileData },
  { user, transaction }
) => {
  let userProfile = await UserProfile.findOne({
    where: {
      userId: user.id
    },
    ...(transaction ? { transaction } : {})
  });

  if (!userProfile) {
    userProfile = await UserProfile.create({
      ...userProfileData,
      userId: user.id
    }, {
      ...(transaction ? { transaction } : {})
    });
  } else {
    await userProfile.update(userProfileData, {
      ...(transaction ? { transaction } : {})
    });
    userProfile.reload();
  }

  return userProfile;
};

Mutation.createUserProfile = Mutation.createOrUpdateUserProfile;

export default {
  Mutation
};
