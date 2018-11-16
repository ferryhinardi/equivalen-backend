export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('user_student', 'grade', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'nisn_number'
    });
  },
  down: queryInterface => {
    queryInterface.removeColumn('user_student', 'grade');
  }
};
