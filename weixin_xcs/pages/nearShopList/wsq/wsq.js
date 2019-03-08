// pages/nearShopList/nearShopList/wsq/wsq.js
const A = getApp();
Page(A.assignPage({

  /**
      * 页面的初始数据
      */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getUserInfo();
    wx.saveImageToPhotosAlbum();
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        if (!longitude || !latitude) {
          A.showTipModal(A.information.OPENPOSITION);  //请先开启您手机的定位功能
        } else {
          wx.getSetting({
            success(res) {
 
              if ( res.authSetting['scope.writePhotosAlbum']) {
                A.G('reLaunch:///pages/index')
              } else {
                A.showTipModal(A.information.UNAUTHORIZED);  //抱歉！您还有必须授权信息未授权,请授权后进行操作!
              }
            }
          })
        }
      }
    })

  },
  // 点击调起授权
  authorizeBtn: function () {
    wx.openSetting({
      success: (res) => {

      }
    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))