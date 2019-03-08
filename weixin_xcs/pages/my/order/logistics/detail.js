// pages/my/order/logistics/detail.js
const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data:{
    orderId: '',
    noList: true,
    noListInfo: {
      img: '',
      txt: A.information.NULLLOGISTICS ,//'暂无物流信息'
    },
    noBtn: true
  },
  onLoad: function(opts){
    const _that = this, _d = _that.data;

    // 参数
    if(opts.order_id){
      _that.setData({ orderId: opts.order_id });
    }

    // 加载初始数据
    BASE.PRO._set(_that);

    // 获取物流详情
    _that.logisticsDetail();

    // 强制刷新上一页数据
    _that.setRPdata();
  },
  
  
  // 物流详情
  logisticsDetail(){
    const _that = this;
    wx.showLoading({ title: '加載中...' });
    A.updata.logisticsDetail(_that).then(res => {
      wx.hideLoading()
      if(res.status == A.STATE.STATUS.OK){
        _that.setData({
          logisticsCom: res.wuliu_name,
          waybillNumber: res.wuliu_nums,
          noList:false
        });
      } else if (res.status ==  0){
        _that.setData({
        
          noList: true
        });
      }else {
        A.showTipModal(A.information.DATAFAIL)
      }
    }, err => { 
      wx.hideLoading()
      A.showTipModal(err.info || A.information.FAILREQ)
    
     });
  }
}))