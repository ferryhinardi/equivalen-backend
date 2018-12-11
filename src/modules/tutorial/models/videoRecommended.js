export default (sequelize, Sequelize) => {
  const VideoRecommended = sequelize.define(
    'VideoRecommended',
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
      tableName: 'video_recommendeds',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  VideoRecommended.associate = models => {
    VideoRecommended.User = models.VideoRecommended.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    VideoRecommended.VideoTutorial = models.VideoRecommended.belongsTo(models.VideoTutorial, {
      foreignKey: 'video_tutorial_id'
    });
  };
  return VideoRecommended;
};
