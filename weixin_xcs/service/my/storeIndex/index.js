import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'
module.exports = {
  // 改版首页用户是否关注公众号
  userAttation() {
    return this.getTData({
      url: '/WeChatAppsCs/Member/attation'
    })
  },
  // 改版首页店铺基本信息
  storeInfo(store_id) {
    return this.getTData({
      url: '/WeChatAppsCs/Member/index',
      data: { store_id }
    })
  },
  //商盟全部活动类型列表(友情推荐)
  leagueAllList(store_id){
    return this.getTData({
      url:'/WeChatAppsCs/MemberPoint/leagueAll_list',
      data:{store_id}
    })
  },
  //门店活动列表
  activitityList(store_id,type,paging){
    return this.getTData({
      url:'/WeChatAppsCs/MemberPoint/activity_list',
      data: { store_id, type, paging}
    })
  }
 

}