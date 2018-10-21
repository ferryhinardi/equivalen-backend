export default {
  up: (queryInterface, Sequelize) =>
    /*
     * User licenses
     */
    queryInterface.createTable('licenses', {
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
      order_line_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'order_lines',
          field: 'id'
        }
      },
      license_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
  down: queryInterface => queryInterface.dropTable('licenses')
};
