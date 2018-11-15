import faker from 'faker';
import { ProvinceFactory } from './province';
import { CityFactory } from './city';
import { DistrictFactory } from './district';
import { School } from 'models';

export async function SchoolFactory(fData) {
  const province = await ProvinceFactory();
  const city = await CityFactory({ province });
  const district = await DistrictFactory({ city });
  const data = {
    name: faker.random.words(),
    province,
    city,
    district,
    ...fData
  };
  const school = await School.create(data);
  return school;
}

export default SchoolFactory;
