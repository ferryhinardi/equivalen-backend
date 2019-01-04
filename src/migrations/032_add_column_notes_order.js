export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('orders', 'notes', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'total_price'
    }).then(() => {
      queryInterface.addColumn('orders', 'created_by', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'notes'
      });
    });
  },
  down: queryInterface => {
    queryInterface.removeColumn('orders', 'notes')
      .then(() => queryInterface.removeColumn('orders', 'created_by'));
  }
};
