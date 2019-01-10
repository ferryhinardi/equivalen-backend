import faker from 'faker';
import { GradeFactory } from './grade';
import { Classes } from 'models';

export async function ClassesFactory(fData) {
  const grade = await GradeFactory();
  const data = {
    name: faker.random.words(),
    grade, 
    ...fData,
  };
  const classes = await Classes.create(data);
  return classes;
};

export default ClassesFactory;
