import createInvoice from '../createInvoice';
import getInvoice from '../getInvoice';

describe('test getInvoice', () => {
  it('should success getInvoice', async () => {
    const {
      data: { id: invoiceId }
    } = await createInvoice({ amount: 100000, email: 'test@gmail.com' });
    const result = await getInvoice({
      invoiceId
    });
    expect(result.success).toBeTruthy();
  });
});
