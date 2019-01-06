import { License } from 'models';

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

  if (!license) {
    throw new Error('License tidak ditemukan!');
  }

  if (license.active) {
    throw new Error('License sudah pernah digunakan!');
  }

  await license.update({
    active: true
  }, {
    ...(transaction ? { transaction } : {})
  });

  const userDeviceData = {
    hostname: userDeviceParam.hostname,
    platform: userDeviceParam.platform,
    deviceId: userDeviceParam.deviceId,
  };

  const [[userDevice]] = await user.addLicense(license, {
    through: userDeviceData,
    ...(transaction ? { transaction } : {})
  });

  return userDevice;
};

export default {
  Mutation
};
