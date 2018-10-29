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
  const isAvailableAssignLicenseCode = license.dataValues && !license.dataValues.active;

  if (!isAvailableAssignLicenseCode) {
    throw new Error('License cannot be used!');
  }

  await license.update({
      active: true,
      userId: user.id,
    },
    ...(transaction ? { transaction } : {})
  );

  const userDeviceData = {
    hostname: userDeviceParam.hostname,
    platform: userDeviceParam.platform,
    deviceId: userDeviceParam.deviceId,
    licenseId: license.dataValues.id,
    userId: 1,
  };
  const [userDevice, created] = await UserDevice.findOrCreate({
    where: {
      deviceId: userDeviceData.deviceId,
      licenseId: license.dataValues.id
    },
    defaults: userDeviceData,
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
