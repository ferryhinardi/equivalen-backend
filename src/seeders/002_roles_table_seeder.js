const roleNames = [
  'Guru',
  'Murid',
  'Orang Tua',
];

export default {
  up: async queryInterface => {
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkInsert('roles', roleNames.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date(),
    })))
  },
  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
