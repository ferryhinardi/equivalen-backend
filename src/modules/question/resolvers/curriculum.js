import { Curriculum } from 'models';

export const findCurriculum = async ({ curriculum }) => {
  const curriculumResult = await Curriculum.findOne({
    where: curriculum,
  });

  return curriculumResult;
};

export default findCurriculum;
