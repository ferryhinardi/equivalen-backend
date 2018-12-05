import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Sequelize, Package, Question } from 'models';

export const createOrUpdatePackage = async (
  _,
  { packages, archive },
  { transaction },
) => {
  const promisePackages = packages.map(
    async (packageData) => {
      const { questions, ...pack } = packageData;
      const [packageResult, created] = await Package.findOrCreate({
        where: pack,
        defaults: {
          ...pack,
        },
        ...(transaction ? { transaction } : {})
      });
      const questionsRelated = await Question.findAll({
        attributes: ['id', 'content'],
        where: {
          id: {
            [Sequelize.Op.in]: questions.map(question => question.id)
          }
        },
        ...(transaction ? { transaction } : {})
      });

      if (!questionsRelated) {
        throw new Error('Question Not Found');
      }

      if (created) {
        await packageResult.addArchive(archive);
        await packageResult.setQuestions(questionsRelated, {
          ...(transaction ? { transaction } : {})
        });
      } else {
        await packageResult.update(packageData, {
          ...(transaction ? { transaction } : {})
        });
      }

      return packageResult;
    });

  return promisePackages;
};

export default {
  Package: {
    archive: resolver(Package.Archive),
    questions: resolver(Package.Question),
    totalQuestion: packageData => packageData.getPackageQuestions()
  },
  Query: {
    packages: resolver(Package)
  },
};
