import { QuestionType } from 'models';

export async function QuestionTypeFactory(questionTypeData) {
  const data = {
    name: QuestionType.OPTION,
    ...questionTypeData,
  };

  return QuestionType.create(data);
}

export default QuestionTypeFactory;
