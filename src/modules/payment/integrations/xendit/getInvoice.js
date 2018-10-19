import request from './request';

export default function getInvoice({ invoiceId }) {
  return request.get(`/v2/invoices/${invoiceId}`);
}
