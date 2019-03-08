import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取验证码
  getIdenCode(type, telephone) {
     return this.getTData({ url: '/WeChatAppsCs/StoreRegister/send_code', data: { type: type, telephone: telephone } });
  },
  // 提交申请信息
  applyStore(formData) {
     return this.getTData({ url: '/WeChatAppsCs/StoreRegister/store_application', data: formData });
  }
}