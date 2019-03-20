export default (sequelize, Sequelize) => {
  const TryoutType = sequelize.define(
    'TryoutType',
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
      tableName: 'tryout_type',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );

  TryoutType.associate = models => {
    TryoutType.Archive = models.TryoutType.hasMany(models.Archive, {
      foreignKey: 'tryout_type_id'
    });
  };

  return TryoutType;
};
