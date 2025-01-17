export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      province: {
        allowNull: true,
        type: Sequelize.STRING
      },
      district: {
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
  down: queryInterface => queryInterface.dropTable('addresses')
};
