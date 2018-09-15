export default (sequelize, Sequelize) => {
  const Option = sequelize.define(
    'Option',
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
      tableName: 'options',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Option.associate = models => {
    Option.Question = models.Option.belongsToMany(models.Question, {
      through: models.QuestionOption,
      foreignKey: 'option_id'
    });
    Option.QuestionOption = models.Option.hasMany(models.QuestionOption, {
      foreignKey: 'option_id'
    });
  };
  return Option;
};
