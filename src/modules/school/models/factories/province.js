import faker from 'faker';
import { Province } from 'models';

export async function ProvinceFactory(fData) {
  const data = {
    name: faker.address.state(),
    ...fData,
  };
  const province = await Province.create(data);
  return province;
};

export default ProvinceFactory;