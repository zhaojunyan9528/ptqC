import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 待分享列表
  inSharingList(data) {
    return BASE.PRO._loadListPaging({ url: '/WeChatAppsCs/MemberMy/group_share_list', data: { paging: ++data.pageNum} })
  }
}