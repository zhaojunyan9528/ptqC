import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 钱包信息
  walletData() {
     return this.getTData({ url: '/WeChatAppsCs/MemberWallet/index' });
  }
}