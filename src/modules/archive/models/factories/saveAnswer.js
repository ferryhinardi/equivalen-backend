import { UserStudentFactory } from 'modules/user/models/factories/userStudent';
import { UserArchiveFactory } from 'modules/archive/models/factories/userArchive';
import { QuestionFactory } from 'modules/question/models/factories/question';
import { UserAnswer } from 'models';

export async function SaveAnswerFactory(params) {
  const userStudent = await UserStudentFactory();
  const userArchive = await UserArchiveFactory({
    user_id: userStudent.id
  });

  const question = await QuestionFactory();
  const answerParam = 'A';
  const orderNoParam = 1;

  const data = {
    user_id: userStudent.id,
    question_id: question.id,
    archive_id: userArchive.archive_id,
    orderNo: orderNoParam,
    answer: answerParam,
    ...params,
  };

  return UserAnswer.create(data);
}

export default SaveAnswerFactory;
