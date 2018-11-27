export default (sequelize, Sequelize) => {
  const Chapter = sequelize.define(
    'Chapter',
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
      tableName: 'chapters',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Chapter.associate = models => {
    Chapter.Course = models.Chapter.belongsTo(models.Course, {
      foreignKey: 'course_id'
    });
    Chapter.Question = models.Chapter.belongsToMany(models.Question, {
      through: models.QuestionInfo,
      foreignKey: 'chapter_id'
    });
    Chapter.QuestionInfo = models.Chapter.hasMany(models.QuestionInfo, {
      foreignKey: 'chapter_id'
    });
  };
  return Chapter;
};
