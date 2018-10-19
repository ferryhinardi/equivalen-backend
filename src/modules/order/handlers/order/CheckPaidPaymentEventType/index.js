import BaseHandler from 'modules/shared/handlers/BaseHandler';
import getInvoice from 'modules/payment/integrations/xendit/getInvoice';

export default class InitPaymentEventType extends BaseHandler {
  async run(order, options = {}) {
    const { PaymentEvent, PaymentEventType } = require('models');
    const invoice = await order.getInvoice(options);
    const { data: latestInvoice } = await getInvoice({ invoiceId: invoice.invoiceId });
    let paymentEvent = null;
    if (latestInvoice.status !== PaymentEventType.PENDING) {
      const [latestPaymentEventType] = await PaymentEventType.findOrCreate({
        where: {
          name: latestInvoice.status
        },
        ...options
      });
      paymentEvent = await PaymentEvent.findOrCreate({
        where: {
          order_id: order.id,
          payment_event_type_id: latestPaymentEventType.id,
          amount: latestInvoice.paid_amount
        },
        ...options
      });
    }
    return paymentEvent;
  }
}
