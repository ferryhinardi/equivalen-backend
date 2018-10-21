import BaseHandler from 'modules/shared/handlers/BaseHandler';

const debug = require('debug')('app:handler:CheckLicenseOrderLine');

/**
 * 1. Order harus dalam status PAID
 * 2. Check per lines, cari yang productnya product license
 * 3. kalau iya
 *    a. Check di table licenses, order_line tersebut udah ada berapa
 *    b. kalau kurang x, buat x license baru.
 */
export default class CheckLicenseOrderLine extends BaseHandler {
  async run(order, options = {}) {
    if (!order.isPaid()) {
      return [];
    }
    debug(`order ${order.id} is paid.`);
    const lines = await order.getLines(options);
    return Promise.all(lines.map(line => line.checkGeneratedLicense(options)));
  }
}
