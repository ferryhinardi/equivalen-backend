import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Question, VideoTutorial } from 'models';

export default {
  VideoTutorial: {
    question: resolver(Question)
  },
  Query: {
    videoTutorials: resolver(VideoTutorial)
  },
};