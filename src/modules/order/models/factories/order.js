import { Order } from 'models';
import ProductFactory from 'modules/catalog/models/factories/product';

export default async function OrderFactory(orderData = {}) {
  const product = await ProductFactory();
  const lines = [{ product, quantity: 1 }];
  return Order.createOrder({
    lines,
    ...orderData
  });
}
