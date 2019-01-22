import { PackageFactory } from './package';
import { QuestionFactory } from 'modules/question/models/factories/question';

export async function PackageQuestionFactory() {
  const package1 = await PackageFactory();
  const question = await QuestionFactory();
  const [[packageQuestion]] = await package1.addQuestion(question);

  return packageQuestion;
}

export default PackageQuestionFactory;
