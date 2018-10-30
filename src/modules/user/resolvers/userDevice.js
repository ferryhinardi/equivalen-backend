import { UserDevice, License } from 'models';

const Mutation = {};
Mutation.createUserDevice = async (
  _,
  { userDevice: userDeviceParam },
  { user, transaction }
) => {
  const license = await License.findOne({
    where: {
      licenseCode: userDeviceParam.licenseCode
    },
  });
  const isAvailableAssignLicenseCode = license && !license.active;

  if (!isAvailableAssignLicenseCode) {
    throw new Error('License cannot be used!');
  }

  await license.update({
    active: true,
    userId: user.id,
  }, {
    ...(transaction ? { transaction } : {})
  });
  
  const [userDevice, created] = await UserDevice.findOrCreate({
    where: {
      hostname: userDeviceParam.hostname,
      platform: userDeviceParam.platform,
      deviceId: userDeviceParam.deviceId,
      license_id: license.id,
      user_id: user.id,
    },
    ...(transaction ? { transaction } : {})
  });

  if (!created) {
    throw new Error('License already used!');
  }

  return userDevice;
};

export default {
  Mutation
};
