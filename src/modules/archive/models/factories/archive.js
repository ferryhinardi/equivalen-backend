import faker from 'faker';
import { Archive } from 'models';
import { QuestionTypeFactory } from 'modules/question/models/factories/questionType';
import { CurriculumFactory } from 'modules/question/models/factories/curriculum';
import { CourseFactory } from 'modules/question/models/factories/course';
import { EvaluationFactory } from './evaluation';

export async function ArchiveFactory(archiveData) {
  const questionType = await QuestionTypeFactory();
  const evaluation = await EvaluationFactory();
  const curriculum = await CurriculumFactory();
  const course = await CourseFactory();
  const data = {
    name: faker.random.word(),
    minimumScore: faker.random.number(),
    totalQuestion: 3,
    question_type_id: questionType.id,
    evaluation_id: evaluation[0].id,
    curriculum_id: curriculum.id,
    course_id: course.id,
    ...archiveData
  };

  return Archive.create(data);
}

export default ArchiveFactory;
