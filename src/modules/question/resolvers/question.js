import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import get from 'lodash/get';
import {
  Question,
  QuestionInfo,
  QuestionOption,
  sequelize,
} from 'models';

import { Mutation as MutationOption } from './option';
import { Mutation as MutationQuestionType } from './questionType';

const { createOrUpdateOption } = MutationOption;
const { createOrUpdateQuestionType } = MutationQuestionType;

export default {
  QuestionInfo: {
    curriculum: resolver(QuestionInfo.Curriculum),
    course: resolver(QuestionInfo.Course),
    chapter: resolver(QuestionInfo.Chapter),
  },
  Question: {
    questionInfos: resolver(Question.QuestionInfo),
    type: resolver(Question.QuestionType),
    createdBy: resolver(Question.CreatedBy),
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
  },
  Mutation: {
    createOrUpdateQuestion: (_, { question: questionParam }, ctx) =>
      sequelize.transaction(transaction => {
        const ctxWithTransction = { ...ctx, transaction };
        return Promise.all([
          createOrUpdateQuestionType(_, { questionType: questionParam.type }, ctxWithTransction),
          createOrUpdateOption(_, { options: questionParam.options }, ctxWithTransction)
        ]).then(async([questionType, options]) => {
          const questionData = {
            content: questionParam.content,
            answer: questionParam.answer,
            question_type_id: questionType.get('id'),
            created_by: get(ctx, 'user.id')
          };
          const question = await Question.create(questionData, { transaction });
          await Question.addOptions(question, options, transaction);

          return question;
        })
      }),
  },
};
