import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { sequelize, Archive } from 'models';
import QuestionTypeResolver from 'modules/question/resolvers/questionType';
import { findEvaluation } from './evaluation';
import { createOrUpdatePackage } from './package';

const { createOrUpdateQuestionType } = QuestionTypeResolver.Mutation;

export default {
  Archive: {
    evaluation: resolver(Archive.Evaluation),
    questionType: resolver(Archive.QuestionType),
    packages: resolver(Archive.Package)
  },
  Query: {
    archives: resolver(Archive)
  },
  Mutation: {
    createOrUpdateArchive: (_, { archive: archiveParam }, ctx) => {
      return sequelize.transaction(async (transaction1) => {
        return sequelize.transaction(async (transaction2) => {
          const ctxWithTransction = { ...ctx, transaction1 };
          const [questionType, evaluation] = await Promise.all([
            createOrUpdateQuestionType(_, { questionType: archiveParam.questionType }, { transaction: null }),
            findEvaluation(archiveParam),
          ]);

          const archiveData = {
            id: archiveParam.id,
            name: archiveParam.name,
            minimumScore: archiveParam.minimumScore,
            question_type_id: questionType.get('id'),
            evaluation_id: evaluation.get('id'),
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
