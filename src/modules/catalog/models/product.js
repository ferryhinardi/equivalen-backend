export default (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      visible: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
      tableName: 'products'
    }
  );
  Product.associate = models => {
    Product.ProductLicense = models.Product.hasOne(models.ProductLicense, {
      foreignKey: 'product_id',
      as: 'license'
    });
  };
  return Product;
};
