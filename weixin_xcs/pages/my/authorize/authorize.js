// pages/my/authorize/authorize.js
const A = getApp();
Page(A.assignPage({
   data: {},
   onShow: function() {
      wx.getLocation({
         type: 'wgs84',
         success: function(res) {
            var latitude = res.latitude;
            var longitude = res.longitude;
            if (!longitude || !latitude) {
              A.showTipModal(A.information.OPENPOSITION);  //请先开启您手机的定位功能!
            } else {
               wx.getSetting({
                  success(res) {
                     if (res.authSetting['scope.userLocation'] && res.authSetting['scope.userInfo'] && res.authSetting['scope.writePhotosAlbum']) {
                       A.G('reLaunch:///pages/index')
                     } else {   //抱歉！您还有必须授权信息未授权,请授权后进行操作!
                       A.showTipModal(A.information.UNAUTHORIZED);
                     }
                  }
               })
            }
         }
      })
   }
}));