import faker from 'faker';
import { School } from 'models';

export async function SchoolFactory(fData) {
  const data = {
    name: faker.random.words(),
    city: faker.address.city(),
    district: faker.address.cityPrefix(),
    province: faker.address.state(),
    ...fData,
  };
  const school = await School.create(data);
  return school;
}

export default SchoolFactory;