const BASE = require('../../../pages/my/utils/base.js');
import A from '../../../vwx/uset.js'

module.exports = {
  // 订单详情
  orderDetail(_that) {
     return this.getTData({ url: '/WeChatAppsCs/MemberOrder/orderDetail', data: { order_id: _that.data.orderId } });
  }
}