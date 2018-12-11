import get from 'lodash/get';
import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { sequelize, User, Archive, Evaluation, Package, PackageQuestion } from 'models';
import QuestionTypeResolver from 'modules/question/resolvers/questionType';
import { findCurriculum } from 'modules/question/resolvers/curriculum';
import { findEvaluation } from './evaluation';

const { findQuestionType } = QuestionTypeResolver.Mutation;

export default {
  Archive: {
    curriculum: resolver(Archive.Curriculum),
    evaluation: resolver(Archive.Evaluation),
    questionType: resolver(Archive.QuestionType),
    packages: resolver(Archive.Package),
    createdBy: resolver(Archive.CreatedBy),
    assignment: resolver(Archive.Assignment)
  },
  Query: {
    archives: resolver(Archive, {
      before: (findOption, args) => {
        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.evaluation) {
          findOption.include = [{
            model: Evaluation,
            where: args.evaluation
          }]
        }

        if (args.createdBy) {
          findOption.include = [{
            model: User,
            where: args.createdBy
          }]
        }

        findOption.order = [ ['updatedAt', 'DESC'] ];

        return findOption;
      },
    })
  },
  Mutation: {
    createArchive: async (_, { archive: archiveParam }, ctx) => {
      let transaction;
      try {
        transaction = await sequelize.transaction();
        const [questionType, evaluation, curriculum] = await Promise.all([
          findQuestionType(archiveParam, { transaction }),
          findEvaluation(archiveParam, { transaction }),
          findCurriculum(archiveParam, { transaction }),
        ]);
        const archiveData = {
          name: archiveParam.name,
          minimumScore: archiveParam.minimumScore,
          question_type_id: questionType.get('id'),
          evaluation_id: evaluation.get('id'),
          curriculum_id: curriculum.get('id'),
          created_by: get(ctx, 'user.id')
        };
        const alreadyCreated = await Archive.findOne({
          where: archiveData,
          transaction
        });

        if (alreadyCreated) {
          throw new Error('Archive already registered');
        }

        const Packages = [
          ...archiveParam.packages.map(pack => {
            const { questions, ...p } = pack;
            return {
              ...p,
              PackageQuestions: questions.map(qs => ({
                question_id: qs.id
              })),
            };
          })
        ];

        const archive = await Archive.create({
          ...archiveData,
          Packages
        }, {
          include: [{
            model: Package,
            include: [PackageQuestion]
          }],
          transaction
        });

        await transaction.commit();
        return archive;
      } catch (err) {
        await transaction.rollback();
        return err;
      }
    },
  },
};
