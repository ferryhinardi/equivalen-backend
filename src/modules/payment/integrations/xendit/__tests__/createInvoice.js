import createInvoice from '../createInvoice';

describe('test createInvoice', () => {
  it('should success createInvoice', async () => {
    const result = await createInvoice({
      amount: 10000,
      email: 'test@gmail.com'
    });
    expect(result.success).toBeTruthy();
  });
});
