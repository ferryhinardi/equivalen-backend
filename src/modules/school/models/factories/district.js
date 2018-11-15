import faker from 'faker';
import { CityFactory } from './city';
import { District } from 'models';

export async function DistrictFactory(fData) {
  const city = await CityFactory();
  const data = {
    name: faker.address.cityPrefix(),
    city,
    ...fData,
  };
  const district = await District.create(data);
  return district;
};

export default DistrictFactory;