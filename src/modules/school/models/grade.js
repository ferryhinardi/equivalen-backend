export default (sequelize, Sequelize) => {
  const Grade = sequelize.define(
    'Grade',
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
      tableName: 'grades',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Grade.associate = models => {
    Grade.Classes = models.Grade.hasMany(models.Classes, {
      foreignKey: 'grade_id'
    });
  };
  return Grade;
};
