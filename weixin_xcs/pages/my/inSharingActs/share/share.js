// pages/my/participatingActs/index.js
const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,
    listType: 2,
    hasApplyEntry: true,
    countDown: [], // 倒计时，0小时、1分钟、2秒
    info: {},
    item: {},
    noDate:false
  },
  onLoad: function (opts) {
    const _that = this;
    // 参数
    _that.setData({ 
      isShare: opts.is_share || 0,
      orderId: opts.order_id || 0
    });

    // 加载初始数据
    BASE.PRO._set(_that);
    
    // 获取分享信息
    this.getShareInfo(opts);
  },
  // 获取分享信息
  getShareInfo: function (opts) {
    
    const _that = this, _d = _that.data;
    var acount = 0;
    wx.showLoading({
      title: '加载中...',
    })
    A.setInterval("payTime", () => {
     
      A.updata.getIsOrder(opts.order_id).then(res => {
  
        if (res.status == 1) {
          A.updata.getShareInfo(_d).then(res => {
            wx.hideLoading();
            if (res.status == A.STATE.STATUS.OK) {
              this.setData({
                noDate:true
              })
              var item = {};
              item = res.info.goods_info;
              item.goods_id = res.info.goods_id;
              item.group_id = res.info.group_id;
              item.is_group = res.info.is_group;
              if (item.is_group == 1 || item.is_group == 3){
                item.arr = res.info.head_arr.slice(res.info.head_arr.length - 5 < 0 ? 0 : res.info.head_arr.length - 5,6)   
              }
              _that.setData({
                info: res.info,
                item: item
              });
              if (res.info.is_group == 3) { }
            } else { A.showTipModal(res.info || A.information.DATAFAIL) }
          }, err => { A.showTipModal(err.info || A.information.DATAFAIL) });
          A.clearInterval('payTime');
        }
      }, err => {
      })
      acount++;
      if (acount > 100) {
        wx.hideLoading();
        A.showTipModal("请求超时");
        A.clearInterval('payTime');
      }
    }, 100); 

  },
  //我的订单
  goOrderList:function(){
    A.G("switchTab:///pages/my/order/list/list")
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    let shareData = this.data.info;
    let order_id = this.data.orderId;
	let user_id = A.store.goods.recmendData.member_id || A.DB.user.uid
    console.log(user_id)
    var urlAll = shareData.is_group == 1 ? '/goodsGroup/goodsGroup' : shareData.is_group == 3 ? '/goodsPeople/goodsPeople' : shareData.is_group == 4 ? '/goodsSale/goodsSale' : shareData.is_group == 6 ? '/goodsBargain/bargainDetail/bargainDetail' :'/goodsGroup/goodsGroup' ;
    var goods_name = shareData.goods_info.goods_name;
    var goods_info = shareData.goods_info;

    var url = '/pages/goodsInfo' + urlAll;
    if (shareData.is_group == 6){
      url += '?goods_id=' + shareData.goods_id + '&bargain_id=' + shareData.bargain_id + '&m=' + user_id;
    }else{
        url += '?store_id=' + shareData.store_id + "&goods_id=" + shareData.goods_id + "&group_id=" + shareData.group_id + '&is_share=1' + '&m=' + user_id;
    }
    console.log(url)
    let imgUrl = goods_info.goods_img
    
    return {
      title: shareData.share_str,
      path: url,
      imageUrl: imgUrl,
      success: res => {
  
      },
      fail: res => {
    
      }
    }
  }
}))