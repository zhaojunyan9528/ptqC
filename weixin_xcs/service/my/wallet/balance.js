import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 余额明细列表
  balanceList(_that) {
    return BASE.PRO._loadListPaging({ url: '/WeChatAppsCs/MemberWallet/moneyWater', data: { paging: ++_that.data.pageNum } });
  },
  // 余额明细详情
  balanceDetail(_that) {
     return this.getTData({ url: '/WeChatAppsCs/MemberWallet/moneyWaterinfo', data: { moneywaterid: _that.data.id} });
  }
}