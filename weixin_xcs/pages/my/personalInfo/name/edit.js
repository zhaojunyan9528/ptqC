const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: { 

    upBtnFlag: false,
  },
  onLoad: function(){
    // 加载初始数据
    BASE.PRO._set(this);
  },
  onShow: function(opts){
    const _that = this;
    
    // 加载初始data
    BASE.PRO._set(_that);

    // 获取名称
    _that.getName();
  },
  
  
  getName(){
    wx.showLoading({ title: '加载中...' });
    A.updata.getName().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          name: res.info.wx_name,
          canEdit: true
        });
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { 
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 昵称：监控输入事件
  regInput: function(e){
    let canEdit = false;
 
    let upBtnFlag = this.GetLength(e.detail.value);
    if (upBtnFlag) { canEdit = true; }
    this.setData({
      name: e.detail.value,
      canEdit: canEdit,
      upBtnFlag :upBtnFlag
    });
  },
  // 昵称：清空输入
  clearInput: function(){
    this.setData({ name: '', canEdit: false });
  },
  // 转换汉字为字符
  GetLength(str) {
    let len = str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    let upBtnFlag = true;
    if (len < 2 || len >= 16) {
      upBtnFlag = false;
    }
    return upBtnFlag
  },
  // 保存修改
  saveData: function () {
   
    const _that = this, _d = _that.data;
   
    let isNickName = A.REG.NickName(_d.name), nickNameLen = A.StrFunc.StrLen(_d.name);

    if (isNickName && nickNameLen >= 4 && nickNameLen <= 16) {
      wx.showLoading({ title: '加载中...' });
      A.updata.saveName(_that).then(res => {
        wx.hideLoading();
        if (res.status == A.STATE.STATUS.OK) {
          A.showTipModal(A.information.MODEFIYSUCC, this.goBackR);  //修改成功！
        } else { A.showTipModal(res.info || A.information.DATAFAIL) }
      }, err => { A.showTipModal(err.info || A.information.FAILREQ) });
    } else { 
      wx.hideLoading();
      A.showTipModal(A.information.WRONGNICKNAME)
    }  //请输入正确格式的昵称
  }
}));