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
          archive_id: archive.get('id'),
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

      let result;

      if (created) {
        result = await packageResult.setQuestions(questionsRelated, {
          ...(transaction ? { transaction } : {})
        });
      } else {
        result = await packageResult.update(packageData, {
          ...(transaction ? { transaction } : {})
        });
      }

      return result;
    });

  return promisePackages;
};

export default createOrUpdatePackage;
