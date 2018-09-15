const questionTypes = ['OPTION'];

export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'question_types',
      questionTypes.map(name => ({
        name,
        created_at: new Date(),
        updated_at: new Date()
      }))
    ),
  down: queryInterface => queryInterface.bulkDelete('question_types', null, {})
};
