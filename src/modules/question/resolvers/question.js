import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import get from 'lodash/get';
import {
  Curriculum,
  Course,
  Chapter,
  Question,
  QuestionInfo,
  QuestionOption,
  QuestionType,
  Package,
  PackageQuestion,
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
    questions: resolver(Question, {
      before: (findOption, args) => {
        let include = [];

        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.id) {
          findOption.where = {
            id: args.id
          };
        }

        if (args.questionInfo) {
          let includeQuestionInfo = [];

          if (args.questionInfo.curriculum) {
            includeQuestionInfo = includeQuestionInfo.concat([{
              model: Curriculum,
              where: args.questionInfo.curriculum,
              as: 'question_info_curriculum'
            }]);
          }
          if (args.questionInfo.course) {
            includeQuestionInfo = includeQuestionInfo.concat([{
              model: Course,
              where: args.questionInfo.course,
              as: 'question_info_course'
            }]);
          }
          if (args.questionInfo.chapter) {
            includeQuestionInfo = includeQuestionInfo.concat([{
                model: Chapter,
                where: args.questionInfo.chapter,
                as: 'question_info_chapter'
            }]);
          }

          include = include.concat([{
            model: QuestionInfo,
            include: includeQuestionInfo
          }]);
        }

        if (args.package) {
          include = include.concat([{
            model: PackageQuestion,
            include: [{
              model: Package,
              where: args.package
            }]
          }]);
        }

        if (args.type) {
          include = include.concat([{
            model: QuestionType,
            where: args.type
          }]);
        }

        findOption.include = include;

        return findOption;
      },
    })
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
