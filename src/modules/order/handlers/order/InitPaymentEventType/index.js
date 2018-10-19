import BaseHandler from 'modules/shared/handlers/BaseHandler';

export default class InitPaymentEventType extends BaseHandler {
  async run(order, options = {}) {
    const { PaymentEvent, PaymentEventType } = require('models');
    const [pendingPaymentEventType] = await PaymentEventType.findOrCreate({
      where: {
        name: PaymentEventType.PENDING
      },
      ...options
    });
    const [paymentEvent] = await PaymentEvent.findOrCreate({
      where: {
        order_id: order.id,
        payment_event_type_id: pendingPaymentEventType.id,
        amount: order.totalPrice
      },
      ...options
    });
    return paymentEvent;
  }
}
