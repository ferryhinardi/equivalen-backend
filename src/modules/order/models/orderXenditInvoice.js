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
  return OrderXenditInvoice;
};
