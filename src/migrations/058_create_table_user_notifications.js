export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user_notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'users',
          field: 'id'
        }
      },
      notification_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'notifications',
          field: 'id'
        }
      },
      total: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('user_notifications')
};
