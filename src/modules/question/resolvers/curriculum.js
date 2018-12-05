import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Curriculum } from 'models';

export const findCurriculum = async ({ curriculum }, { transaction }) => {
  const curriculumResult = await Curriculum.findOne({
    where: curriculum,
    ...(transaction ? { transaction } : {})
  });

  return curriculumResult;
};

export default {
  Query: {
    curriculums: resolver(Curriculum)
  },
};