export default {
  up: (queryInterface, Sequelize) =>
    /*
     * A payment event for an order -> PaymentEventQuantity
     * For example:
     * All lines have been paid for
     * 2 lines have been refunded
     */
    queryInterface.createTable('payment_events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'orders',
          field: 'id'
        }
      },
      payment_event_type_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: false,
        references: {
          model: 'payment_event_types',
          field: 'id'
        }
      },
      reference: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
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
  down: queryInterface => queryInterface.dropTable('payment_events')
};
