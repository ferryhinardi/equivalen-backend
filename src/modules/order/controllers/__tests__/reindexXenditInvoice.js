import { post } from 'modules/shared/libs/jest/requestServer';
import ProductFactory from 'modules/catalog/models/factories/product';
import OrderFactory from 'modules/order/models/factories/order';

import { sequelize } from 'models';

describe('test reindexXendit', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  it('should update xenditInvoice status', async () => {
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
      body: { status },
    } = await post(
      '/api/v1/orderXenditInvoices/reindex',
      { id: order.id },
      { 'Accept': 'application/json' }
    );
    expect(status).toEqual('success');
  });
});
