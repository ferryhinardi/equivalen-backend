export default {
  up: queryInterface => {
    queryInterface.removeColumn('users', 'birth_date');
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'birth_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
