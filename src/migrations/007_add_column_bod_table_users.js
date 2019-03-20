export default {
  up: (queryInterface, Sequelize) =>
    Promise.resolve(() => {
      queryInterface.addColumn('users', 'place_bod', {
        type: Sequelize.STRING,
        allowNull: true
      });
      queryInterface.addColumn('users', 'date_bod', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }),
  down: queryInterface =>
    Promise.resolve(() => {
      queryInterface.removeColumn('users', 'place_bod');
      queryInterface.removeColumn('users', 'date_bod');
    })
};
