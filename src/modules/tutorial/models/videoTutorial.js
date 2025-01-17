export default (sequelize, Sequelize) => {
  const VideoTutorial = sequelize.define(
    'VideoTutorial',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
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
      tableName: 'video_tutorials',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  VideoTutorial.associate = models => {
    VideoTutorial.Question = models.VideoTutorial.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
    VideoTutorial.User = models.VideoTutorial.belongsToMany(models.User, {
      through: models.VideoRecommended,
      foreignKey: 'video_tutorial_id'
    });
    VideoTutorial.VideoRecommended = models.VideoTutorial.hasMany(models.VideoRecommended, {
      foreignKey: 'video_tutorial_id'
    });
  };
  return VideoTutorial;
};
