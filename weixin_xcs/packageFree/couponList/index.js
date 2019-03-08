// packageFree/couponList/index.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['可用代金券','已失效代金券'],
    tips:'代金券只可以线下到店扫码消费使用，且每张代金券只可以使用一次。',
    couponImg:'../../assets/images/couponImg.png', //未失效代金券背景图
    couponLoseImg: '../../assets/images/couponLoseImg.png',//已失效代金券背景图
    currentIndex:0,//当前tab
    pageNum:1,
    pages:1,
    nullFlag:0,
    nullData: {
      img: '/assets/images/noMoney.png',
      text: '暂无信息'
    },
    couponList:[] //代金券列表
  },
  //切换tab
  selectTab: function (e) {
    var that = this;
    var currentIndex = e.detail.index;
    that.setData({
      currentIndex: currentIndex,
      pageNum:1,
      couponList:[]
    })
    that.couponList(1, currentIndex);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startFn();
  },
  startFn(){
    var that = this;
    that.couponList(that.data.pageNum,that.data.currentIndex);
  },
  //代金券列表
  couponList(pageNum,flag){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.couponList(pageNum,flag).then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        var couponList = that.data.couponList || [];
        res.data.map((item,index)=>{
          couponList.push(item)
        })
        that.setData({
          couponList: couponList,
          pageNum:res.pageNum,
          pages:res.pages
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
    var pageNum = that.data.pageNum;
    var pages = that.data.pages;
    if(pages <= pageNum){
      return;
    }
    pageNum++;
    that.couponList(pageNum,that.data.currentIndex);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))