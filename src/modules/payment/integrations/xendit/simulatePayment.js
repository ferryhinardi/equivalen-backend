import request from './request';
import getInvoice from './getInvoice';

export default async function simulatePaymentUsingAlamart(order) {
  const invoice = await order.getInvoice();
  const {
    data: {
      available_retail_outlets: [{ payment_code }]
    }
  } = await getInvoice({ invoiceId: invoice.invoiceId });
  console.log(`simulate ${payment_code} ${order.totalPrice}`);
  /**
   * Old endpoint: payment_code/simulate_payment!
   */
  return request.post('/non_fixed_payment_code/simulate_payment', {
    retail_outlet_name: 'ALFAMART',
    payment_code,
    transfer_amount: order.totalPrice
  });
}
