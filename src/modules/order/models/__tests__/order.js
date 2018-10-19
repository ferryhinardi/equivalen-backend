import ProductFactory from 'modules/catalog/models/factories/product';

import { sequelize, Order } from 'models';

describe('test model Order', () => {
  describe('test method createOrder', () => {
    beforeAll(() => sequelize.sync({ force: true }));
    beforeEach(done => {
      // Before each test we empty the database
      sequelize.truncate().then(() => {
        done();
      });
    });

    it('should success create order', async () => {
      const product1 = await ProductFactory({
        price: 100000
      });
      const product2 = await ProductFactory({
        price: 25000
      });
      const lines = [
        {
          product: product1,
          quantity: 1
        },
        {
          product: product2,
          quantity: 2
        }
      ];
      const order = await Order.createOrder({
        lines
      });
      expect(order.totalPrice).toEqual(150000);
      const orderLines = await order.getLines();
      expect(orderLines.length).toEqual(2);
    });
  });
});
