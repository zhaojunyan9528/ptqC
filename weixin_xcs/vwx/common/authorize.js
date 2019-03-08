const config = require('../config/config.js');
//权限申请处理
const authorize = function (_arr) {
   let arr = _arr || [];
   if (arr.length > 0) {
      wx.authorize({
         scope: arr.pop(),
         success: res => {
            authorize(arr);
         },
         fail: res => {
            authorize(arr);
         }
      });
   }
}
const coms = {
   init() {
      authorize(config.scope);
   },
   getUserInfo() {
      return new Promise(function (resolve, reject) {
         // 获取用户信息
         wx.getSetting({
            success: res => {
               if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                     success: res => {
                        resolve(res);
                     },
                     fail: err => {
                       
                     }
                  })
               } else {
                  wx.authorize({
                     scope: 'scope.userInfo',
                     success(res) {
                      
                        wx.getUserInfo({
                           success: rs => {
                              resolve(rs);
                           },
                           fail: err => {
                              reject(err);
                            
                           }
                        })
                     },
                     fail(err) {
                        reject(err);
                     }
                  });
                 
               }
            },
            fail: err => {
            
            }
         })
      });
   }
}
module.exports = coms
