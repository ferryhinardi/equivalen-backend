import { OrderXenditInvoice } from 'models';

const debug = require('debug')('app:webhook:xendit');

export default async function reindexXenditInvoice(req, res) {
  const invoiceId = req.body.id;
  debug(`Incoming webhook: invoice-id: ${invoiceId}`);
  const orderXenditInvoice = await OrderXenditInvoice.findOne({
    where: {
      invoiceId
    }
  });
  debug(`Incoming webhook: orderXenditInvoice - debug: ${JSON.stringify(orderXenditInvoice)}`);
  const order = await orderXenditInvoice.getOrder();
  await order.reindex();
  await order.reload();
  return res.json({
    status: 'success',
    data: {
      order
    }
  });
}
