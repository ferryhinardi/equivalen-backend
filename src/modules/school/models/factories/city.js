import faker from 'faker';
import { ProvinceFactory } from './province';
import { City } from 'models';

export async function CityFactory(fData) {
  const province = await ProvinceFactory();
  const data = {
    name: faker.address.city(),
    province,
    ...fData,
  };
  const city = await City.create(data);
  return city;
};

export default CityFactory;