import faker from 'faker';
import { Curriculum } from 'models';

export async function CurriculumFactory(fData) {
  const data = {
    name: faker.random.words(),
    ...fData,
  };

  const curriculum = await Curriculum.create(data);
  return curriculum;
}

export default CurriculumFactory;
