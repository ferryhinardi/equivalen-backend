import BaseHandler from 'modules/shared/handlers/BaseHandler';
import getInvoice from 'modules/payment/integrations/xendit/getInvoice';

/**
 * 1. Hit Xendit API, get invoice.
 * 2. Kalau status payment typenya bukan order.status
 *    a. Insert payment event baru
 *    b. Update order.status
 */
export default class CheckPaidPaymentEventType extends BaseHandler {
  async run(order, options = {}) {
    const invoice = await order.getInvoice(options);
    await invoice.reindex(options);
    return invoice;
  }
}
