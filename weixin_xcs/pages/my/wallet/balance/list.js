// pages/my/wallet/balance/list.js
const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    noList: false,
    noListInfo: {
      img: '/assets/images/n3_ico3.png',
      txt: A.information.NULLBALANCE,// '暂无资金明细'
    },
    noBtn: true,

    pageCount: 0,
    pageNum: 0,
    isLastPage: false,
    list:[],
  },
  onLoad: function(opts){
    const _that = this, _d = _that.data;

    // 加载初始数据
    BASE.PRO._set(this);
  },
  onShow: function(){
    const _that = this, _d = _that.data;

    // 获取余额明细列表
    _that.getBalanceList();

  },
  
  // 获取余额明细列表
  getBalanceList: function(){
    const _that = this;
    A.updata.balanceList(this).then(res => {
      if (res.status == A.STATE.STATUS.ERROR){
        A.showTipModal(res.info || A.information.DATAFAIL, _that.goBack);
      }
    }, err => { });
  },
  // 触底加载更多
  onReachBottom: function(){
    if (!this.data.isLastPage){
      this.getBalanceList();
    }
  }
}))