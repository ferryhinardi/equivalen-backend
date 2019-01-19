import faker from 'faker';
import { Archive } from 'models';
import { QuestionTypeFactory } from 'modules/question/models/factories/questionType';
import { CurriculumFactory } from 'modules/question/models/factories/curriculum';
import { QuestionFactory } from 'modules/question/models/factories/question';
import { EvaluationFactory } from './evaluation';

export async function ArchiveFactory(archiveData) {
  const questionType = await QuestionTypeFactory();
  const evaluation = await EvaluationFactory();
  const curriculum = await CurriculumFactory();
  const question1 = await QuestionFactory();
  const question2 = await QuestionFactory();
  const data = {
    name: faker.random.word(),
    minimumScore: faker.random.number(),
    question_type_id: questionType.id,
    evaluation_id: evaluation[0].id,
    curriculum_id: curriculum.id,
    packages: [
      {
        name: faker.random.word(),
        questions: [{
          id: question1.id
        }, {
          id: question2.id
        }]
      }
    ],
    ...archiveData
  };

  return Archive.create(data);
}

export default ArchiveFactory;
