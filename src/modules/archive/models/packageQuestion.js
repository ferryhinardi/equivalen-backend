export default (sequelize, Sequelize) => {
  const PackageQuestion = sequelize.define(
    'PackageQuestion',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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
      tableName: 'package_questions',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  PackageQuestion.associate = models => {
    PackageQuestion.Package = models.PackageQuestion.belongsTo(models.Package, {
      foreignKey: 'package_id'
    });
    PackageQuestion.Question = models.PackageQuestion.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
  };
  return PackageQuestion;
};
