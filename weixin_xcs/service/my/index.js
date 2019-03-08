import BASE from '../../pages/my/utils/base.js';
import A from '../../vwx/uset.js'

module.exports = {
   // 用户信息
   userInfo() {
      return this.getTData({
         url: '/WeChatAppsCs/MemberMy/index'
      });
   },
   login(data) {
      return this.postTData({
        // url: '/WechatApi/member/login',
        url: '/WeChatAppsCs/Enter/login',
         data
      });
   },
   //用户注册接口
  userRegister(data){
     return this.getTData({
       url: "/WechatApi/member/register",
       data:data
     })
   }
   
   
}