import { QuestionType } from 'models';

const Mutation = {};
Mutation.createOrUpdateQuestionType = async (
  _,
  { questionType: questionTypeData },
  { transaction }
) => {
  const [questionType, created] = await QuestionType.findOrCreate({
    where: questionTypeData,
    ...(transaction ? { transaction } : {})
  });
  if (!created) {
    await questionType.update(questionTypeData, {
      ...(transaction ? { transaction } : {})
    });
  }
  return questionType;
};

export default {
  Mutation
};
