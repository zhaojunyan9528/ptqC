const BASE = require('../../../pages/my/utils/base.js');
import A from '../../../vwx/uset.js'

module.exports = {
  // 加载订单列表
  orderList(_that) {
    const _d = _that.data;
    return BASE.PRO._loadListPaging({ url: '/WeChatAppsCs/MemberOrder/orderAll', data: { status: _d.type, paging: ++_d.pageNum } })
  },
  // 核销订单
  orderPickUp(_that){
     return this.getTData({ url: '/WeChatAppsCs/MemberOrder/cancel_after', data: { order_id: _that.data.curOrder}});
  },
  // 确认收货
  orderReceive(_that) {
     return this.getTData({ url: '/WeChatAppsCs/MemberOrder/confirm', data: { order_id: _that.data.curOrder } });
  },
  // 删除订单
  orderDelete(_that){
     return this.getTData({ url: '/WeChatAppsCs/MemberOrder/del_order', data: { order_id: _that.data.curOrder } });
  }
}