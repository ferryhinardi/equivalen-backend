import faker from 'faker';
import { Grade } from 'models';

export async function GradeFactory(fData) {
  const data = {
    name: faker.random.words(),
    ...fData,
  };
  const grade = await Grade.create(data);
  return grade;
};

export default GradeFactory;
