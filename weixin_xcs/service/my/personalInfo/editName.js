import BASE from '../../../pages/my/utils/base.js';
import USER from '../../../udb/DB/user.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取昵称信息
  getName() {
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/name' });
  },

  // 保存昵称信息
  saveName(_that) {
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/name_do', data: { 'nickname': _that.data.name } })
  }
}