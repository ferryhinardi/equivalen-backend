import faker from 'faker';
import { Course } from 'models';

export async function CourseFactory(fData) {
  const data = {
    name: faker.random.words(),
    ...fData,
  };

  const course = await Course.create(data);
  return course;
}

export default CourseFactory;
