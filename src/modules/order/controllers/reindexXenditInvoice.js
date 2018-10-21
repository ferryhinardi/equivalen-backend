import { OrderXenditInvoice } from 'models';

export default async function reindexXenditInvoice(req, res) {
  const invoiceId = req.body.id;
  const orderXenditInvoice = await OrderXenditInvoice.findOne({
    invoiceId
  });
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
