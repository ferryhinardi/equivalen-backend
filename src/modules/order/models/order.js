import OrderHandler from '../handlers/order';

export default (sequelize, Sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phoneNumber: {
        field: 'phone_number',
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        defaultValue: 'PENDING',
        type: Sequelize.STRING
      },
      totalPrice: {
        field: 'total_price',
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      notes: {
        allowNull: true,
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
      tableName: 'orders',
      deletedAt: 'deleted_at',
      paranoid: true,
      hooks: {
        afterCreate: (order, options) => {
          return OrderHandler(order, { transaction: options.transaction });
        }
      }
    }
  );
  Order.associate = models => {
    Order.User = models.Order.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Order.XenditInvoice = models.Order.hasOne(models.OrderXenditInvoice, {
      foreignKey: 'order_id',
      as: 'invoice'
    });
    Order.Lines = models.Order.hasMany(models.OrderLine, {
      foreignKey: 'order_id',
      as: 'lines'
    });
    Order.PaymentEvent = models.Order.hasMany(models.PaymentEvent, {
      foreignKey: 'order_id',
      as: 'paymentEvents'
    });
  };
  Order.createOrder = ({ lines, user }) => {
    const { OrderLine } = require('models');
    return sequelize.transaction(async t => {
      let totalPrice = 0;
      lines.forEach(line => {
        const { product, quantity } = line;
        totalPrice += product.price * quantity;
      });
      const order = await Order.create(
        {
          totalPrice,
          user_id: user && user.id,
          email: user && user.email,
          phoneNumber: user && user.phoneNumber
        },
        { transaction: t }
      );
      await Promise.all(
        lines.map(line => {
          const { product, quantity } = line;
          return OrderLine.create(
            {
              product_id: product.id,
              order_id: order.id,
              productName: product.name,
              quantity,
              unitPrice: product.price,
              linePrice: product.price * quantity
            },
            { transaction: t }
          );
        })
      );
      return order;
    });
  };
  Order.prototype.isPaid = function isPaid() {
    const { PaymentEventType } = sequelize.models;
    return this.status === PaymentEventType.PAID || this.status === PaymentEventType.SETTLED;
  };
  Order.prototype.reindex = async function reindex(options) {
    return OrderHandler(this, options);
  };
  Order.prototype.updateStatus = async function updateStatus(options) {
    const { PaymentEvent } = sequelize.models;
    const latestPaymentEvent = await PaymentEvent.findOne({
      where: {
        order_id: this.id
      },
      order: [['createdAt', 'DESC']],
      ...options
    });
    const paymentEventType = await latestPaymentEvent.getType();
    if (this.status !== paymentEventType.name) {
      return this.update(
        {
          status: paymentEventType.name
        },
        options
      );
    }
  };
  return Order;
};
