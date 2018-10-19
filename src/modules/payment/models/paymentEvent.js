export default (sequelize, Sequelize) => {
  const PaymentEvent = sequelize.define(
    'PaymentEvent',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      reference: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
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
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'payment_events',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  PaymentEvent.associate = models => {
    PaymentEvent.Order = models.PaymentEvent.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
    PaymentEvent.Type = models.PaymentEvent.belongsTo(models.PaymentEventType, {
      foreignKey: 'payment_event_type_id',
      as: 'type'
    });
  };
  return PaymentEvent;
};
