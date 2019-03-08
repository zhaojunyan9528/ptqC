import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 用户信息
  getShareInfo(data) {
     return this.getTData({ url: '/WeChatAppsCs/MemberShare/share', data: { order_id: data.orderId, is_share: data.isShare } });
  }
}