export default (sequelize, Sequelize) => {
  const PackageRandom = sequelize.define(
    'PackageRandom',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderNo: {
        field: 'order_no',
        type: Sequelize.INTEGER,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'user_random_packages'
    }
  );
  PackageRandom.associate = models => {
    PackageRandom.UserArchive = models.PackageRandom.belongsTo(models.UserArchive, {
      foreignKey: 'user_archive_id'
    });
    PackageRandom.Package = models.PackageRandom.belongsTo(models.Package, {
      foreignKey: 'package_id'
    });
    PackageRandom.Question = models.PackageRandom.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
    PackageRandom.UserAnswer = models.PackageRandom.belongsTo(models.UserAnswer, {
      foreignKey: 'user_answer_id'
    });
  };
  return PackageRandom;
};
