import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Evaluation } from 'models';

export const findEvaluation = async ({ evaluation }) => {
  const evaluationResult = await Evaluation.findOne({
    where: evaluation,
  });

  return evaluationResult;
};

export default {
  Query: {
    evaluations: resolver(Evaluation)
  },
};