const roleNames = [
  'Male',
  'Female',
];

export default {
  up: async queryInterface => {
    await queryInterface.bulkDelete('genders', null, {});
    await queryInterface.bulkInsert('genders', roleNames.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date(),
    })))
  },
  down: queryInterface => queryInterface.bulkDelete('genders', null, {}),
};
