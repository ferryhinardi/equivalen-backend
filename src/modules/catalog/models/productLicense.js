export default (sequelize, Sequelize) => {
  const ProductLicense = sequelize.define(
    'ProductLicense',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      timeInDay: {
        field: 'time_in_day',
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
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'product_licenses'
    }
  );
  ProductLicense.associate = models => {
    ProductLicense.Product = models.ProductLicense.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };
  return ProductLicense;
};
