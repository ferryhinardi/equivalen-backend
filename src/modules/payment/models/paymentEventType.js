export default (sequelize, Sequelize) => {
  const PaymentEventType = sequelize.define(
    'PaymentEventType',
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
      tableName: 'payment_event_types',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  PaymentEventType.PENDING = 'PENDING';
  PaymentEventType.PAID = 'PAID';
  PaymentEventType.CANCELLED = 'CANCELLED';
  return PaymentEventType;
};
