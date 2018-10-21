import request from './request';

const getUnixTime = () => (new Date().getTime() / 1000) | 0; // eslint-disable-line

/**
 *
 * @export
 * @param {*} { amount, email }
 * @returns
 */
export default function createInvoice({ amount, email, description }) {
  const externalId = getUnixTime().toString();
  const params = {
    external_id: externalId,
    amount,
    payer_email: email || 'system@admin.com',
    description: process.env.NODE_ENV === 'test' ? 'TEST' : description || 'Buyer by admin'
  };
  return request.post('/v2/invoices', params);
}
