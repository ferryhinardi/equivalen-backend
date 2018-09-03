import faker from 'faker';
import { Gender } from 'models';

export async function GenderFactory(fData) {
  const data = {
    name: faker.random.word(),
    ...fData,
  };
  return Gender.create(data);
}

export default GenderFactory;