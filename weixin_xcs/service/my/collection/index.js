const BASE = require('../../../pages/my/utils/base.js');
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取收藏里欸包
  loadColList(_that){
    return BASE.PRO._loadListPaging({ url: '/WeChatAppsCs/MemberMy/collection', data: { paging: ++_that.data.pageNum } })
  },
  // 删除收藏信息
  delCol(_that){
    let delIds = '', list = _that.data.list;
    for (let i in list) {
      if (list[i].noSelected != undefined && list[i].noSelected) {
        delIds += list[i].goods_id + ',';
      }
    }
    delIds = delIds.slice(0, delIds.length - 1);
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/cancel_collection', data: { goods_ids: delIds } })
  }
}