// pages/businessHomePage.js
const A = getApp();
Page(A.assignPage({
  /**
   * 页面的初始数据
   */
  data: {
    voucherCount:0,
      store_id:0,
      firstFlag:2,//为1时为新用户 
      nullData:{
        img:'/assets/images/no_activity.png',
        text:"暂无待分享活动"
      },
    period_time: { h: "00", m: "00", s: "00" },
    pageNum:1,
     voucherCount:0,
    nearList:[],//附近活动
    recommendList:[],//推荐活动
    recentStore:{},//上次浏览店铺
    share_goods:{}, //待分享商品
    wx_imgs:[], //待分享活动用户头像
    rollFlag: 0,//顶部商家数量滚动1：滚动 0不滚动
    shareFlag:0 //待分享是否为空 1空 0不空
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    A.setInterval("accdown", (id) => {
      var period_time = A.rtime(that.data.period_timeu - id.count);
      if (!(period_time.s == 0 && period_time.m == 0 && period_time.h == 0) ){
        that.setData({
          period_time: period_time
        })
      }else{
        that.setData({
          period_time: {h:"00",m:"00",s:"00"}
        })
      }
    }) 


     },
  //初始化方法
  startFn(){
    var that = this;
    that.getUserInfo();
    that.specialCardCount();
    that.recentScanStore();
    that.beShare();
    that.recentRecommend();
    that.nearBy();
  },
  
  //关注商家推荐活动
  recentRecommend(){
    wx.showLoading({ title: '加载中...' });
    A.updata.recentRecommend(this.data.pageNum).then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          recommendList: res.data
        })
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    })
  },
  // 上次浏览店铺
  recentScanStore(){
    wx.showLoading({ title: '加载中...' });
    A.updata.recentScanStore().then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          recentStore: res,
          store_id:res.id
        })
        if (res.id) {
          this.setData({
            firstFlag: 2
          })
        }else{
					this.setData({
						firstFlag: 1
					})
				}
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL,()=>{
         
        })
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    })
  },
  //待分享活动
  beShare(){
    wx.showLoading({ title: '加载中...' });
    A.updata.beShare().then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK){
        if (res.share_goods){
          this.setData({
            share_goods: res.share_goods,
            shareFlag:0,
          })
          if(res.wx_imgs){
            this.setData({
              wx_imgs: res.wx_imgs,
              period_timeu: res.share_goods.valid_period
            })
          }
        }else{
          this.setData({
            shareFlag: 1,
          })
        }
      }else{
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    },err=>{
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    })
  },
  //专享卡
  specialCardCount(){
    wx.showLoading({ title: '加载中...' });
    A.updata.cardCount().then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          specialCard:res.count,
          voucherCount: res.voucherCount
        })
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    })
  },
  // 附近热门
  nearBy(){
    var that = this;
    wx.showLoading({ title: '加载中...' });
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {

        var latitude = Number(res.latitude);
        var longitude = Number(res.longitude);
        if (!latitude || !longitude) {
          A.showTipModal(A.information.OPENPHONEPOSITION, () => {  //为能检测到请您的定位信息，请先开启手机的定位服务！
            A.G("reLaunch:///pages/nearShopList/wsq/wsq");
          });
          wx.hideLoading();
          return
        }
        A.updata.nearByList(longitude, latitude).then(res => {
          wx.hideLoading();
          if (res.status == A.STATE.STATUS.OK) {
            that.setData({
              nearList: res.data
            })
          } else {
            A.showTipModal(res.info || A.information.DATAFAIL)
          }
        }, err => {
          wx.hideLoading();
          A.showTipModal(err.info || A.information.FAILREQ)
        })
      },
      fail: (err) => {
        wx.hideLoading()
        A.showTipModal(A.information.OPENPHONEPOSITION, () => {  //为能检测到请您的定位信息，请先开启手机的定位服务！
          A.G("reLaunch:///pages/nearShopList/wsq/wsq");
        });
      }
    })
    
  },
  // 获取用户信息
  getUserInfo() {
    const _that = this, _d = _that.data;
    wx.showLoading({ title: '加载中...' });
    A.updata.memberInfo().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          user: res.memberMsg,
          storeNum: res.memberMsg.store_num
        });

      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    });

  },

  goDetail:function(e) {

    var goods_id = e.detail.goods_id;
    var is_group = e.detail.type;
    var group_id = e.detail.group_id;
    if (is_group == 1) {//拼团立减
      A.G('/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id + '&group_id='+group_id)
    } else if (is_group == 3) {
      A.G('/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 4) {
      A.G('/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 6) {
      A.G('/pages/goodsInfo/goodsBargain/goodsBargain?goods_id=' + goods_id + '&group_id=' + group_id)
    }
  },
  goDetailI: function (e) {
    var goods_id = e.currentTarget.dataset.id;
    var is_group = e.currentTarget.dataset.type;
    var group_id = e.currentTarget.dataset.groupid;
    if (is_group == 1) {//拼团立减
      A.G('/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 3) {
      A.G('/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 4) {
      A.G('/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 6) {
      A.G('/pages/goodsInfo/goodsBargain/goodsBargain?goods_id=' + goods_id + '&group_id=' + group_id)
    }
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
    var that = this;
    A.setInterval("accdown", (id) => {
      var period_time = A.rtime(that.data.period_timeu - id.count);
      if (!(period_time.s == 0 && period_time.m == 0 && period_time.h == 0)) {
        that.setData({
          period_time: period_time
        })
      } else {
        that.setData({
          period_time: { h: "00", m: "00", s: "00" }
        })
      }
    })
    this.setData({
      rollFlag:1
    })
     this.startFn();
  },
  // 门店点击效果
  storeClick(e) {
    var latitude = Number(e.currentTarget.dataset.latitude);
    var longitude = Number(e.currentTarget.dataset.longitude);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      rollFlag:0
    })
    A.clearInterval('accdown')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    A.clearInterval('accdown')
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

  },
}))