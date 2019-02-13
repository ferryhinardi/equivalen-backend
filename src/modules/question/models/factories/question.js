import faker from 'faker';
import { Question, Option } from 'models';

export async function QuestionFactory(questionData) {
  const data = {
    content: faker.lorem.paragraphs(),
    answer: 'A',
    ...questionData
  };
  const question = await Question.create(data);

  const options = await Option.findAll();
  await Promise.all(
    options.map(option =>
      question.addOption(option, {
        through: {
          content: faker.lorem.paragraph(),
          order: option.id
        }
      })
    )
  );
  return question;
}

export default QuestionFactory;
