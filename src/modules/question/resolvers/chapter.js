import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Chapter } from 'models';

export default {
  Chapter: {
    course: resolver(Chapter.Course)
  },
  Query: {
    chapters: resolver(Chapter, {
      before: (findOption, args) => {
        if (args.courseId) {
          findOption.where = {
            course_id: args.courseId
          }
        }

        return findOption;
      },
    })
  },
};
