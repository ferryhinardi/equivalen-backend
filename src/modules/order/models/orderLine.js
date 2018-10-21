const debug = require('debug')('app');

export default (sequelize, Sequelize) => {
  const OrderLine = sequelize.define(
    'OrderLine',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productName: {
        field: 'product_name',
        type: Sequelize.STRING,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unitPrice: {
        field: 'unit_price',
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      linePrice: {
        field: 'line_price',
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        allowNull: false,
        defaultValue: 'PENDING',
        type: Sequelize.STRING
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
      tableName: 'order_lines',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  OrderLine.associate = models => {
    OrderLine.Order = models.OrderLine.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
    OrderLine.Product = models.OrderLine.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
    OrderLine.License = models.OrderLine.hasMany(models.License, {
      foreignKey: 'order_line_id',
      as: 'licenses'
    });
  };

  OrderLine.prototype.checkGeneratedLicense = async function checkGeneratedLicense(options) {
    const product = await this.getProduct();
    const isProductLicense = await product.getLicense(options);
    debug(`orderLine ${this.id} is license: ${Boolean(isProductLicense)}.`);
    if (isProductLicense) {
      const totalGeneratedLicenses = (await this.countLicenses(options)) || [];
      debug(`total generated license: ${totalGeneratedLicenses}`);
      if (totalGeneratedLicenses < this.quantity) {
        const totalMissedLicense = this.quantity - totalGeneratedLicenses;
        debug(`generate ${totalMissedLicense} license!`);
        return Promise.all(
          Array(totalMissedLicense)
            .fill(0)
            .map(() => {
              const { License } = sequelize.models;
              return License.createLicense(
                {
                  order_line_id: this.id
                },
                options
              );
            })
        );
      }
    }
    return Promise.resolve();
  };
  return OrderLine;
};
