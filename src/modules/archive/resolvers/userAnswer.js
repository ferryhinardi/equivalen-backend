import get from 'lodash/get';
import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Sequelize, sequelize, UserAnswer, UserArchive, Question } from 'models';

export default {
  UserAnswer: {
    userArchive: resolver(UserAnswer.UserArchive),
    question: resolver(UserAnswer.Question)
  },
  Mutation: {
    createUserAnswer: (_, { userAnswer: userAnswerParam }) =>
      sequelize.transaction(async (transaction) => {
        const { archiveId, id: userArchiveId } = get(userAnswerParam, 'userArchive', {});
        const questionId = get(userAnswerParam, 'question.id');
        let userArchive;

        if (archiveId) {
          userArchive = await UserArchive.findOne({
            where: { archive_id: archiveId },
            ...(transaction ? { transaction } : {})
          });
        } else if (userArchiveId) {
          userArchive = await UserArchive.findByPk(userArchiveId, {
            ...(transaction ? { transaction } : {})
          });
        }

        if (!userArchive) {
          throw new Error('Arship murid tidak ditemukan');
        }

        const question = await Question.findByPk(questionId);

        if (!question) {
          throw new Error('Soal tidak ditemukan');
        }

        const [[userAnswer]] = await userArchive.addQuestion(question, {
          through: {
            orderNo: userAnswerParam.orderNo,
            answer: userAnswerParam.answer
          },
          ...(transaction ? { transaction } : {})
        });

        return userAnswer;
      }),
    createUserAnswers: (_, { userAnswers }) =>
      sequelize.transaction(async (transaction) => {
        const { archiveId, id: userArchiveId } = get(userAnswers, 'userArchive', {});
        let userArchive;

        if (archiveId) {
          userArchive = await UserArchive.findOne({
            where: { archive_id: archiveId },
            ...(transaction ? { transaction } : {})
          });
        } else if (userArchiveId) {
          userArchive = await UserArchive.findByPk(userArchiveId, {
            ...(transaction ? { transaction } : {})
          });
        }

        if (!userArchive) {
          throw new Error('Arship murid tidak ditemukan');
        }

        const answers = get(userAnswers, 'answers', []);
        const promises = answers.map(async ({ question, orderNo, answer }) => {
          const questionRelated = await Question.findByPk(question.id);
          const [[userAnswer]] = await userArchive.addQuestion(questionRelated, {
            through: {
              orderNo,
              answer
            },
            ...(transaction ? { transaction } : {})
          });

          return userAnswer;
        });

        return Promise.all(promises);
      })
  }
};