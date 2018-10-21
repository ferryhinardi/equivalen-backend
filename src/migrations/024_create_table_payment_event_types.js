export default {
  up: (queryInterface, Sequelize) =>
    /*
     * Payment event types are things like 'Paid', 'Failed', 'Refunded'.
     *
     * These are effectively the transaction types.
     */
    queryInterface.createTable('payment_event_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('payment_event_types')
};
