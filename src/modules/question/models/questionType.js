export default (sequelize, Sequelize) => {
  const QuestionType = sequelize.define(
    'QuestionType',
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
      tableName: 'question_types',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  QuestionType.OPTION = 'OPTION';
  return QuestionType;
};
