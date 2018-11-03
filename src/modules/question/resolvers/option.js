import { Option } from 'models';

const Mutation = {};
Mutation.createOrUpdateOption = async (
  _,
  { options },
  { transaction }
) =>
  options.map(async opt => {
    const { option: optionData, ...rest } = opt;
    const [option, created] = await Option.findOrCreate({
      where: optionData,
      ...(transaction ? { transaction } : {})
    });

    if (!created) {
      await option.update(optionData, {
        ...(transaction ? { transaction } : {})
      });
    }

    return {
      ...rest,
      option
    };
  });

export default {
  Mutation
};
