export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      curriculum_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'curriculums',
          field: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image_url: {
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
  down: queryInterface => queryInterface.dropTable('courses')
};
