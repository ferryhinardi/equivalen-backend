import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Classes, Grade } from 'models';

export default {
  Classes: {
    grade: resolver(Classes.Grade)
  },
  Query: {
    classes: resolver(Classes, {
      before: (findOption, args) => {
        let include = [];

        if (args.grade) {
          include = include.concat([{
            model: Grade,
            where: args.grade,
            required: true
          }]);
        }

        findOption.include = include;

        return findOption;
      },
    })
  },
};
