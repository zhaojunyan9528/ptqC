const BASE = require('../../../pages/my/utils/base.js');
import A from '../../../vwx/uset.js'

module.exports = {
  logisticsDetail(_that) {
    return BASE.PRO._loadList({ url: '/WeChatAppsCs/MemberOrder/wuliu', data: { order_id: _that.data.orderId } });
  }
}