export default (sequelize, Sequelize) => {
  const Package = sequelize.define(
    'Package',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
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
      tableName: 'packages',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );

  Package.associate = models => {
    Package.Archive = models.Package.belongsTo(models.Archive, {
      foreignKey: 'archive_id'
    });
    Package.Question = models.Package.belongsToMany(models.Question, {
      through: models.PackageQuestion,
      foreignKey: 'package_id'
    });
    Package.PackageQuestion = models.Package.hasMany(models.PackageQuestion, {
      foreignKey: 'package_id'
    });
  };

  return Package;
};
