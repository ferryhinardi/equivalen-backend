export default (sequelize, Sequelize) => {
  const UserArchive = sequelize.define(
    'UserArchive',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startTime: {
        field: 'start_time',
        allowNull: true,
        type: Sequelize.DATE
      },
      endTime: {
        field: 'end_time',
        allowNull: true,
        type: Sequelize.DATE
      },
      opened: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      score: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      totalCorrect: {
        field: 'total_correct',
        allowNull: true,
        type: Sequelize.INTEGER
      },
      totalIncorrect: {
        field: 'total_incorrect',
        allowNull: true,
        type: Sequelize.INTEGER
      },
      totalDoubt: {
        field: 'total_doubt',
        allowNull: true,
        type: Sequelize.INTEGER
      },
      totalUnanswer: {
        field: 'total_unanswer',
        allowNull: true,
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: true,
        type: Sequelize.INTEGER
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
      tableName: 'user_archives'
    }
  );
  UserArchive.associate = models => {
    UserArchive.User = models.UserArchive.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'student'
    });
    UserArchive.Owner = models.UserArchive.belongsTo(models.User, {
      foreignKey: 'owner_id',
      as: 'teacher'
    });
    UserArchive.Archive = models.UserArchive.belongsTo(models.Archive, {
      foreignKey: 'archive_id'
    });
    UserArchive.PackageRandom = models.UserArchive.hasMany(models.PackageRandom, {
      foreignKey: 'user_archive_id'
    });
  };
  return UserArchive;
};
