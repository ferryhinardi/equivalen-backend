import BaseHandler from 'modules/shared/handlers/BaseHandler';

export default class CheckOrderStatus extends BaseHandler {
  async run(order, options = {}) {
    return order.updateStatus(options);
  }
}
