const BASE = require('../../../pages/my/utils/base.js');
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取足迹列表
  footPrintList(data) {
    return BASE.PRO._loadListPaging({ url: '/WeChatAppsCs/MemberMy/myfootprint_list', data: { paging: ++data.pageNum } })
  },
  // 清空足迹
  footprintClear(data) {
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/cancel_myfootprint' })
  }
}