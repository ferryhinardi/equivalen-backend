import BaseHandler from 'modules/shared/handlers/BaseHandler';
import createInvoice from 'modules/payment/integrations/xendit/createInvoice';

export default class XenditInvoice extends BaseHandler {
  async run(order, options = {}) {
    const { OrderXenditInvoice } = require('models');
    let invoice = await order.getInvoice(options);
    if (!invoice) {
      try {
        const {
          data: {
            id: invoiceId,
            invoice_url: invoiceUrl,
            payer_email: payerEmail,
            description,
            expiry_date: expiryDate
          }
        } = await createInvoice(
          {
            amount: order.totalPrice,
            email: order.email
          },
          options
        );
        invoice = await OrderXenditInvoice.create(
          {
            order_id: order.id,
            invoiceId,
            invoiceUrl,
            payerEmail,
            description,
            expiryDate
          },
          options
        );
      } catch (e) {
        console.error(e);
      }
    }
    return invoice;
  }
}
