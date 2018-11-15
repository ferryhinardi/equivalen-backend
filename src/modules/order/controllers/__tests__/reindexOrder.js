import { get } from 'modules/shared/libs/jest/requestServer';
import ProductFactory from 'modules/catalog/models/factories/product';
import OrderFactory from 'modules/order/models/factories/order';

import { sequelize } from 'models';

describe('test reindexOrder', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  it('should show order', async () => {
    const product = await ProductFactory({
      price: 100000
    });
    const order = await OrderFactory({
      lines: [
        {
          product,
          quantity: 1
        }
      ]
    });
    const {
      body: { status, data: { order: { totalPrice } } },
    } = await get(`/api/v1/orders/${order.id}/reindex`);
    expect(status).toEqual('success');
    expect(totalPrice).toEqual(100000);
  });
});
