export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('send_grid_mails', {
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
      from: {
        allowNull: false,
        type: Sequelize.STRING,
        default: 'do-not-reply@pt-gps.com'
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING
      },
      template_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      dynamic_template_data: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      content: {
        allowNull: true,
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
  down: queryInterface => queryInterface.dropTable('send_grid_mails')
};
