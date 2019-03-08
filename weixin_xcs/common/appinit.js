import A from '../vwx/uset.js'
// 网络情况处理
const network = function() {
   return new Promise((resolve, reject) => {

      wx.getNetworkType({
         success: (res) => {
            if (res.networkType == "none") {
               wx.showModal({
                  showCancel: false,
                  content: '网络不正常'
               })
               reject();
            } else {
               resolve()
            }
         }
      })

      // 监听网络情况
      wx.onNetworkStatusChange((res) => {
         if (!res.isConnected) {
            wx.showModal({
               showCancel: false,
               content: '网络不正常'
            })
         }
      });
   })
}
const user = function() {
   return new Promise((resolve, reject) => {
      if (A.user.unid != "") {
         A.config.req.data.unionid = A.user.unid;
         resolve();
      } else {
         A.goPrower();
      }
   });
}
module.exports = {
   network,
   user
};