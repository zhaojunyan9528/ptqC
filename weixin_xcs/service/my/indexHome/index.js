import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'
module.exports = {
//用户首页信息
memberInfo(){
  // return this.getTData({
  //   url:'/WeChatAppsCs/memberIndex/member_info'
  // })
 

    return new Promise((resolve, reject) => {
      this.getTData({
        url: '/WeChatAppsCs/memberIndex/member_info'
     
      }).then(res => {
        if (res.status == A.STATE.STATUS.OK) {
          resolve(res);
    
          A.DB.user.uid = res.memberMsg.sort_num
        } else {
          resolve(res)
        }
      }, rej => {
        reject(rej)
      })
    })
  
},
// 改版首页店铺基本信息
storeInfo(store_id){
  return this.getTData({
    url:'/WeChatAppsCs/Member/index',
    data:{store_id}
  })
},
// 改版首页近期推荐
recentRecommend(pageNum){
  return this.getTData({
    url:'/WeChatAppsCs/Member/recommend',
    data:{pageNum}
  })
},
// 改版首页刚刚浏览店铺
recentScanStore(){
  return this.getTData({
    url:'/WeChatAppsCs/Member/store'
  })
},
//改版首页附近热门活动
nearByList(longitude,latitude){
  return this.getTData({
    url:'/WeChatAppsCs/Member/nearby',
    data: { longitude, latitude}
  })
},
//改版首页待分享接口
beShare(){
  return this.getTData({
    url:'/WeChatAppsCs/memberIndex/be_share'
  })
},
//首页专项卡数量
cardCount(){
  return this.getTData({
    url:'/WeChatAppsCs/MemberCard/cardCount'
  })
}

}