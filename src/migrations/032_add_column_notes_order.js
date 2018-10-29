export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('orders', 'notes', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'total_price'
    });
  },
  down: queryInterface => {
    queryInterface.removeColumn('orders', 'notes');
  }
};
