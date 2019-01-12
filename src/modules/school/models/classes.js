export default (sequelize, Sequelize) => {
  const Classes = sequelize.define(
    'Classes',
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
      tableName: 'classes',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  Classes.associate = models => {
    Classes.Grade = models.Classes.belongsTo(models.Grade, {
      foreignKey: 'grade_id'
    });
    Classes.UserRelationship = models.Classes.hasOne(models.UserRelationship, {
      foreignKey: 'target_id'
    });

    Classes.User = models.Classes.belongsToMany(models.User, {
      through: models.UserClass,
      foreignKey: 'class_id'
    });
    Classes.UserClass = models.Classes.hasMany(models.UserClass, {
      foreignKey: 'class_id'
    });
  };
  return Classes;
};
