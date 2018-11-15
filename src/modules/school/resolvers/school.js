import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { School, Sequelize } from 'models';

export default {
  School: {
    province: resolver(School.Province),
    city: resolver(School.City),
    district: resolver(School.District),
    users: resolver(School.User),
  },
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
