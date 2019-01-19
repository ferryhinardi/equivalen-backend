export default (sequelize, Sequelize) => {
  const Archive = sequelize.define(
    'Archive',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      minimumScore: {
        field: 'minimum_score',
        type: Sequelize.FLOAT
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
      tableName: 'archives',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );

  Archive.associate = models => {
    Archive.QuestionType = models.Archive.belongsTo(models.QuestionType, {
      foreignKey: 'question_type_id'
    });
    Archive.Curriculum = models.Archive.belongsTo(models.Curriculum, {
      foreignKey: 'curriculum_id'
    });
    Archive.Evaluation = models.Archive.belongsTo(models.Evaluation, {
      foreignKey: 'evaluation_id'
    });
    Archive.Package = models.Archive.hasMany(models.Package, {
      foreignKey: 'archive_id'
    });
    Archive.Assignment = models.Archive.hasOne(models.Assignment, {
      foreignKey: 'archive_id'
    });
    Archive.CreatedBy = models.Archive.belongsTo(models.User, {
      foreignKey: 'created_by'
    });

    Archive.User = models.Archive.belongsToMany(models.User, {
      through: models.UserArchive,
      foreignKey: 'archive_id'
    });
    Archive.UserArchive = models.Archive.hasMany(models.UserArchive, {
      foreignKey: 'archive_id'
    });
  };

  return Archive;
};
