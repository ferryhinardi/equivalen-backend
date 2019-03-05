export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('user_answers', 'is_doubt', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: 'answer'
    }),
  down: queryInterface =>
    queryInterface.removeColumn('user_answers', 'is_doubt')
};
