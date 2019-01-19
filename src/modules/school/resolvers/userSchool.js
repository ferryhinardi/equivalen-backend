import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Province, City, District, UserSchool, School } from 'models';

export default {
  UserSchool: {
    school: resolver(UserSchool.School),
    user: resolver(UserSchool.User)
  },
  Mutation: {
    createUserSchool: async (
      _,
      { userSchool: { startYear, endYear, school: schoolData } },
      { user, transaction }
    ) => {
      const province = await Province.findOne({
        where: schoolData.province
      });
      const city = await City.findOne({
        where: schoolData.city
      });
      const district = await District.findOne({
        where: schoolData.district
      });
      const [school] = await School.findOrCreate({
        where: {
          name: schoolData.name,
          province_id: province.id,
          city_id: city.id,
          district_id: district.id
        },
        include: [ Province, City, District ],
        ...(transaction ? { transaction } : {})
      });
      const [[userSchool]] = await user.addSchool(school, {
        through: {
          startYear,
          endYear
        },
        ...(transaction ? { transaction } : {})
      });

      return userSchool;
    }
  }
};
