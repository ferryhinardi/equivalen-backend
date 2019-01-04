export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('orders', 'created_by', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'notes'
    });
  },
  down: queryInterface => {
    queryInterface.removeColumn('orders', 'created_by');
  }
};
