import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { District } from 'models';

export default {
  District: {
    city: resolver(District.City),
    schools: resolver(District.School),
  },
  Query: {
    districts: resolver(District, {
      before: (findOption, args) => {
        if (args.cityId) {
          findOption.where = {
            city_id: args.cityId
          }
        }

        return findOption;
      },
    }),
  }
};
