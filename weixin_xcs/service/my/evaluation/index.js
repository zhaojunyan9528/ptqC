import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  // 评价列表
  evalList(_that) {
    return BASE.PRO._loadListPaging({
      url: '/WeChatAppsCs/MemberMy/myAppraise_list',
      data: {
        paging: ++_that.data.pageNum
      }
    });
  },
  // 删除评价
  evalDelete(_that) {
    return this.getTData({
      url: '/WeChatAppsCs/MemberMy/del_myAppraise',
      data: {
        evaluate_id: _that.data.delEvalId
      }
    });
  }
}