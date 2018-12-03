import { sequelize } from 'models';
import ProductFactory from 'modules/catalog/models/factories/product';
// import simulatePayment from 'modules/payment/integrations/xendit/simulatePayment';
import OrderFactory from '../factories/order';

describe('test orderXenditInvoice', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  it('should create xenditInvoice', async () => {
    const product = await ProductFactory({
      price: 100000
    });
    const order = await OrderFactory({
      lines: [
        {
          product,
          quantity: 3
        }
      ]
    });
    const invoice = await order.getInvoice();
    expect(invoice).toBeTruthy();
    expect(invoice.status).toEqual('PENDING');
    expect(invoice.amount).toEqual(300000);
  });
  /**
   * Error in Circle CI
   */
  /*
  it('should update xenditInvoice status', async () => {
    const order = await OrderFactory();
    expect(order.isPaid()).toEqual(false);
    await simulatePayment(order);
    await order.reindex();
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    await order.reload();
    expect(order.isPaid()).toEqual(true);
  });
  */
});
