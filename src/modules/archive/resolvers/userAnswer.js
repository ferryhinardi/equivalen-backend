import get from 'lodash/get';
import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import {
  sequelize,
  UserAnswer,
  Archive,
  UserArchive,
  Question
} from 'models';
import { equals, normalize } from '../utils/correction';

export default {
  UserAnswer: {
    user: resolver(UserAnswer.User),
    archive: resolver(UserAnswer.Archive),
    question: resolver(UserAnswer.Question)
  },
  Mutation: {
    saveUserAnswer: (_, { userAnswer: userAnswerParam }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const { archiveId } = userAnswerParam;
        const questionId = get(userAnswerParam, 'question.id');
        const userArchive = await UserArchive.findOne({
          where: { archive_id: archiveId, user_id: user.id },
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
    saveUserAnswers: (_, { userAnswers }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const { archiveId } = userAnswers;
        const userArchive = await UserArchive.findOne({
          where: { archive_id: archiveId, user_id: user.id },
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
      }),
    collectScore: (_, { archiveId }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const archive = await Archive.findByPk(archiveId);
        const userAnswer = await UserAnswer.findAll({
          include: [{ model: Question }],
          where: { archive_id: archiveId, user_id: user.id },
          ...(transaction ? { transaction } : {})
        });
        const { totalQuestion } = archive;
        let score = 0;
        let totalCorrect = 0;
        let totalIncorrect = 0;
        let totalUnanswer = 0;
        const totalDoubt = 0;
        const duration = 0;

        Array(totalQuestion).fill().forEach((_, idx) => {
          if (userAnswer[idx]) {
            const { answer, Question: q } = userAnswer[idx];

            if (equals(answer, q.answer)) {
              totalCorrect += 1;
            } else {
              totalIncorrect += 1;
            }
          } else {
            totalUnanswer += 1;
          }
        });

        score = Math.floor((totalCorrect / totalQuestion) * 100);

        const userArchive = await UserArchive.findOne({
          where: { archive_id: archiveId, user_id: user.id },
          ...(transaction ? { transaction } : {})
        });

        if (!userArchive) {
          throw new Error('Arsip Murid tidak ditemukan');
        }
        
        const res = await userArchive.update({ score, totalCorrect, totalIncorrect, totalDoubt, totalUnanswer, duration });

        return res;
      })
  }
};