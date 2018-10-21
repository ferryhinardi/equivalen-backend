export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'users',
          field: 'id'
        }
      },
      billing_address: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'addresses',
          field: 'id'
        }
      },
      shipping_address: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'addresses',
          field: 'id'
        }
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        defaultValue: 'PENDING',
        type: Sequelize.STRING
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL
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
  down: queryInterface => queryInterface.dropTable('orders')
};
