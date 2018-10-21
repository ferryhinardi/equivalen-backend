import { Order } from 'models';
import ProductFactory from 'modules/catalog/models/factories/product';

export default async function OrderFactory(orderData = {}, totalLines = 1) {
  const product = await ProductFactory();
  const lines = Array(totalLines)
    .fill(0)
    .map(() => ({ product, quantity: 1 }));
  return Order.createOrder({
    lines,
    ...orderData
  });
}
