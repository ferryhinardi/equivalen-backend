export default {
  /*
   * User devices with registered license.
   */
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('order_xendit_invoices', {
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
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      invoice_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      payer_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invoice_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiry_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('order_xendit_invoices')
};
