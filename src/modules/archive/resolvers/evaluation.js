import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Evaluation } from 'models';

export const findEvaluation = async ({ evaluation }, { transaction }) => {
  const evaluationResult = await Evaluation.findOne({
    where: evaluation,
    ...(transaction ? { transaction } : {})
  });

  return evaluationResult;
};

export default {
  Query: {
    evaluations: resolver(Evaluation)
  },
};