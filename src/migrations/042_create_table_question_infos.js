export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('question_infos', {
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
      course_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'courses',
          field: 'id'
        }
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'chapters',
          field: 'id'
        }
      },
      question_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'questions',
          field: 'id'
        }
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
  down: queryInterface => queryInterface.dropTable('question_infos')
};
