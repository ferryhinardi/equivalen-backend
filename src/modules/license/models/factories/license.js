import ProductFactory from 'modules/catalog/models/factories/product';
import ProductLicenseFactory from 'modules/catalog/models/factories/productLicense';
import OrderFactory from 'modules/order/models/factories/order';
import { License } from 'models';

export async function LicenseFactory() {
  const product = await ProductFactory();
  await ProductLicenseFactory({
    product_id: product.id
  });
  const order = await OrderFactory({
    lines: [
      {
        product,
        quantity: 1
      }
    ]
  });
  const [line] = await order.getLines();
  const data = {
    active: false,
    orderLineId: line.id,
  };
  const license = await License.createLicense(data);

  return license;
}

export default LicenseFactory;
