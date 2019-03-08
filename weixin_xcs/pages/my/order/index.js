// pages/my/order/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    orderTypes: []
  },
  onShow: function(opts){
    const _that = this;

    // 加载初始数据
    BASE.PRO._set(_that);

    // 加载初始化静态数据
    _that.setData({ typeList: BASE.DATA.orderTypeList});

    // 加载最近订单数据
    _that.getOrderInfo();
  },
  
  
  // 获取最近订单列表
  getOrderInfo(){
    A.updata.loadOrderIndex().then(res => {}, err => {});
  }
}))