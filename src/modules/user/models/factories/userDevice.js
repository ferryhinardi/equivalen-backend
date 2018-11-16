import faker from 'faker';
import { UserDevice } from 'models';
import { LicenseFactory } from 'modules/license/models/factories/license';
import { UserFactory } from './user';

export async function UserDeviceFactory(fData) {
  const user = await UserFactory();
  const license = await LicenseFactory();

  const data = {
    hostname: faker.internet.ip(),
    deviceId: faker.random.uuid(),
    platform: faker.internet.userAgent(),
    user_id: user.id,
    license_id: license.id,
    ...fData,
  };
  const userDevice = await UserDevice.create(data);

  return userDevice;
};

export default UserDeviceFactory;
