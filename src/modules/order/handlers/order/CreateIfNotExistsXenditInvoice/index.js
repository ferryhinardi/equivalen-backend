import BaseHandler from 'modules/shared/handlers/BaseHandler';

/**
 *  1. Check order udah punya order_xendit_invoices belom,
 *  2. kalau belom:
 *     a. Hit API Xendit, create invoice berdasarkan data order
 *     b. Simpen data invoice dari xendit ke data table kita.
 */
export default class CreateIfNotExistsXenditInvoice extends BaseHandler {
  async run(order, options = {}) {
    const { OrderXenditInvoice } = require('models');
    return OrderXenditInvoice.checkOrder(order, options);
  }
}
