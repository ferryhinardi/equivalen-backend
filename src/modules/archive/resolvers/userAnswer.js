import get from 'lodash/get';
import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Sequelize, sequelize, UserAnswer, UserArchive, Question } from 'models';

export default {
  UserAnswer: {
    user: resolver(UserAnswer.User),
    archive: resolver(UserAnswer.Archive),
    question: resolver(UserAnswer.Question)
  },
  Mutation: {
    createUserAnswer: (_, { userAnswer: userAnswerParam }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const { archiveId } = userAnswerParam;
        const questionId = get(userAnswerParam, 'question.id');
        const userArchive = await UserArchive.findOne({
          where: { archive_id: archiveId },
          ...(transaction ? { transaction } : {})
        });

        if (!userArchive) {
          throw new Error('Arship murid tidak ditemukan');
        }

        const question = await Question.findByPk(questionId);

        if (!question) {
          throw new Error('Soal tidak ditemukan');
        }

        let userAnswer = await UserAnswer.findOne({
          where: {
            user_id: user.id,
            archive_id: archiveId,
            question_id: questionId,
          },
          ...(transaction ? { transaction } : {})
        });

        if (!userAnswer) {
          userAnswer = await UserAnswer.create({
            user_id: user.id,
            archive_id: archiveId,
            question_id: questionId,
            orderNo: userAnswerParam.orderNo,
            answer: userAnswerParam.answer
          }, {
            ...(transaction ? { transaction } : {})
          });
        } else {
          userAnswer = await userAnswer.update(userAnswerParam, {
            ...(transaction ? { transaction } : {})
          });
        }

        return userAnswer;
      }),
    createUserAnswers: (_, { userAnswers }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const { archiveId } = userAnswers;
        const userArchive = await UserArchive.findOne({
          where: { archive_id: archiveId },
          ...(transaction ? { transaction } : {})
        });

        if (!userArchive) {
          throw new Error('Arship murid tidak ditemukan');
        }

        const answers = get(userAnswers, 'answers', []);
        const promises = answers.map(async ({ question, orderNo, answer }) => {
          const questionRelated = await Question.findByPk(question.id);
          let userAnswer = await UserAnswer.findOne({
            where: {
              user_id: user.id,
              archive_id: archiveId,
              question_id: questionRelated.id,
            },
            ...(transaction ? { transaction } : {})
          });
          
          if (!userAnswer) {
            userAnswer = await UserAnswer.create({
              user_id: user.id,
              archive_id: archiveId,
              question_id: questionRelated.id,
              orderNo,
              answer
            }, {
              ...(transaction ? { transaction } : {})
            });
          } else {
            userAnswer = await userAnswer.update({ orderNo, answer }, {
              ...(transaction ? { transaction } : {})
            });
          }

          return userAnswer;
        });

        return Promise.all(promises);
      })
  }
};