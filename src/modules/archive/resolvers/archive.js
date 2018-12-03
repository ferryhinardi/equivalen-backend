import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { sequelize, Archive, Evaluation } from 'models';
import QuestionTypeResolver from 'modules/question/resolvers/questionType';
import { findCurriculum } from 'modules/question/resolvers/curriculum';
import { findEvaluation } from './evaluation';
import { createOrUpdatePackage } from './package';

const { createOrUpdateQuestionType } = QuestionTypeResolver.Mutation;

export default {
  Archive: {
    curriculum: resolver(Archive.Curriculum),
    evaluation: resolver(Archive.Evaluation),
    questionType: resolver(Archive.QuestionType),
    packages: resolver(Archive.Package)
  },
  Query: {
    archives: resolver(Archive, {
      before: (findOption, { args }) => {
        if (args.evaluation) {
          findOption.include = [{
            model: Evaluation,
            where: args.evaluation
          }]
        }

        return findOption;
      },
    })
  },
  Mutation: {
    createOrUpdateArchive: (_, { archive: archiveParam }, ctx) => {
      return sequelize.transaction(async (transaction1) => {
        return sequelize.transaction(async (transaction2) => {
          const ctxWithTransction = { ...ctx, transaction1 };
          const [questionType, evaluation, curriculum] = await Promise.all([
            createOrUpdateQuestionType(_, { questionType: archiveParam.questionType }, { transaction: null }),
            findEvaluation(archiveParam),
            findCurriculum(archiveParam),
          ]);

          const archiveData = {
            id: archiveParam.id,
            name: archiveParam.name,
            minimumScore: archiveParam.minimumScore,
            question_type_id: questionType.get('id'),
            evaluation_id: evaluation.get('id'),
            curriculum_id: curriculum.get('id'),
          };
          const [archive, created] = await Archive.findOrCreate({
            where: archiveData,
            ...(transaction2 ? { transaction: transaction2 } : {})
          });
  
          if (created) {
            await createOrUpdatePackage(_, { ...archiveParam, archive }, ctxWithTransction)
          }
  
          return archive;
        });
      });
    },
  },
};
