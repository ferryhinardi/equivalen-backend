export default (sequelize, Sequelize) => {
  const Evaluation = sequelize.define(
    'Evaluation',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: Sequelize.STRING,
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
      tableName: 'evaluations',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );

  Evaluation.associate = models => {
    Evaluation.Archive = models.Evaluation.hasMany(models.Archive, {
      foreignKey: 'evaluation_id'
    });
  };

  return Evaluation;
};
