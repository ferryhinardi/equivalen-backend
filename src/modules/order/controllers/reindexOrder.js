import { Order } from 'models';

export default async function reindexOrder(req, res) {
  const orderId = req.params.id;
  const order = await Order.findOne({
    where: {
      id: orderId
    }
  });
  await order.reindex();
  await order.reload();
  return res.json({
    status: 'success',
    data: {
      order
    }
  });
}
