// pages/goodsInfo/goodsGroup/goodsGroup.js
var canvas = require("./canvas.js");
var regis = require("../register.js");
const fixedData = require("../../../common/fixed-data.js");
let animationInterval;
let interval 
const A = getApp();
Page(A.assignPage({
   data: {
     type:0,
     rate:1,
     pageW:375,
     animation: {},
     saveAlbum:false,//保存相册
     showCanvas:false,//显示画布
     xsFlag: false,
     radiusFlag:false,
     showCancel:true,
     mengbanFlage:false,  
     customFlag:false,
     is_group:1,
     is_remind:0,
     ptFlage:false,  
     imgLoadNewArr:[],
     imgurl: "/assets/images/red_img.png",
     red_img: [],
     red_data_code: {},
     imgCreatFn: '',
     canvasTimes: 1,
     tabs: ['商品详情', '宝贝评价'],
     activeIndex: 0,
     imgUrl: A.config.uApi.imgUrl,
      groupPlay: [{
       img: 'goods3_ico2.png',
       name: '开团或参团'
     }, {
       img: 'goods3_ico3.png',
       name: '付款即使用'
     }, {
       img: 'goods3_ico4.png',
       name: '邀请好友参团'
     }, {
       img: 'goods3_ico5.png',
       name: '享受返现'
     },],
     bHeight:0,//窗口高度
     recommend_people: 0,//标识，渲染推荐人信息
     makepacget: [],
     shareArr: [{
       share_content: "分享给好友或朋友圈"
     }, {
       share_content: "通过分享成功下单"
     }, {
       share_content: "微信秒到账"
     }],
     animationArr: [],
     recommend_id: 0,
     recommend:{}
   },
   computedA: {
     // 配置全局
     cart: ['count']
   },
   onLoad: function (options) {
    //    this.startAnimation();
   
//获取手机的可用宽高
     wx.getSystemInfo({
       success: (res) =>{
         var canvasW = Number(res.windowWidth) * 92 /100;
         var canvasH = canvasW * 1.438 ;
         var pageW = Number(res.windowWidth);
         var pageH = Number(res.windowHeight);
         var rate = Number(res.windowWidth) / 375
         this.setData({
           rate: rate,
           canvasW: canvasW,
           pageW: pageW,
           canvasH: canvasH,
           bHeight: res.windowHeight
         })
       },
     })
       //  推荐人信息
       var recommend_id;
       if (options.m) {
           recommend_id = options.m;
           this.setData({
               recommend_id: options.m,
           })
       }
     if (options.goods_id || options.group_id) {
       this.setData({
         goods_id: options.goods_id
       })
       if (options.group_id) {
         this.setData({
           group_id: options.group_id || 0
         })
       }
       this.getGroupData(options.goods_id, options.group_id || 0)
     } 
  

   
   },
  onShow() {
    // 设置换行业图片宽度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ animationX: res.screenWidth / 750 * 200 })
      }
    });
    
  },
   //获取初始数据
   getGroupData: function (goods_id,group_id){
     wx.showLoading({
       title: '加载中...',
     })
       var that = this
     var recommend_id = this.data.recommend_id
     A.updata.getGroupInfo(goods_id, group_id, recommend_id).then(res => {
      
       wx.hideLoading();
       if (res.status == A.STATE.STATUS.OK){
         //是否开启赚红包，is_red
         if (res.goods_info.is_red) {
           // 开启赚红包，下载图片
            //  this.downloadImg().then(function () {
            //      that.startAnimation();

            //  });
           // 开启赚红包，新增赚红包记录
           this.setData({
             tabs: ['商品详情', '赚红包记录', '宝贝评价']
           })
           // 开启赚红包，动图效果
        //    this.startAnimation();
           // 如果推荐人信息存在，判断recommend对象是否为空，不为空给个标识渲染页面
           if (res.recommend) {
             if (Object.keys(res.recommend).length != 0) {
               this.setData({
                 recommend: res.recommend,
                 recommend_people: 1  //是否渲染推荐人信息
               })
               A.store.goods.recmendData = res.recommend
             }
           }else{
               this.setData({
                   recommend: 0
               })
               A.store.goods.recmendData = {}

           }
         }
         // 是否开启员工提成，is_unit
           if (res.recommend) {
               if (Object.keys(res.recommend).length != 0) {
                   if (res.goods_info.is_unit && res.recommend.is_account) {
                       this.setData({
                           recommend: res.recommend,
                           recommend_people: 1 //是否渲染推荐人信息
                       })
                       A.store.goods.recmendData = res.recommend
                   }
               }
           }else{
               this.setData({
                   recommend: 0
               })
               A.store.goods.recmendData = {}

           }
         // 回车符处理
         var store_info = fixedData.reviseExampleShop(res.store_info)
         var goods_detail1 = "";
         if (res.goods_info.goods_detail) {
     
           var goods_detail = res.goods_info.goods_detail

           var str = goods_detail.replace(/\n/g, "||-&");
           goods_detail1 = str.split("||-&");
           if (goods_detail1[0] || goods_detail1[0] == '') {
             goods_detail1 = goods_detail1;
           } else {
             goods_detail1[0] = goods_detail
           }
         }
         let goods_info = res.goods_info
         
         goods_info.goods_detail1 = goods_detail1
         this.setData({
           goods_info: goods_info,
           group_info: res.group_info,
           pay_info: res.pay_info,
           store_info: store_info,
           user_info: res.user_info,
           type: res.type,
           is_remind: res.is_remind
         })
         
         //赚红包记录
         A.updata.getMakePackget(goods_id).then(res => {
           if (res.status == 1) {
             this.setData({
               makepacget: res.data,
             })
           }
         }, this.rsErr)
        
    A.updata.getEvaluateList(goods_id).then(res => {
           if (res.status == A.STATE.STATUS.OK) {
             this.setData({
               evaluate_list: res.info.evaluate_list
             })
           }}, err => {
             A.showTipModal(err.info)
         })
         // 生成二维码
         var is_reds = this.data.goods_info.is_red
         console.log(this.data.goods_info.is_red)
         A.updata.redCode(goods_id, group_id, is_reds).then(res => {
           if (res.status == 1) {
             this.setData({
               red_data_code: res.data.data,
             })
           }
             //获取画布图片
             if (!this.data.imgLoadNewArr[0]) {
               var data = this.data.goods_info
               let imgLoadArr
               if (data.is_red) {
                 imgLoadArr = [
                   this.data.user_info.wx_img,
                   this.data.red_data_code
                 ]
                   console.log(imgLoadArr)
               } else {
                 imgLoadArr = [
                   this.data.goods_info.goods_slide[0],
                   this.data.store_info.store_logo,
                   this.data.goods_info.goods_qr_code_url,
                   'https://www.pintuanqu.cn/Public/WeChatApps/image/store_share_ico.png'
                 ];
                  
               }
               let imgLoadNewArr = [];

               for (let i in imgLoadArr) {
                 var imgLoadArri = imgLoadArr[i];
                 if (imgLoadArri.substring(0, 5) != "https") {
                   var imgLoadArrfo = imgLoadArri.substring(0, 4);
                   imgLoadArri = imgLoadArri.replace(imgLoadArrfo, 'https')
                 }
                 wx.downloadFile({
                   url: imgLoadArri, //仅为示例，并非真实的资源
                   success: res => {
                     if (res.statusCode === 200) {
                       imgLoadNewArr[i] = res.tempFilePath;

                       this.setData({
                         imgLoadNewArr: imgLoadNewArr
                       })

                     } else {

                     }
                   },
                   complete: res => {
                     wx.hideLoading()
                   }
                 })
               }
             }
         }, this.rsErr)

         //标题
         wx.setNavigationBarTitle({
           title: this.data.goods_info.goods_name
         })
       }else{
         if (res.info == "该商品已经下架！"){
         
           A.showTipModal(res.info, () => {
             wx.navigateBack({
               delta: 1
             })
           })
         }else{
           A.showTipModal(res.info, () => {
             A.G('reLaunch:///pages/nearShopList/nearShopList')
           })
         } 
       
       }
     
       },err=>{
         A.showTipModal(err.info) 
     })
   },
  // 下载图片
  downloadImg: function () {
    let _that = this, _d = _that.data;
    return new Promise((resolve, reject) => {
      let count = 0,
        animationArr = this.data.animationArr;
      for (let i = 0; i <= 44; i++) {
        let url = 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/zhbdx/red' + (i) + '.png';
        if (animationArr[i] && animationArr[i].indexOf('wxfile://tmp') > -1) {
          count++;
        } else {
          wx.downloadFile({
            url: url,
            success: function (res) {
              if (res.statusCode == 200) {
                count++;
                animationArr[i] = res.tempFilePath;
                _that.setData({ animationArr: animationArr })
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
      var interval = setInterval(() => {
        if (count == 44) {
          clearInterval(interval);
          this.drawImg(0)
          resolve();
        }
      }, 100)
    })
  },
  //绘制赚红包分享图片
  drawImg: function (i) {
    let _that = this, _d = _that.data;
    // console.log(_d.animationArr[i]);
    if (_d.animationArr[i]) {
      let rate = this.data.rate;
      return new Promise((resolve, reject) => {
        let ctx = wx.createCanvasContext('animation', this);
        ctx.beginPath();
        ctx.drawImage(_d.animationArr[i], 0, 0, 75 * rate, 75 * rate);
        ctx.draw();
        resolve();
        return;
      })
    } else {
      let waiter = setInterval(() => {
        clearInterval(waiter);
        _that.drawImg(i);
      }, 100)
    }
  },
  // 赚红包动图
  startAnimation: function () {
    var _that = this,
      _d = _that.data;
    let count = 1;
    animationInterval = setInterval(() => {
      _that.drawImg(count).then(res => {
        if (count >= _d.animationArr.length - 1) {
          clearInterval(animationInterval);
          _that.startAnimation();
        } else {
          count++;
        }
      });
    }, 100)
  },
  // 赚红包活动
  show_makepacget: function () {
    this.setData({
      xsFlag: true,
      showTitle: true,
      mengbanFlage: true,
      showCanvas: false
    })
  },

  //请求接口失败弹窗提示
  ModalFail: function (res) {
    A.showTipModal(res.info || A.information.DATAFAIL)    //获取数据失败
  },
  //  团购玩法详情
   show_activity_flow:function(){
      this.setData({
        ptFlage:true,
        showTitle:true,
        mengbanFlage:true
      })
    
   },
  /**
* 生命周期函数--监听页面隐藏
*/
  onHide: function () {
    this.setData({
      customFlag: false,
      radiusFlag: false
    })
    clearInterval(this.data.imgCreatFn)
  },
  //提示弹窗
  showPay: function (e) {
    this.setData({
      customFlag: true,
    })
    clearInterval(this.data.imgCreatFn)
  },
  //去店铺
  storebutton: function (e) {
    var store_id = Number(e.detail)
    A.G("reLaunch:///pages/myStore/index?store_id=" + store_id);

  },
//去下单页面
   goBuy:function(e){
     if (this.data.is_remind == 1){
       this.setData({
         customFlag:true
       })
    }else{
       var goods_id = e.detail.goods_id || 0;
       var group_id = this.data.group_id;
       if (this.data.group_info.group_id <= 0) {
         group_id = 0
       }
       var restriction = Number(this.data.goods_info.restriction)
       var sales = Number(this.data.goods_info.sales)
      //  if (this.data.goods_info.restriction != 0 && restriction - sales <= 0) {
      //    A.showTipModal(A.information.PURCHASE)
      //  } else {
      //    A.G("/pages/buy/buy?goods_id=" + goods_id + '&group_id=' + group_id + '&type=1')
      //  }
         var recData = this.data.recommend
         var rec = JSON.stringify(recData)
         console.log(rec)
         // A.G("navigateTo:///pages/buy/buy?goods_id=" + this.data.goods_id + "&type=0" + "&recommend_id=" + this.data.recommend_id);
         wx.navigateTo({
             url: '/pages/buy/buy?goods_id=' + this.data.goods_id + '&type=0' + '&recommend_id=' + this.data.recommend_id 
         })
    }
   
  
   },
  payMoneyBox(){
    var goods_id = this.data.goods_id || 0;
    var group_id = this.data.group_id;
    if (this.data.group_info.group_id <= 0) {
      group_id = 0
    }
    var restriction = Number(this.data.goods_info.restriction)
    var sales = Number(this.data.goods_info.sales)
    //是否提示不支持退款
    var is_remind =  this.data.radiusFlag ? 1: 0
  
      A.updata.goodsVerify(is_remind, goods_id ).then(res=>{
        if(res.status == A.STATE.STATUS.OK){
          // if (this.data.goods_info.restriction != 0 && restriction - sales <= 0) {
          //   A.showTipModal(A.information.PURCHASE)
          // } else {
          //   A.G("/pages/buy/buy?goods_id=" + goods_id + '&group_id=' + group_id + '&type=1')
          // }
          A.G("/pages/buy/buy?goods_id=" + goods_id + '&group_id=' + group_id + '&type=1')
        }else{
          A.showTipModal(res.info || A.information.DATAFAIL )
        }
      },err=>{
        A.showTipModal(err.info || A.information.DATAFAIL)
      }) 
    

   
  },
   //点击下次不在提示
   radiusBtn() {
     var that = this;
     var radiusFlag = that.data.radiusFlag ? false : true;
     that.setData({
       radiusFlag: radiusFlag
     })
   },
   //提示取消按钮
   hideAllBtn() {
     this.setData({
       xsFlag: false,
       ptFlage: false,
       mengbanFlage: false,
       customFlag: false,
       sharImgFlage: false,
       showCanvas: false, 
     })
   },
  //保存到相册
  saveImgBtn() {
    canvas.saveImgBtn(this)
  },
    //点击分享图片
  showCanvasBtn:function(){
    var red_data = this.data.goods_info
    // 加个判断，如果is_red == 0,调用原来的，如果为1，调用redShare
    if (red_data.is_red == 0) {
      var changeData = canvas.drawCanvas(this.data);
    } else {
      var changeData = canvas.redShare(this.data);
    }

    if (!changeData){
      changeData = { imgCreatFn: 0, saveAlbum:false }
    }
    this.setData({
      showCanvas: true,
       imgCreatFn: changeData.imgCreatFn ,
       saveAlbum: changeData.saveAlbum
    })
  },
  endTimeBtn(e){
    var startTime = this.data.startTime;
     var endTime =  canvas.endTimeBtn(e);
    var time = Number(endTime) - Number(startTime);
    if (time > 500) {
  canvas.saveImgBtn(this)
    } else {
      this.hideAllBtn()
    }
  },
  // saveImgBtn(){
  //  canvas.saveImgBtn(this)
  // },  
  startTimeBtn(e){
    var startTime =canvas.startTimeBtn(e)
    this.setData({
      startTime: startTime
    })
  },
  
  hideCanvas() {
    this.setData({ showCanvas: false, xsFlag: false,})
  },
  // 点击分享赚现金红包按钮
  share_btn: function () {
    this.setData({
      xsFlag: false,
      mengbanFlage: true
    })
  },
  // 点击我知道了
  share_packget_Know: function () {
    this.setData({
      xsFlag: false,
      showCanvas: false,
    })
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    var that = this;
    var goods_info = that.data.goods_info;
    var store_info = that.data.store_info;
    var user_info = that.data.user_info;
    var goods_id = goods_info.goods_id || 0;
    var store_id = store_info.store_id || 0;
    var user_id = user_info.user_id || 0;
    var group_id = 0;
    let imgUrl =goods_info.goods_slide[0];
    let pay_info = this.data.pay_info;
    let joinnum = Number(goods_info.joinnum) >= 3 ? 3 : Number(goods_info.joinnum);
    let reduce_price = Number(goods_info.reduce_price);
    let goods_price = Number(goods_info.goods_price)
    let shareTxt = '超值！' + pay_info.pay_type + ':' + (Number(pay_info.pay_fee)).toFixed(2) + '元';
    // for (let i = 2; i <= joinnum; i++) {
    //     shareTxt += '/' + i + '人价' + ((goods_price * 100) - ((reduce_price * 100) * (i - 1))) / 100 + '元'
    // }
    if (this.data.group_info) {
      group_id = this.data.group_info.group_id ;
    }
    var goods_name = '神秘商品';
    if (goods_info.goods_name) {
      goods_name = goods_info.goods_name
    }
    let url = '/pages/goodsInfo/goodsGroup/goodsGroup?store_id=' + store_id + "&goods_id=" + goods_id + "&group_id=" + group_id + "&m=" + user_id;
    console.log(url)
    return {
      title: shareTxt + goods_name + '【' + store_info.store_name + '】',
      path: url,
      imageUrl: imgUrl,
    }
    
  },
  //自主注册
  regis(){
    var store_id = this.data.store_info.store_id || wx.getStorageSync("store_id") 
    regis.register(store_id)
  },
  //监听页面滚动
  onPageScroll: function (scrollTop) {
    var _that = this, _d = _that.data;
    _that.setData({ shakeFlag: 0 })
    clearInterval(interval);
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    animation.translateX(_d.animationX).step();
    _that.setData({
      animation: animation.export()
    })
    interval = setInterval(function () {
      animation.translateX(0).step();
      _that.setData({
        animation: animation.export(),
        shakeFlag: 1
      })
      clearInterval(interval);
    }, 1000);
  },
  myselect: function (e) {

    var index = e.detail.index;
    this.setData({
      activeIndex: index
    })
  }


 
   }));
   