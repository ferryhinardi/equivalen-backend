import faker from 'faker';
import { Question, QuestionType, Option, sequelize } from 'models';

export async function QuestionFactory(questionData) {
  return sequelize.transaction(async t => {
    const questionType = await QuestionType.findOne({
      where: {
        name: QuestionType.OPTION
      },
      transaction: t
    });

    const data = {
      question_type_id: questionType.id,
      content: faker.lorem.paragraphs(),
      ...questionData
    };
    const question = await Question.create(data, { transaction: t });

    const options = await Option.findAll({ transaction: t });
    await Promise.all(
      options.map(option =>
        question.addOption(option, {
          through: {
            content: faker.lorem.paragraph(),
            order: option.id
          },
          transaction: t
        })
      )
    );
    return question;
  });
}

export default QuestionFactory;
