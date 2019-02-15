import get from 'lodash/get';
import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import {
  sequelize,
  User,
  Archive,
  Evaluation,
  Package,
  PackageQuestion,
  Question
} from 'models';
import QuestionTypeResolver from 'modules/question/resolvers/questionType';
import { findCurriculum } from 'modules/question/resolvers/curriculum';
import { findCourse } from 'modules/question/resolvers/course';
import { findEvaluation } from './evaluation';

const { findQuestionType } = QuestionTypeResolver.Mutation;

export default {
  Archive: {
    curriculum: resolver(Archive.Curriculum),
    course: resolver(Archive.Course),
    evaluation: resolver(Archive.Evaluation),
    questionType: resolver(Archive.QuestionType),
    packages: resolver(Archive.Package),
    createdBy: resolver(Archive.CreatedBy),
    userArchives: resolver(Archive.UserArchive)
  },
  Query: {
    archives: resolver(Archive, {
      before: (findOption, args) => {
        let include = [];

        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.evaluation) {
          include = include.concat([{
            model: Evaluation,
            where: args.evaluation
          }]);
        }

        if (args.createdBy) {
          include = include.concat([{
            model: User,
            where: args.createdBy
          }]);
        }

        findOption.include = include;
        findOption.order = [ ['updatedAt', 'DESC'] ];

        return findOption;
      },
    }),
    archive: resolver(Archive, {
      before: (findOption, args) => {
        if (args.id) {
          findOption.where = {
            id: args.id
          };
        }

        return findOption;
      }
    })
  },
  Mutation: {
    createArchive: async (_, { archive: archiveParam }, ctx) => {
      let transaction;
      try {
        transaction = await sequelize.transaction();
        const [questionType, evaluation, curriculum, course] = await Promise.all([
          findQuestionType(archiveParam, { transaction }),
          findEvaluation(archiveParam, { transaction }),
          findCurriculum(archiveParam, { transaction }),
          findCourse(archiveParam, { transaction })
        ]);
        const archiveData = {
          name: archiveParam.name,
          minimumScore: archiveParam.minimumScore,
          totalQuestion: archiveParam.totalQuestion,
          question_type_id: questionType.get('id'),
          evaluation_id: evaluation.get('id'),
          curriculum_id: curriculum.get('id'),
          course_id: course.get('id'),
          created_by: get(ctx, 'user.id')
        };
        const alreadyCreated = await Archive.findOne({
          where: archiveData,
          transaction
        });

        if (alreadyCreated) {
          throw new Error('Arsip sudah pernah dibuat');
        }

        const packages = [
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
          packages
        }, {
          include: [{
            model: Package,
            as: 'packages',
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
