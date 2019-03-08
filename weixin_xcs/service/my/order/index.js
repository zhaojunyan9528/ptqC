const BASE = require('../../../pages/my/utils/base.js');
import A from '../../../vwx/uset.js'

module.exports = {
  // 加载最近订单列表
  loadOrderIndex(){
    return BASE.PRO._loadList({ url: '/WeChatAppsCs/MemberOrder/index' });
  }
}