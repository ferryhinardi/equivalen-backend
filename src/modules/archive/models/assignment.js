export default (sequelize, Sequelize) => {
  const Assignment = sequelize.define(
    'Assignment',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      deadline: Sequelize.DATE,
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'assignments',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );

  Assignment.associate = models => {
    Assignment.Archive = models.Assignment.belongsTo(models.Archive, {
      foreignKey: 'archive_id'
    });
  };

  return Assignment;
};
