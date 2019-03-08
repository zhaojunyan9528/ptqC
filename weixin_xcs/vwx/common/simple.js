import modal from "modal.js";
import validateFrom from './validate/validate.js';
import C from './simple/C.js';
import G from './simple/G.js';
import RRS from './simple/R.js';
import S from './simple/S.js';
import P from './simple/P.js';
import wxUtils from './simple/wxUtils.js';
import utils from './simple/utils.js'
import stv from './simple/stv.js'
// 全局常用方法
// 全局App对象
var A = {};
// 返回页面对象
const getParentPage = wxUtils.getParentPage;
// 获取当前页面组件
const selectComponent = wxUtils.selectComponent;
// 上传文件
const upFile = wxUtils.upFile;
// 选择图片
const chooseImage = wxUtils.chooseImage;
//发送手机验证码
const sendSMS = wxUtils.sendSMS;
//微信小程序登录,获取code
const wxLogin = wxUtils.wxLogin;
// 设置当前模块全局A对象
const setSimpleApp = function (_app) {
  A = _app;
  RRS.setSimpleApp(_app);
  wxUtils.setSimpleApp(_app);
}
// 创建promiseReject
const promiseReject = function (_obj) {
  return new Promise((resolve, reject) => {
    reject(_obj)
  })
}
const dateFormat = utils.dateFormat;
const formatData = utils.formatData;

module.exports = {
  // 获取点击事件值
  C,
  // 跳转处理
  G,
  // 弹窗处理
  S,
  //发起网络请求
  R: RRS.R,
  //发起网络请求，返回promise 对象
  RS: RRS.RS,
  //发起支付请求
  P,
  // 定时器,id唯一标识，字符串类型
  setInterval: stv._setInterval,
  clearInterval: stv._clearInterval,
  // 数据验证
  validateFrom,
  setSimpleApp,
  sendSMS,
  wxLogin,
  upFile,
  chooseImage,
  formatData,
  dateFormat,
  getParentPage,
  promiseReject,
  selectComponent,
  ...modal
}