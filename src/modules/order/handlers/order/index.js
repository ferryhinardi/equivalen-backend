import InitPaymentEventTypePending from './InitPaymentEventTypePending';
import CreateIfNotExistsXenditInvoice from './CreateIfNotExistsXenditInvoice';
import CheckPaidPaymentEventType from './CheckPaidPaymentEventType';
import CheckLicenseOrderLine from './CheckLicenseOrderLine';
import CheckOrderStatus from './CheckOrderStatus';

const handlers = [
  InitPaymentEventTypePending,
  CreateIfNotExistsXenditInvoice,
  CheckPaidPaymentEventType,
  CheckLicenseOrderLine,
  CheckOrderStatus
];

export default function checkOrder(order, options) {
  return handlers.reduce(async (p, Handler) => {
    console.log('handlers', p);
    return p.then(() => Promise.resolve(new Handler().run(order, options)));
  }, Promise.resolve());
}
