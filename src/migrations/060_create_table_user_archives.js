export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user_archives', {
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
      owner_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'users',
          field: 'id'
        }
      },
      archive_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'archives',
          field: 'id'
        }
      },
      start_time: Sequelize.DATE,
      end_time: Sequelize.DATE,
      opened: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      score: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      total_correct: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      total_incorrect: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      total_doubt: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      total_unanswer: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: true,
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('user_archives')
};
