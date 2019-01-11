import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Question, QuestionInfo, VideoTutorial } from 'models';

export default {
  VideoTutorial: {
    question: resolver(Question)
  },
  Query: {
    videoTutorials: resolver(VideoTutorial, {
      before: (findOption, args) => {
        let include = [];
      
        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.order) {
          include = include.concat([{
            model: Question,
            include: {
              model: QuestionInfo,
              order: [
                ['chapter_id', 'ASC']
              ]
            }
          }]);
        }

        if (args.courseId) {
          include = include.concat([{
            model: Question,
            include: {
              model: QuestionInfo,
              where: { course_id: args.courseId }
            }
          }]);
        }

        findOption.include = include;

        return findOption;
      },
    })
  },
};