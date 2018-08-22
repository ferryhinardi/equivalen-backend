const authProviderNames = [
  'Account Kit',
];

export default {
  up: async queryInterface => {
    await queryInterface.bulkDelete('auth_providers', null, {});
    await queryInterface.bulkInsert('auth_providers', authProviderNames.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date(),
    })))
  },
  down: queryInterface => queryInterface.bulkDelete('auth_providers', null, {}),
};
