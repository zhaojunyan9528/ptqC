// packageFree/activitiDetails/index.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    tips:'朋友消费时每使用一张代金券，您就会收到相应金额的消费奖励',
    freeNum:'',
    tabs:['现金奖励','消费奖励'],
    cashList:[],
    nullData:{
      img:'/assets/images/noActivity.png',
      text:'暂无奖励信息'
    },
    nullFlag:0,
    currentIndex:0, //当前tab
    paging:1,
    all_paging:1,
    hasFree:'0.00'//已免单
  },
  // //切换tab
  selectTab:function(e){
    var that = this;
    var currentIndex = e.detail.index;
    that.setData({
      currentIndex: currentIndex,
      cashList:[],
      paging:1,
      all_paging:1,
      tabs: ['现金奖励', '消费奖励'],
    });
    that.activitiDetails(that.data.initiator_id, that.data.currentIndex + 1, that.data.paging);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.initiator_id != undefined){
      that.setData({
        initiator_id: options.initiator_id
      })
    }
    that.activitiDetails(that.data.initiator_id, that.data.currentIndex+1,that.data.paging);
  },
  activitiDetails(initiator_id,type, paging){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.activiDetails(initiator_id, type, paging).then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        var cashList = that.data.cashList || [];
        res.list.map((item, index) => {
          cashList.push(item)
          cashList[index].create_time = cashList[index].create_time.split(".")[0]
        })
        var tabs1 = that.data.tabs[0] + " (" + res.couponCount[0] + "元)";
        var tabs2;
        if (res.couponCount[1]==0){
          tabs2 = that.data.tabs[1] + "(待使用)";
        }else{
          tabs2 = that.data.tabs[1] + " (" + res.couponCount[1] + "元)";
        }
        var tabs = [tabs1, tabs2];
        var hasFree = (parseFloat(res.couponCount[0]) + parseFloat(res.couponCount[1])).toFixed(2);//已免单金额
        // var hasFree = (parseFloat(res.couponCount[0]).toFixed(2));//已免单金额
        that.setData({
          cashList: cashList,
          couponCount: res.couponCount,
          summaryShow:res.summaryShow,
          tabs: tabs,
          hasFree: hasFree
        })
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
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
    var that = this;
    var paging =that.data.paging;
    var all_paging = that.data.all_paging;
    if(all_paging <= paging){
      return;
    }
    paging++;
    that.activitiDetails(that.data.initiator_id, that.data.currentIndex + 1, paging);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))