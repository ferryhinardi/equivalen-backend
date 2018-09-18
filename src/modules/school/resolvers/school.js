import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { School, Sequelize } from 'models';

export default {
  Query: {
    schools: resolver(School, {
      before: (findOption, args) => {
        if (args.keyword) {
          findOption.where = {
            name: {
              [Sequelize.Op.like]: `${args.keyword}%`
            }
          };
        }
        return findOption;
      }
    })
  }
};
