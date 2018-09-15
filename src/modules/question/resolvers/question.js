import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Question, QuestionOption } from 'models';

export default {
  Question: {
    type: resolver(Question.QuestionType),
    options: resolver(Question.QuestionOption, {
      before: findOptions => {
        findOptions.order = [['order', 'asc']];
        return findOptions;
      }
    })
  },
  QuestionOption: {
    option: resolver(QuestionOption.Option)
  },
  Query: {
    questions: resolver(Question)
  }
};
