import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Question, QuestionInfo, VideoTutorial } from 'models';

export default {
  VideoTutorial: {
    question: resolver(Question)
  },
  Query: {
    videoTutorials: resolver(VideoTutorial, {
      before: (findOption, args) => {
        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.order) {
          findOption.include = [{
            model: Question,
            include: {
              model: QuestionInfo,
              order: [
                ['chapter_id', 'ASC']
              ]
            }
          }];
        }

        if (args.courseId) {
          findOption.include = [{
            model: Question,
            include: {
              model: QuestionInfo,
              where: { course_id: args.courseId }
            }
          }]
        }

        return findOption;
      },
    })
  },
};