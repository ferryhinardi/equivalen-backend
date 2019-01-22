import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { sequelize, Archive, Question, Package, PackageQuestion, PackageRandom } from 'models';
import { getRandomNumber } from '../utils/randomize';

export default {
  PackageRandom: {
    user: resolver(PackageRandom.User),
    package: resolver(PackageRandom.Package),
    question: resolver(PackageRandom.Question)
  },
  Mutation: {
    generateRandomQuestion: (_, { archive: archiveParam }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const archiveId = archiveParam.id;
        const archive = await Archive.findOne({
          where: { id: archiveId },
          include: [
            {
              model: Package,
              as: 'packages',
              include: [{
                model: Question,
                through: PackageQuestion,
                as: 'questions'
              }]
            }
          ],
          transaction
        });
        const totalQuestion = archive.totalQuestion || 0;
        const questions = [];
        const { packages } = archive;
        const totalPackages = packages.length;
        
        Array(totalQuestion).fill().forEach((_, index) => {
          const randomPackageIndex = getRandomNumber(0, totalPackages - 1);
          const question = {
            archive_id: archive.id,
            package_id: packages[randomPackageIndex].id,
            question_id: packages[randomPackageIndex].questions[index].id,
            user_id: user.id,
            orderNo: index + 1
          };
          questions.push(question);
        });

        const packageRandom = await PackageRandom.bulkCreate(questions);
        return packageRandom;
      })
  }
}