import InitPaymentEvent from './InitPaymentEventType';
import XenditInvoice from './XenditInvoice';
import CheckPaidPaymentEventType from './CheckPaidPaymentEventType';

const handlers = [InitPaymentEvent, XenditInvoice, CheckPaidPaymentEventType];

export default function checkOrder(order, options) {
  return handlers.reduce(async (p, Handler) => {
    return p.then(() => Promise.resolve(new Handler().run(order, options)));
  }, Promise.resolve());
}
