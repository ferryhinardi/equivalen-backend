export default (sequelize, Sequelize) => {
  const Curriculum = sequelize.define(
    'Curriculum',
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
      tableName: 'curriculums',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Curriculum.associate = models => {
    Curriculum.Course = models.Curriculum.hasMany(models.Course, {
      foreignKey: 'curriculum_id'
    });
  };
  return Curriculum;
};