import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Course } from 'models';

export const findCourse = async ({ course }, { transaction }) => {
  const courseResult = await Course.findOne({
    where: course,
    ...(transaction ? { transaction } : {})
  });

  return courseResult;
};

export default {
  Course: {
    chapters: resolver(Course.Chapter)
  },
  Query: {
    courses: resolver(Course)
  },
};
