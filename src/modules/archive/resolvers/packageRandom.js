import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import {
  Sequelize,
  sequelize,
  Archive,
  UserArchive,
  Question,
  Package,
  PackageQuestion,
  PackageRandom,
} from 'models';
import { getRandomNumber } from '../utils/randomize';

export default {
  PackageRandom: {
    package: resolver(PackageRandom.Package),
    question: resolver(PackageRandom.Question),
    userAnswer: resolver(PackageRandom.UserAnswer),
    userArchive: resolver(PackageRandom.UserArchive)
  },
  Mutation: {
    generateRandomQuestion: (_, { userArchiveId }) =>
      sequelize.transaction(async (transaction) => {
        const userArchive = await UserArchive.findOne({
          where: {
            id: userArchiveId
          },
          transaction
        });
        const userPackageRandom = await PackageRandom.findAll({
          where: {
            user_archive_id: userArchiveId,
          },
          transaction
        });

        if (userArchive.score !== null) {
          throw new Error('Soal sudah pernah dijawab');
        }

        if (userPackageRandom.length) {
          return userPackageRandom;
        }

        const archive = await Archive.findOne({
          where: { id: userArchive.archive_id },
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

        if (!archive) {
          throw new Error('Arsip tidak ditemukan');
        }

        const totalQuestion = archive.totalQuestion || 0;
        const questions = [];
        const { packages } = archive;
        const totalPackages = packages.length;
        
        Array(totalQuestion).fill().forEach((_, index) => {
          const randomPackageIndex = getRandomNumber(0, totalPackages - 1);
          const question = {
            user_archive_id: userArchive.id,
            package_id: packages[randomPackageIndex].id,
            question_id: packages[randomPackageIndex].questions[index].id,
            orderNo: index + 1
          };
          questions.push(question);
        });

        const packageRandom = await PackageRandom.bulkCreate(questions);
        return packageRandom;
      })
  }
}