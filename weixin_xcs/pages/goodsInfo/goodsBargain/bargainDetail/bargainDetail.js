// pages/goodsInfo/goodsBargain/bargainDetail/bargainDetail.js

const A = getApp();
let animationInterval;
let interval;
  
let intervalScroll;
Page(A.assignPage({
  /**
   * 页面的初始数据
   */
  data: {
    showCanvas:false,
    is_group:6,
    bargainOld_id:0,
    imgLoadNewArr: [],
    shareImageUrl: "", //分享图片路径
    rotate: true, //音乐播放状态吗默认播放
    progress: 0, //进度条百分比
    bargain_id: 1, // 砍价活动id
    bargain_detail: {}, //页面数据
    bargain_timeFlag: true, //倒计时状态
    bargain_bottom_text: "邀请好友帮忙砍",
    music_id: {}, //音乐url
    allBargainInfoLoop: {}, //顶部需要实时刷新的数据
    allBargainInfoLoopOld: {}, //刮奖实时数据展示
    bargainList: [], //亲友团列表
    bargain_footer_text: "我也要砍价",
    bargain_status2_money: {},
    goods_id: 1,
    bargain_money: 0, //砍价金额

    /* 
      //砍价页面一共八种情况：1.发起者进入砍价页面,并且必须砍刀底价，并且没有砍到底价，未支付
                            2.发起者不需要砍到底价，并且未支付
                            3.发起者必修要看砍刀底价，并且已经砍到底价，并且未支付
                            4.发起者支付成功
                            5.参与者没有帮助砍过，并且没有砍到底价，并且未支付
                            6.参与者已经砍过，未砍到底价，并且未支付
                            7.参与者  1.需要砍到底价并且已经砍到底价并且未支付 2.不需要砍到底价，已支付
                            8.过期
    */
    bargain_status: 1,
    bargain_status_page: {
      1: {
        bargain_detail_top_text_classType: 1, //1：左右布局，2：一行布局
        bargain_detail_top_text: '', // 文字q
        bargain_detail_bot_text_classType: 2,//1：左右布局，2：一行布局红底 3.一行布局灰底 4 左右布局灰底
        bargain_detail_bot_text_isShare:1,//默认分享
        bargain_detail_bot_text_funcName:"",//方法名
        bargain_detail_bot_text: "邀请好友帮忙砍",// 文字q
        bargain_detail_footer_text_classType:2,//有icon图标
        bargain_detail_footer_text_colorType: 2,//1红色 2.灰色 3.黄色
        bargain_detail_footer_text:"已报名砍价",
        bargain_detail_footer_funcName: "",//执行方法
       

      },
      2: {
        bargain_detail_top_text_classType: 1, //1：左右布局，2：一行布局
        bargain_detail_top_text: '', // 文字q
        bargain_detail_bot_text_classType: 2,//1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 1,//默认分享
        bargain_detail_bot_text_funcName: "",//方法名
        bargain_detail_bot_text: "邀请好友帮忙砍",// 文字q
        bargain_detail_footer_text_classType: 2,//有icon图标
        bargain_detail_footer_text_colorType: 1,//1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "已报名砍价",//页脚显示文字
        bargain_detail_footer_funcName: "goBuy",//执行方法

      },
      3: {
        bargain_detail_top_text_classType: 1, //1：左右布局，2：一行布局
        bargain_detail_top_text: '', // 文字q
        bargain_detail_bot_text_classType: 1, //1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 0, //默认分享
        bargain_detail_bot_text_funcName: "helpFriendBargain", //方法名
        bargain_detail_bot_text: "帮好友砍一刀", // 文字q
        bargain_detail_footer_text_classType: 1, //有icon图标
        bargain_detail_footer_text_colorType: 3, //1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "我也要砍价",
        bargain_detail_footer_funcName: "goBargainDetail", //执行方法
      },
      4: {
        bargain_detail_top_text_classType: 1, //1：左右布局，2：一行布局
        bargain_detail_top_text: '', // 文字q
        bargain_detail_bot_text_classType: 4, //1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 0, //默认分享
        bargain_detail_bot_text_funcName: "", //方法名
        bargain_detail_bot_text: "已帮忙砍价", // 文字q
        bargain_detail_footer_text_classType: 1, //有icon图标
        bargain_detail_footer_text_colorType: 3, //1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "我也要砍价",
        bargain_detail_footer_funcName: "goBargainDetail", //执行方法
      },
      5: {
        bargain_detail_top_text_classType: 2, //1：左右布局，2：一行布局
        bargain_detail_top_text: '恭喜您，已砍到底价', // 文字q
        bargain_detail_bot_text_classType: 2,//1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 0,//默认分享
        bargain_detail_bot_text_funcName: "goBuy",//方法名
        bargain_detail_bot_text: "",// 文字q
        bargain_detail_footer_text_classType: 2,//有icon图标
        bargain_detail_footer_text_colorType: 1,//1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "",
        bargain_detail_footer_funcName: "goBuy",//执行方法
      },
      6: {
        bargain_detail_top_text_classType: 2, //1：左右布局，2：一行布局
        bargain_detail_top_text: '好友已砍价成功', // 文字q
        bargain_detail_bot_text_classType: 2, //1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 0, //默认分享
        bargain_detail_bot_text_funcName: "goBargainDetail", //方法名
        bargain_detail_bot_text: "我也要砍价", // 文字q
        bargain_detail_footer_text_classType: 1, //有icon图标
        bargain_detail_footer_text_colorType: 3, //1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "我也要砍价",
        bargain_detail_footer_funcName: "goBargainDetail", //执行方法
      },
      7: {
        bargain_detail_top_text_classType: 2, //1：左右布局，2：一行布局
        bargain_detail_top_text: '购买成功', // 文字q
        bargain_detail_bot_text_classType: 2, //1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 0, //默认分享
        bargain_detail_bot_text_funcName: "goBargainDetail", //方法名
        bargain_detail_bot_text: "查看订单详情", // 文字q
        bargain_detail_footer_text_classType: 2, //有icon图标
        bargain_detail_footer_text_colorType: 1, //1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "查看订单详情",
        bargain_detail_footer_funcName: "goBargainDetail", //执行方法
      },
      8: {
        bargain_detail_top_text_classType: 1, //1：左右布局，2：一行布局
        bargain_detail_top_text: '', // 文字q
        bargain_detail_bot_text_classType: 3, //1：左右布局，2：一行布局红底 3.一行布局灰底
        bargain_detail_bot_text_isShare: 0, //默认分享
        bargain_detail_bot_text_funcName: "", //方法名
        bargain_detail_bot_text: "活动已过期", // 文字q
        bargain_detail_footer_text_classType: 2, //有icon图标
        bargain_detail_footer_text_colorType: 2, //1红色 2.灰色 3.黄色
        bargain_detail_footer_text: "活动已过期",
        bargain_detail_footer_funcName: "", //执行方法
      },


    },
    showMengbanModal: false, //蒙版默认不显示
    showResult: false, // 显示砍价结果
    animationArr: [],
    recommend_id:0
  },
/** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     var rate =  getCurrentPages();
     console.log(rate)
      if (rate[rate.length - 2].route == "pages/goodsInfo/goodsBargain/goodsBargain") {
          
          this.setData({
              rec_datas: rate[rate.length - 2].data.recommend
          })
      }
    var recommend_id;
    if (options.recommend_id){
      this.setData({
        recommend_id: options.recommend_id
      })
    }
    var sharerId
    if (options.recommend_id){
      this.setData({
        sharerId: options.recommend_id
      })
    }
    var goods_id;

    var bargain_id ;
    if (options.goods_id){
      this.setData({
        goods_id: options.goods_id
      })

      goods_id = options.goods_id;
    }
    if (options.bargain_id == -1) {
      this.addBargainGood(goods_id, this.data.sharerId);
    } else {
      if (options.bargain_id) {
        bargain_id = options.bargain_id;
      }
      this.getBargainDetail(options.bargain_id);
      // 获取音乐id
      this.getMusicId(options.bargain_id);
      // 获取实时刷新 
      this.allBargainInfoLoop(options.bargain_id);

      A.setInterval("freeTop", () => {
        this.allBargainInfoLoop(options.bargain_id);
      }, 5000);
      // 获取分享图片

      this.setData({
        bargain_id: bargain_id
      })
    }
    // 下载图片
    this.downloadImg();

    wx.getSystemInfo({
      success: (res) => {
        var pageW = Number(res.windowWidth);
        var pageH = Number(res.windowHeight);
        var canvasW = Number(res.windowWidth) * 92 / 100;
        var canvasH = canvasW * 1.438;
        var rate = Number(res.windowWidth) / 375

        this.setData({
          animationX: res.screenWidth / 750 * 200,

          scrollTopH: res.screenWidth / 750 * 92,
          pageW: pageW,
          pageH: pageH,
          rate: rate,
          canvasW: canvasW,
          canvasH: canvasH,
          bHeight: res.windowHeight
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //创建音乐
    var audioCtx = wx.createAudioContext('myMusic')
    audioCtx.play();
    this.setData({
      audioCtx: audioCtx
    })
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    this.setData({
      animation: animation
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    A.clearInterval('accdown');
    A.clearInterval('freeTop');
    this.setData({
      showMengbanModal: false
    });
    this.data.audioCtx.pause();
    this.selectComponent('#vwx-music').onHide()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    A.clearInterval('accdown');
    A.clearInterval('freeTop');
    this.setData({
      showMengbanModal: false
    });
    this.data.audioCtx.pause();
    this.selectComponent('#vwx-music').onHide()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  // 获取手机号
  getPhoneNumber: function(e) {
    A.updata.getPhoneNumber(e.detail.encryptedData, e.detail.iv).then(res => {

    })
  },
  // 活动倒计时
  acountDown: function(surplus_time) {
    if (!surplus_time) {
      return
    }
    var bargain_time = surplus_time;
    if (bargain_time <= 0) {
      this.setData({
        bargain_bottom_text: "活动已过期",
        bargain_footer_text: "活动已过期",
        bargain_timeFlag: false,
        bargain_time: {
          d: "00",
          h: "00",
          m: "00",
          s: "00"
        }
      })
    } else {
      A.setInterval("accdown", (id) => {
        var period_time = A.rtime(bargain_time - id.count);
        if (!(period_time.s == 0 && period_time.m == 0 && period_time.h == 0)) {
          this.setData({
            bargain_time: period_time,
          })
        } else {
          A.clearInterval('accdown')
          this.setData({
            bargain_timeFlag: false,
            bargain_time: period_time,
            bargain_bottom_text: "活动已过期",
            bargain_footer_text: "活动已过期",
          })
        }
      })

    }
  },
  //拨打电话
  Callphone: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.bargain_detail.telephone,
    })
  },
  // 门店点击效果
  storeClick(e) {
    var latitude = Number(this.data.bargain_detail.latitude);
    var longitude = Number(this.data.bargain_detail.longitude);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    })
  },
  // 获取音乐id
  getMusicId: function(bargain_id) {
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.getMusicId(bargain_id).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          music_id: res.url
        })
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }
    }, err => {
      wx.hideLoading();
      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 帮好友砍一刀

  helpFriendBargain: function (){
    var bargain_id = this.data.bargain_id;
    wx.showLoading({ title: '加载中...', })
    A.updata.helpFriendBargain(bargain_id).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          bargain_id: res.id,
          bargain_money: res.cutMoney,
          showMengbanModal: true
        })
        this.showAnimation();
        this.getBargainDetail(bargain_id);
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }
    }, err => {
      wx.hideLoading();
      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 顶部实时查询

  allBargainInfoLoop: function (bargain_id){
    var bargain_id ;
    if (this.data.bargainOld_id !=0){
      bargain_id = this.data.bargainOld_id
    }

    A.updata.allBargainInfoLoop(bargain_id).then(res => {

      if (res.status == A.STATE.STATUS.OK) {

        var nick_name;
        if (res.data.nick_name) {
          nick_name = (res.data.nick_name).substring(0, 4);
        }

        this.setData({
          scroll: 1,
          allBargainInfoLoop: res.data,
          "allBargainInfoLoop.nick_name": nick_name || '',
          bargainOld_id:res.data.bargain_id
        })
        var nick_nameO;
        if (res.data.nick_name) {
          nick_nameO = (this.data.allBargainInfoLoop.nick_name).substring(0, 4);
        }

        var timeout = setTimeout(() => {

          this.setData({
            scroll: 0,
            allBargainInfoLoopOld: this.data.allBargainInfoLoop,
            "allBargainInfoLoopOld.nick_name": nick_nameO || '',
            allBargainInfoLoop: {},
          })
          clearTimeout(timeout);
        }, 1000)
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }
    }, err => {

      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 获取砍价页面数据
  getBargainDetail: function(bargain_id) {
    wx.showLoading({
      title: '加载中...'
    });
    A.updata.getBargainDetail(bargain_id).then(res => {
      var bargain_status;
      var bargain_status2_money;
      wx.hideLoading();
      if (res.status == 1) {
        var bargain_detail = res.info;
        // var bargain_detail = this.data.bargain_detail;
        // 进度条
   
        var progress = Number(res.info.cut_amount) / (Number(res.info.cut_amount) + Number(res.info.surplus_money)) * 100;
      
        //页面状态判断
        if (bargain_detail.surplus_time <= 0) {
          bargain_status = 8;
        }
        if (bargain_detail.now_people== 1){
          if (bargain_detail.status == 1 && bargain_detail.is_pay == 0   ){
              bargain_status = 5;
            }
          if (bargain_detail.is_bottom == 0 && bargain_detail.is_pay == 0 && bargain_detail.status == 0) {
            bargain_status = 2;
          }
          if (bargain_detail.is_bottom == 1 && bargain_detail.status == 0) {
            bargain_status = 1;
          }
          if (bargain_detail.is_pay == 1) {
            bargain_status = 7;
          }
        } else {
          if (bargain_detail.is_pay == 0 && bargain_detail.status == 0 && bargain_detail.is_bargain == 0) {
            bargain_status = 3;
          }  
          if (bargain_detail.is_pay == 0 && bargain_detail.status == 0 && bargain_detail.is_bargain == 1) {
            bargain_status = 4;
          }  
          if (bargain_detail.status == 1 || bargain_detail.is_pay == 1) {
            bargain_status = 6;
          }  
        }
        if (bargain_status == 2) {
          bargain_status2_money = (parseFloat(bargain_detail.reserve_price) + parseFloat(bargain_detail.surplus_money)).toFixed(2)
          this.setData({
            bargain_status2_money: bargain_status2_money
          })
        }

        this.setData({
          bargain_detail: bargain_detail,
          progress: progress,
          bargain_status: bargain_status,
          bargainList: bargain_detail.friends_rank,
          bargain_id: bargain_id
        })

        // 倒计时
        this.acountDown(bargain_detail.surplus_time);

        // 亲友团滚动
        this.listBargain(bargain_detail.friends_rank);
        // 獲取分享圖片
        this.getShareImage(bargain_detail.bargain_id, bargain_detail.goods_id);
      } else {

        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }
    }, err => {
      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 滚动亲友团
  listBargain: function(list) {
    var setTimeOutAcc = setTimeout(() => {
      if (list.length > 4) {
        let length = list.length; //列表长度
        let bargainList = list.concat(list);
        this.setData({
          bargainList: bargainList
        });
        let heightScroll = length * this.data.pageW * 108 / 375;

        intervalScroll = setInterval(() => {
          let top = 0;
          if (this.data.top < heightScroll) {
            top = this.data.top + 0.5;
          }
          this.setData({
            top: top
          })
        }, 30)
      }
      clearTimeout(setTimeOutAcc)
    }, 3000)
  },
  // 新增一个bargain_id
  addBargainGood: function (goodsId, sharerId) {
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.addBargainGood(goodsId, this.data.sharerId).then(res => {

      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        // 显示动画首张图片
        this.showAnimation();

        this.setData({
          bargain_id: res.id,
          bargain_money: res.money
        })
        this.getBargainDetail(res.id);
        // 获取音乐id
        this.getMusicId(res.id);
        // 获取实时刷新 
        this.allBargainInfoLoop(res.id);
        A.setInterval("freeTop", () => {
          this.allBargainInfoLoop(res.id);
        }, 5000);

        this.setData({
          showMengbanModal: true
        })
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false,
          success:function(res){
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
           
          }
        })

      }
    }, err => {
      wx.hideLoading();
      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 获取分享图片
  getShareImage: function (bargain_id, goods_id) {
    wx.showLoading({ title: '加载中...', })
    A.updata.getShareImage(bargain_id,goods_id).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          shareImageUrl: res.url
        })
        this.getShareImages()
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }
    }, err => {
      wx.hideLoading();
      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 去砍价详情页面
  goBargainDetail: function(e) {

    A.G("/pages/goodsInfo/goodsBargain/goodsBargain?goods_id=" + e.currentTarget.dataset.goods_id)
  },
  // 去购买页面
  goBuy: function(e) {
    // A.G("redirectTo:///pages/buy/buy?bargin_id=" + this.data.bargain_id + "&goods_id=" + e.currentTarget.dataset.goods_id + "&recommend_id=" + this.data.recommend_id)
      var recData = this.data.rec_datas
      console.log(recData)
      var rec = JSON.stringify(recData)
    //   var rec = JSON.stringify(recData)
    //   console.log(rec)
      // A.G("navigateTo:///pages/buy/buy?goods_id=" + this.data.goods_id + "&type=0" + "&recommend_id=" + this.data.recommend_id);
      wx.navigateTo({
          url: '/pages/buy/buy?bargin_id=' + this.data.bargain_id + '&goods_id=' + this.data.goods_id + '&type=0' + '&recommend_id=' + this.data.recommend_id + '&recData=' + rec,
      })
  },
  // 去门店
  goMyindex: function() {
    A.G("/pages/myStore/index?store_id=" + this.data.bargain_detail.store_id)
  },
  // 隐藏弹窗
  cancel: function() {
    this.setData({
      showMengbanModal: false,
      showResult: false,
      showCanvas: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var user_id = this.data.bargain_detail.user_id
    var wx_name = this.data.bargain_detail.storename;
    var url = "/pages/goodsInfo/goodsBargain/bargainDetail/bargainDetail?bargain_id=" + this.data.bargain_id + "&goods_id=" + this.data.bargain_detail.goods_id + "&recommend_id=" + this.data.bargain_detail.user_id
    console.log(url)
    var imgUrl = this.data.bargain_detail.goods_slide
    return {
      title: "超值！底价" + this.data.bargain_detail.reserve_price + "元！帮忙砍一下！商品名称【" + wx_name + " 】",
      path: url,
      imageUrl: imgUrl,
    }
  },

  //点击分享图片
  showCanvasBtn: function () {
    var changeData = this.drawCanvas(this.data);
    if (!changeData) {
      changeData = { imgCreatFn: 0, saveAlbum: false }
    }
    this.setData({
      showCanvas: true,
      showMengbanModal: true,
      imgCreatFn: changeData.imgCreatFn,
      saveAlbum: changeData.saveAlbum
    })
  },
 
  endTimeBtn(e) {
    var startTime = this.data.startTime;
    var endTime = e.timeStamp;
    var time = Number(endTime) - Number(startTime);
    if (time > 500) {
      this.saveImgBtn(this.data)
    } else {
      this.hideAllBtn()
    }
  },
  saveImgBtn() {
    this.saveImgBtn(this.data)
  },
  startTimeBtn(e) {
    var startTime = e.timeStamp
    this.setData({
      startTime: startTime
    })
  },

  // 分享活动所需图片
  getShareImages: function() {
    //  分享页面准备
    if (!this.data.imgLoadNewArr[0]) {
      let imgLoadArr = [
        this.data.bargain_detail.goods_slide,
        this.data.bargain_detail.storelogo,
        this.data.shareImageUrl,
        'https://www.pintuanqu.cn/Public/WeChatApps/image/store_share_ico.png'
      ];
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
            } else {}
          },
          complete: res => {
            wx.hideLoading()

          },
        });
      }
    }
  },

  /**
   * 动画
   */
  // 下载图片
  downloadImg: function() {
    let _that = this, _d = _that.data;
    return new Promise((resolve, reject) => {
      let count = 0,
        animationArr = this.data.animationArr;
      for (let i = 0; i < 23; i++) {
        let url = 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/sequence' + (i + 1) + '.png';
        if (animationArr[i] && animationArr[i].indexOf('wxfile://tmp') > -1) {
          count++;
        } else {
          wx.downloadFile({
            url: url,
            success: function(res) {
              if (res.statusCode == 200) {
                count++;
                animationArr[i] = res.tempFilePath;
                _that.setData({ animationArr: animationArr})
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
      var interval = setInterval(() => {
        if (count == 23) {
          clearInterval(interval);
          resolve();
        }
      }, 100)
    })
  },
  // 显示砍价图片
  showAnimation: function() {
    this.drawImg(0);
  },
  // 点击开始动画
  startAnimation: function() {
    var _that = this,
      _d = _that.data;
    _that.setData({
      startAnimation: true
    });
    let count = 1;
    animationInterval = setInterval(() => {
      _that.drawImg(count).then(res => {
        if (count >= _d.animationArr.length - 1) {
          let tempInterval = setInterval(() => {
            _that.setData({
              showResult: true
            });
            clearInterval(tempInterval);
          }, 200);
          clearInterval(animationInterval);
        } else {
          count++;
        }
      });
    }, 100)
  },
  // 绘制canvas
  drawImg: function(i) {
    let _that = this, _d = _that.data;
    // console.log(_d.animationArr[i]);
    if(_d.animationArr[i]){
      let rate = this.data.rate;
      return new Promise((resolve, reject) => {
        let ctx = wx.createCanvasContext('animation', this);
        ctx.beginPath();
        ctx.drawImage(_d.animationArr[i], 0, 0, 375 * rate, 517 * rate);
        ctx.draw(true);
        // console.log(1);
        resolve();
        return;
      })
    }else{
      let waiter = setInterval(() => {
        clearInterval(waiter);
        _that.drawImg(i);
      }, 100)
    }
  },
  //提示取消按钮
  hideAllBtn() {
    this.setData({
      showCanvas: false,
      showMengbanModal: false
    })
  },
  // 分享图片
  drawCanvas: function(data) {
    this.getShareImages();
    let bargain_detail = data.bargain_detail;
    let rate = data.rate;
    let imgLoadNewArr = data.imgLoadNewArr;
    let goods_name = bargain_detail.goods_name.length > 18 ? bargain_detail.goods_name.substring(0, 18) + '...' : bargain_detail.goods_name;
    let store_name = bargain_detail.storename.length > 9 ? bargain_detail.storename.substring(0, 9) + '...' : bargain_detail.storename;
    let canvasTimes = data.canvasTimes;
    var canvasW = data.canvasW;
    var canvasH = data.canvasH;
    let nameLen = this.lengS(bargain_detail.wx_name);
    let storeLen = this.lengS(store_name);
    let ctx = wx.createCanvasContext('sharingActivities')
    let FontSize = canvasW / ((375 * 95) / 100);
    // 图片缓存
    if (!imgLoadNewArr[2] || !imgLoadNewArr[0] || !imgLoadNewArr[1] || !imgLoadNewArr[3]) {

      wx.showLoading({
        title: '素材加载中...',
      })
      var imgCreatFn = setInterval(() => {
        if (data.imgLoadNewArr[2] && data.imgLoadNewArr[0] && data.imgLoadNewArr[1] && data.imgLoadNewArr[3]) {
          clearInterval(data.imgCreatFn)
          wx.hideLoading()
        }
      }, 100)
      return
    }

    //1. banner部分
    ctx.setGlobalAlpha(1)
    ctx.fillRect(0, 0, canvasW, canvasW / 1.5);
    ctx.drawImage(imgLoadNewArr[0], 0, 0, canvasW, canvasW / 1.5);
    ctx.setFillStyle("#000000");
    ctx.setFillStyle("#ffffff");
    ctx.fillRect(0, canvasW * 0.833, canvasW, canvasW * 0.6);
    // 店铺名称
    ctx.setFillStyle("#000000");
    ctx.setGlobalAlpha(0.3);
    ctx.fillRect(0, (canvasW / 1.5) - (canvasW * 0.1), canvasW, canvasW * 10 / 100);
    ctx.setGlobalAlpha(1)
    ctx.setFillStyle("#ffffff");
    ctx.drawImage(imgLoadNewArr[3], 10 * rate, ((canvasW / 1.5) - (canvasW * 0.1)) + 7 * rate, 20 * rate, 20 * rate);
    ctx.setFontSize(14 * rate);
    ctx.setFillStyle("#ffffff");
    ctx.fillText(store_name, 40 * rate, ((canvasW / 1.5) - (canvasW * 0.1)) + 23 * rate, 200 * rate);
    // 2. 活动信息
    ctx.setFillStyle("#e60012");
    ctx.fillRect(0, canvasW / 1.5, canvasW, canvasW * 0.167);
    ctx.setFillStyle("#ffffff");
    ctx.fillText(goods_name, 10 * rate, canvasW / 1.5 + 20 * rate);
    ctx.fillText('底价：¥' + bargain_detail.reserve_price, 10 * rate, canvasW / 1.5 + 46 * rate);
    // 原价
    ctx.fillText('原价：¥' + bargain_detail.original_price, 140 * rate, canvasW / 1.5 + 46 * rate);

    ctx.fillRect(190 * rate, canvasW / 1.5 + 40 * rate, (((Number(bargain_detail.original_price.length)) * 9 * canvasTimes * FontSize) + 10) * canvasTimes * FontSize, 1 * canvasTimes);
    // 3.二维码

    ctx.save();
    ctx.beginPath();
    ctx.arc((canvasW * 28.4) / 100, canvasW * 0.94, 20 * rate, 0, 2 * Math.PI);
    ctx.setStrokeStyle('#ffffff')
    ctx.clip();
    ctx.drawImage(imgLoadNewArr[1], ((canvasW * 28.4) / 100) - 20 * rate, canvasW * 0.94 - 20 * rate, 40 * rate, 40 * rate);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.setFontSize(15 * rate);
    ctx.setFillStyle("#333333");
    ctx.fillText(bargain_detail.wx_name + '已经入手', (canvasW * 37) / 100, canvasW * 0.94 + 5 * rate, (canvasW * 60) / 100);
    ctx.setFontSize(21 * rate);

    ctx.setFillStyle("#FF1729");
    ctx.fillText('喊你一起帮忙砍价!', (canvasW * 25) / 100, canvasW + 25 * rate);
    ctx.drawImage(imgLoadNewArr[2], ((canvasW * 34) / 100), canvasW + 40 * rate, 100 * rate, 100 * rate);
    ctx.setFillStyle("#666666");
    ctx.setFontSize(14 * rate);
    ctx.fillText('长按识别二维码', ((canvasW * 34) / 100) + 112 * rate, canvasW + 25 * rate + 107 * rate);

    ctx.draw()
    return { imgCreatFn: imgCreatFn || 0, saveAlbum: true }
  }, lengS: function (str) {
    var nameLen = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
        nameLen += 2;
      } else {
        nameLen++;
      }
    }
    return nameLen
  },
  saveImgBtn: function (data) {
    var that = this

    let canvasTimes = data.canvasTimes;
    wx.showLoading({
      title: '保存中...',
    })
    let canvasW = Number(data.canvasW);
    let canvasH = Number(data.canvasH);
    wx.canvasToTempFilePath({
      x: 0 * canvasTimes,
      y: 0 * canvasTimes,
      width: canvasW * canvasTimes,
      height: canvasH * canvasTimes,
      canvasId: 'sharingActivities',
      fileType: 'png',
      success: res => {
        let img = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: img,
          success: res => {
            wx.showModal({
              title: '温馨提示',
              content: A.information.SAVEIMGSUCESS,
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  this.setData({
                    showCanvas: false,
                    showMengbanModal: false

                  })
                }
              }
            })
          },
          fail(res) {
            wx.getSetting({
              success(res) {

                if (!res.authSetting['scope.writePhotosAlbum']) {
                  A.showTipModal(A.information.OPENIMGPERMISSION, () => {   //是否前往开启保存图片权限?
                    A.G("reLaunch:///pages/nearShopList/wsq/wsq");
                  })
                }
              }
            })
          },
          complete() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  // 去个人中心
  goIndex: function () {
    A.G('switchTab:///pages/index')
  }
}))