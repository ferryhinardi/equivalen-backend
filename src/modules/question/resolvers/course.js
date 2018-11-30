import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Course } from 'models';

export default {
  Course: {
    chapters: resolver(Course.Chapter)
  },
  Query: {
    courses: resolver(Course)
  },
};
