export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user_auth_provider', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          field: 'id'
        }
      },
      auth_provider_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'auth_providers',
          field: 'id'
        }
      },
      source_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payload: {
        type: Sequelize.TEXT('long')
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
  down: queryInterface => queryInterface.dropTable('user_auth_provider')
};
