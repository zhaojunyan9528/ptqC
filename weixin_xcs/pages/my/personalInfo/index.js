// pages/my/personalInfo/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: { 
    curDate: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate(),
  },
  onLoad: function(){
    // 加载初始数据
    BASE.PRO._set(this);
  },
  onShow: function(opts){
    const _that = this, _d = _that.data;
    

    // 加载页面数据
    this.getUserInfo();
    
    // 强制刷新上一页数据
    _that.setRPdata();
  },
  // 获取用户信息
  getUserInfo(){
    wx.showLoading({ title: '加载中...' });
    const _that = this, _d = _that.data;
    A.updata.init().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          user: res.info
        });
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { 
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 修改头像
  editLogo: function(){
   
    const _that = this;
    A.updata.editLogo(this).then(res => {
     
      if (res.statusCode == 200) {
        _that.saveLogo(res.data);
      } else { 
     
        A.showTipModal(res.errMsg) 
      }
    }, err => { 
      A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 保存头像
  saveLogo: function (logoUrl) {

    const _that = this;
    let logo = logoUrl.replace(/[\r\n]/g, "");
    let logoS = logo.replace("https://pintuanqu.oss-cn-hangzhou.aliyuncs.com", "");
    wx.showLoading({ title: '加载中...' });
    A.updata.saveLogo(logoS).then(res => {
      wx.hideLoading();
      _that.setData({ 'user.wx_img': logo});

      A.showTipModal(res.info);
    }, err => { 
      wx.hideLoading();
  
      A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 修改生日
  editBirth: function (e) {
    wx.showLoading({ title: '加载中...' });
    const _that = this;
    A.updata.editBirth(e).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({ 'user.birth': e.detail.value });
        A.showTipModal(res.info)
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ) });
  }
}));