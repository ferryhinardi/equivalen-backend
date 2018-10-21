import { sequelize, OrderLine } from 'models';

import ProductFactory from 'modules/catalog/models/factories/product';
import ProductLicenseFactory from 'modules/catalog/models/factories/productLicense';
import OrderFactory from '../factories/order';

describe('test OrderLine', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  it('should generate 3 licenses using checkGeneratedLicense', async () => {
    const product = await ProductFactory();
    await ProductLicenseFactory({
      product_id: product.id
    });
    const order = await OrderFactory({
      lines: [
        {
          product,
          quantity: 3
        }
      ]
    });
    const [line] = await order.getLines();
    await line.checkGeneratedLicense();
    const totalLicenses = await line.countLicenses();
    expect(totalLicenses).toEqual(3);
  });
});
