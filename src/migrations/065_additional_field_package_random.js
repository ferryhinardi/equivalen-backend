export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('user_random_packages', 'user_answer_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'question_id'
    }),
  down: queryInterface =>
    queryInterface.removeColumn('user_random_packages', 'user_answer_id')
};
