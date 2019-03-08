import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 提现信息
  getWithDepInfo(data) {
     return this.getTData({ url: '/WeChatAppsCs/Wallet/deposit', data: { identity: data.role, alipay_id: 0 } });
  },
  // 提现
  submitWithDep(data){
     return this.getTData({
      url: '/WeChatAppsCs/Wallet/withdraw_do', data: { identity: 1, money: data.sum, pay_way: data.curWithDepWay == 0 ? 2 : 1, alipay_id: 0 } });
  }
}