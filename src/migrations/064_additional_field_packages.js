export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('archives', 'tryout_type_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'evaluation_id'
    }).then(() => {
      queryInterface.addColumn('archives', 'active', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        after: 'course_id'
      })
    }),
  down: queryInterface =>
    queryInterface.removeColumn('archives', 'tryout_type_id')
      .then(() => queryInterface.removeColumn('archives', 'active'))
};
