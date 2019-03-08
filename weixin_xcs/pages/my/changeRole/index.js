// pages/my/changeRole/index.js
const A = getApp();
Page(A.assignPage({
  /**
   * 页面的初始数据
   */
  data: {
    allSty: [],
    identFlageArr: [],
    allName: [{
      name: '客户(商城购物)',
      btn: 'cusBtn'
    }, {
      name: '商家',
      btn: 'shopBtn'
    }, {
      name: '渠道商',
      btn: 'gentBtn'
    }],
    imgUrl: A.config.uApi.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var allSty = that.data.allSty
    A.updata.changeIdentity().then(res => {

      if (res.status == A.STATE.STATUS.OK) {
        var upidentity = Number(res.upidentity);
        for (let i = 0; i < 4; i++) {
          allSty[0] = ''
        }
        allSty[upidentity - 1] = '1'
        that.setData({
          allSty: allSty
        })
      }
    }, res => { })
  },
  
  // 点击进入
  allBtna(e) {
    
    var that = this;
    var index = Number(e.currentTarget.dataset.index);
    var upidentity = index +1 
    var store_id = wx.getStorageSync('store_id');
 
    var idenStr = index == 0 ? '客户' : index == 1 ? '商家' : index == 2 ? '渠道商' : index == 3 ? '渠道商' : '暂无身份';
    var idenNav = index == 0 ? 'index?store_id=' + store_id : index == 1 ? 'myshop/home/index' : index == 2 ? 'loading/identChang/identChang' : index == 3 ? 'myarea/myarea' : '暂无身份';
    var appid = index == 1 ? 'wx429f42a870cd65c0' : index == 2 ? 'wx6de5e3a338bc09e5' : 'wxd25131b98741c7cb';
    A.showBaseModal('是否切换到' + idenStr + '个人中心',()=>{
      A.updata.identityVerify(upidentity).then(res => {
        if (index == 0) {
          A.G("reLaunch:///pages/" + idenNav)
        } else {
          wx.navigateToMiniProgram({
            appId: appid,
            path: '/pages/' + idenNav,
            extraData: {},
            envVersion: 'release',
            success: function (res) {

            }
          })
        }
      })
    })
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