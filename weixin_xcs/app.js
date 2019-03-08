//app.js
import { vwx } from '/vwx/index.js'
import config from '/config/config.js'
import exta from '/common/exta';
import { DF, STATE } from '/config/define.js'
import store from '/udb/store/index.js'
import DB from '/udb/DB/index.js'
import webservice from '/service/webservice.js'
import Appinit from '/common/appinit.js';
import information from '/config/index.js'
// 注册App，vwx初始化数据
App(vwx({
   reLaunchQuery: false,
   config, exta, webservice, store, DB, DF, STATE, information,
   onLaunch: function (e) {
     
      console.log("v:" + this.config.c);
      //授权初始化
      this.config.req.data.unionid = this.user.unid;
   },

   onShow: function () {

        console.log("v2:" + this.config.c);
        // 监听网络情况
        Appinit.network().then(res => {

          //用户登录授权情况
          Appinit.user().then(res => { });
        });


     // 定时授权
     var date = new Date();
     var nowDate = date.getTime();
     var oldNowDate = wx.getStorageSync("loginAccDown");
     if (nowDate - oldNowDate > 259200000) {//259200000
       //  console.log(A.getParentPage())
       //  wx.clearStorageSync("unionid");
       //  wx.redirectTo({
       //    url: "/pages/my/login/login"
       //  });
       this.isPrower(true);
       this.goPrower();
     }

   },
   onPageNotFound: function (res) {
      var query = "";
      // a= 123 & b = 456
      for (var k in res.query) {
         query += k + '=' + res.query[k] + '&'
      }
      query = query.substring(0, query.length - 1)
      switch (res.path) {
         case "pages/goodsInfo/goodsInfo2/goodsInfo2":
            wx.redirectTo({
               url: '/pages/goodsInfo/goodsSale/goodsSale?' + query,
            })
            break;
         case "pages/goodsInfo/goodsInfo1/goodsInfo1":
            wx.redirectTo({
               url: '/pages/goodsInfo/goodsPeople/goodsPeople?' + query,
            })
            break;
         case "pages/goodsInfo/goodsInfo":
            wx.redirectTo({
               url: '/pages/goodsInfo/goodsGroup/goodsGroup?' + query,
            })
            break;
         case "pages/index/index":
            this.reLaunchQuery = res.query;
            wx.reLaunch({
              url: 'pages/myStore/index?' + query,
            })
            break;
         case "pages/my/my":
            wx.reLaunch({
               url: '/pages/my/index'
            })
            break;
         default:
            wx.reLaunch({
               url: '/pages/index',
            })
      }
   },
   onError(error){
      // 错误日志提交
      var page = getCurrentPages()[0];
      this.updata.setErrorlog(page.route + "?" + this.urlParams(page.options), error).then(res => {
         console.log(res);
      })
   }
}));