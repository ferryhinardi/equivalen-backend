export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('archives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_type_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'question_types',
          field: 'id'
        }
      },
      evaluation_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'evaluations',
          field: 'id'
        }
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
      minimum_score: {
        allowNull: false,
        type: Sequelize.FLOAT
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
  down: queryInterface => queryInterface.dropTable('archives')
};
