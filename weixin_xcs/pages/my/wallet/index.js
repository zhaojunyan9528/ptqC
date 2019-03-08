// pages/my/wallet/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    loading:false
  },
  onLoad: function(opts){
    const _that = this, _d = _that.data;

    // 加载初始数据
    BASE.PRO._set(_that);
    
  },
  onShow: function(){
    // 获取钱包首页数据
    this.getWalletData();
  },
  
  
  // 获取数据
  getWalletData: function(){
    A.updata.walletData().then(res => { 
      if(res.status == A.STATE.STATUS.OK){
        this.setData({ info: res.info });
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { A.showTipModal(err.info || A.information.FAILREQ) });
  }
}))