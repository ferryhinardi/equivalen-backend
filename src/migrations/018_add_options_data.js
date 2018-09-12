const options = [
  'A',
  'B',
  'C',
  'D',
  'E',
];

export default {
  up: queryInterface => queryInterface.bulkInsert('options', options.map(name => ({
    name,
    created_at: new Date(),
    updated_at: new Date(),
  }))),
  down: queryInterface => queryInterface.bulkDelete('options', null, {}),
};
