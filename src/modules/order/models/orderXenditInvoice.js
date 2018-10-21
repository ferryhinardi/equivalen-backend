import createInvoice from 'modules/payment/integrations/xendit/createInvoice';
import getInvoice from 'modules/payment/integrations/xendit/getInvoice';

function serializeInvoice(invoice) {
  return {
    invoiceId: invoice.id,
    amount: invoice.amount,
    status: invoice.status,
    invoiceUrl: invoice.invoice_url,
    payerEmail: invoice.payer_email,
    description: invoice.description,
    expiryDate: invoice.expiry_date
  };
}

export default (sequelize, Sequelize) => {
  const OrderXenditInvoice = sequelize.define(
    'OrderXenditInvoice',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoiceId: {
        field: 'invoice_id',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      payerEmail: {
        field: 'payer_email',
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invoiceUrl: {
        field: 'invoice_url',
        type: Sequelize.STRING,
        allowNull: false
      },
      expiryDate: {
        field: 'expiry_date',
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'order_xendit_invoices'
    }
  );
  OrderXenditInvoice.associate = models => {
    OrderXenditInvoice.Order = models.OrderXenditInvoice.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
  };

  OrderXenditInvoice.checkOrder = async function checkOrder(order, options) {
    let invoice = await order.getInvoice(options);
    if (!invoice) {
      try {
        const { data } = await createInvoice(
          {
            amount: order.totalPrice,
            email: order.email
          },
          options
        );
        invoice = await OrderXenditInvoice.create(
          {
            ...serializeInvoice(data),
            order_id: order.id
          },
          options
        );
      } catch (e) {
        console.error(e);
      }
    }
    return invoice;
  };

  OrderXenditInvoice.prototype.reindex = async function reindex(options = {}) {
    const { PaymentEvent, PaymentEventType } = sequelize.models;
    const { data: latestInvoice } = await getInvoice({ invoiceId: this.invoiceId });
    const order = await this.getOrder(options);
    const orderHasLatestInvoiceStatus = await PaymentEvent.count({
      where: {
        order_id: order.id
      },
      include: {
        model: PaymentEventType,
        as: 'type',
        where: {
          name: latestInvoice.status
        }
      },
      ...options
    });
    if (!orderHasLatestInvoiceStatus) {
      await this.update(serializeInvoice(latestInvoice), options);
      const [latestPaymentEventType] = await PaymentEventType.findOrCreate({
        where: {
          name: latestInvoice.status
        },
        ...options
      });
      await PaymentEvent.findOrCreate({
        where: {
          order_id: order.id,
          payment_event_type_id: latestPaymentEventType.id,
          amount: latestInvoice.paid_amount
        },
        ...options
      });
    }
  };
  return OrderXenditInvoice;
};
