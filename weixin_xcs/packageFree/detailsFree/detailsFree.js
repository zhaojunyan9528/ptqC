// packageFree/detailsFree /detailsFree.js
const A = getApp();
var regis = require("../../pages/goodsInfo/register.js");
let interval;
let animationInterval;
let intervalScroll;
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    showCanvas: false,//显示画布
    rotate: true,
    showScratchModal8:false,
    animationData1:{},
    animationData:{},
    shareBoxFlag:false,
    startTran: false,
    canvasTimes: 1,
    isSrollFlag: 0,//战绩数量小于4，不滚动
    isClickFree: false,//刮奖弹窗是否显示
    musicFlag: 0,
    isShare: 0,//為分享
    initiator_id: 0,
    is_group:5,
    loading: false,
    countEndFlag: true,//活動是否結束
    freeDeta: {},//刮奖详情数据
    isShowPage: true,//是否显示页面初始状态
    freeTop: {},//刮奖实时数据展示
    goldPool: [],//奖金池
    freeTopOld: {},//刮奖实时数据展示
    end_time: 10,
    part_num: 0,//奖金池参与人数
    audioCtx: {},
    stopMusic: true,
    showScratchModal: false,//显示刮奖弹窗
    recordAcount: {
     
    },
    part_id: 0,
    scroll: 0,
    heightScroll: 0,
    // srollTime:0
    top: 0,
    animationFlag: 0,//是否请求动画0 否  1：是
    // isJump: false,
    isPhone: false,//未收集
    Hint: '',
    inputPlaceholder: '输入手机号码',
    imgLoadNewArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var initiator_id = options.initiator_id;
    this.setData({
      initiator_id: initiator_id
    })
    this.acountDown(); // 活动倒计时
    this.getFreeTop(this.data.part_id);// 刮奖免单页面顶部轮询
    // this.topScroll();
    //获取手机的可用宽高
    wx.getSystemInfo({
      success: (res) => {
        var canvasW = Number(res.windowWidth) * 92 / 100;
        var canvasH = canvasW * 1.438;
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
    });
    // this.userHasPhone();
  },
  // //是否收集过用户手机号
  // userHasPhone: function () {
  //   A.updata.userHasPhone().then(res => {
  //     if (res.status == A.STATE.STATUS.OK) {
  //       if (res.data > 0) {
  //         this.setData({
  //           isPhone: true
  //         })
  //       } else {
  //         this.setData({
  //           isPhone: false
  //         })
  //       }
  //     } else {
  //       A.showTipModal(res.info || A.information.DATAFAIL);
  //     }
  //   }, err => {
  //     A.showTipModal(err.info || A.information.DATAFAIL);
  //   })
  // },
  // //提交手机号
  // conmitPhnoe: function (storeId, telephone) {

  //   A.updata.conmitPhnoe(storeId, telephone).then(res => {
  //     if (res.status == A.STATE.STATUS.OK) {
  //       this.setData({
  //         isPhone: true,
  //         isClickFree: true
  //       })
  //     } else {
  //       A.showTipModal(res.info || A.information.DATAFAIL);
  //     }
  //   }, err => {
  //     A.showTipModal(err.info || A.information.DATAFAIL);
  //   })

  // },
  //监控input输入
  // bindblur: function (e) {
  //   var telephone = e.detail.value
  //   if (telephone.length == 11) {
  //     this.setData({
  //       telephone: telephone,
  //       isJump: true
  //     })

  //   } else if (telephone.length == 0) {
  //     this.setData({
  //       Hint: '手机号不可为空'
  //     })
  //   } else {
  //     this.setData({
  //       Hint: A.information.WRONGPHONE
  //     })
  //   }
  // },

  //开始音乐
  bindplay: function () {
    this.setData({
      musicFlag: 0
    })
  },
  bindpause: function () {

    this.setData({
      musicFlag: 1
    })
  },


  // 活动倒计时
  acountDown: function () {
    var bonus_time = this.data.end_time
    if (bonus_time <= 0) {
      this.setData({
        countEndFlag: false
      })
    } else {
      A.setInterval("accdown", (id) => {
        var period_time = A.rtime(bonus_time - id.count);
        if (!(period_time.s == 0 && period_time.m == 0 && period_time.h == 0)) {
          this.setData({
            bonus_time: period_time,
          })
        } else {
          A.clearInterval('accdown')
          this.setData({
            countEndFlag: false
          })
        }
      })
    }
  },
  
  //滚动战绩
  listScroll: function (list) {
    var setTimeOutAcc = setTimeout(() => {
      if (list.length > 4) {
        let length = list.length; //列表长度
        let scrollList = list.concat(list);

        this.setData({ goldPool: scrollList });
        let heightScroll = length * this.data.pageW * 117.5 / 375;  //列表高度

        intervalScroll = setInterval(() => {
          let top = 0;
          if (this.data.top < heightScroll) {
            top = this.data.top + 0.5;
          }
          this.setData({ top: top })

        }, 30)

      }
      clearTimeout(setTimeOutAcc)
    }, 3000)


  },


  // 获取刮奖详情
  getFreeDeal: function (id) {
    wx.showLoading({ title: '加载中...' })
    A.updata.getFreeDeal(id).then(res => {
      wx.hideLoading()
      if (res.status == A.STATE.STATUS.OK) {
				var progress = Number(res.data.bonus.get_amount) / Number(res.data.bonus.bonus_pool) * 100
        this.setData({
          freeDeta: res.data,
          progress: progress,
          end_time: res.data.bonus.valid_period
        })
      } else {
        this.setData({
          isShowPage: false
        })
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })

      }
      this.acountDown();
      this.getShareImages();
    }, err => {
      wx.hideLoading()
      wx.showModal({
        title: "溫馨提示",
        content: err.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },

  // 刮奖免单页面顶部轮询
  getFreeTop: function (part_id) {
    var that = this;
    A.updata.getFreeTop(part_id).then(res => {

      if (res.status == A.STATE.STATUS.OK) {
        var nick_name;
        if (res.data.nick_name) {
          nick_name = (res.data.nick_name).substring(0, 4);
        }

        that.setData({
          scroll: 1,
          freeTop: res.data,
          "freeTop.nick_name": nick_name || '',
          part_id: res.data.part_id
        })
        var nick_nameO;
        if (res.data.nick_name) {
          nick_nameO = (that.data.freeTop.nick_name).substring(0, 4);
        }

        var timeout = setTimeout(function () {
          that.setData({
            scroll: 0,
            freeTopOld: that.data.freeTop,
            "freeTopOld.nick_name": nick_nameO || '',
            freeTop: {},
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
        title: "溫馨提溫馨示",
        content: res.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 刮奖战绩
  getFreeRecord: function (id) {
    wx.showLoading({ title: '加载中...' })
    A.updata.getFreeRecord(id).then(res => {

      wx.hideLoading()
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          goldPool: res.data,
          part_num: res.part_num
        })
        this.listScroll(res.data);

      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }

    }, err => {
      wx.hideLoading()
      wx.showModal({
        title: "溫馨提示",
        content: res.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },

  // 刮到的奖金
  getRecordAcount: function (id) {
    wx.showLoading({ title: '加载中...' })
    A.updata.getRecordAcount(id).then(res => {
      wx.hideLoading()
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          recordAcount: res.data,
        })
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
        this.cancel()
      }
    }, err => {
      wx.hideLoading()
      wx.showModal({
        title: "溫馨提示",
        content: res.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  // 播放音乐
  stopMusic: function () {
    var stopMusic = this.data.stopMusic

    if (stopMusic) {
      this.data.audioCtx.pause()
    } else {
      this.data.audioCtx.play()
    }
    this.setData({
      stopMusic: !stopMusic
    })
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {

  },
  //自主注册
  regis() {
    var store_id = wx.getStorageSync("store_id") || this.data.store_info.store_id

    regis.register(store_id)
  },
  
  //点击刮奖按钮
  goScratch: function () {
  
      if ((this.data.freeDeta.times == 1 || this.data.freeDeta.times == 0) && this.data.countEndFlag && this.data.freeDeta.act_status == 1) {
        if (this.data.isShare == 0 && this.data.freeDeta.times == 1) {
          wx.showModal({
            title: "溫馨提示",
            content: '请您分享之后再来点击刮奖',
            showCancel: false
          })
        } else {
          this.getRecordAcount(this.data.initiator_id)
          this.setData({
            showScratchModal: true
          })
        }
      }
   
  },
  getPhoneNumber:function(e) {
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    A.updata.getPhoneNumber(encryptedData, iv).then(res => {
      if (res.status == 1) {

        this.goScratch()
      } else {
      }
    }, this.rsErr)

  }, 
  //刮獎詳情
  goFreeJi: function () {
    var is_initiator = this.data.freeDeta.is_initiator;
    var initiator_id = this.data.initiator_id
    if (is_initiator == 0) {
      A.G('/packageFree/couponList/index')
    } else {
      A.G('/packageFree/activitiDetails/index?initiator_id=' + initiator_id)
    }
  },
  //隐藏按钮
  cancel: function () {
    var initiator_id = this.data.initiator_id
    this.getFreeDeal(initiator_id);
    this.getFreeRecord(initiator_id);
    this.setData({
      showScratchModal: false,
      shareBoxFlag: false,
      "recordAcount.type": 0,
      showCanvas:false,
      isClickFree:false,
      showScratchModal8: false,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var initiator_id = this.data.initiator_id;
    this.getFreeDeal(initiator_id);
    this.getFreeRecord(initiator_id);
    A.setInterval("freeTop", () => {
      var part_id = this.data.part_id;
      this.getFreeTop(part_id);
    }, 5000)

    // 设置换行业图片宽度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          animationX: res.screenWidth / 750 * 200,
          scrollTopH: res.screenWidth / 750 * 92
        })
      }
    });
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
    //统计分享和点击次数
    this.acountShareNum(this.data.initiator_id, 2);
    this.selectComponent('#vwx-music').onShow()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    A.clearInterval('accdown');
    A.clearInterval('freeTop');
    clearInterval(intervalScroll);
    this.data.audioCtx.pause();
    this.selectComponent('#vwx-music').onHide()
  },
  //拨打电话
  Callphone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.freeDeta.store_intro.telephone,
    })
  },
  // 门店点击效果
  storeClick(e) {
    var latitude = Number(e.currentTarget.dataset.latitude);
    var longitude = Number(e.currentTarget.dataset.longitude);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    })
  },
  //刮到现金或者代金券
  freeOnclick: function () {
 
  

      this.setData({
        isClickFree: true
      })
    
  },
  //统计分享l浏览次数
  acountShareNum: function (id, type) {

    wx.showLoading({ title: '加载中...' })
    A.updata.acountShareNum(id, type).then(res => {

      wx.hideLoading()
      if (res.status == A.STATE.STATUS.OK) {
      } else {
        wx.showModal({
          title: "溫馨提示",
          content: res.info || A.information.DATAFAIL,
          showCancel: false
        })
      }
    }, err => {
      wx.hideLoading()
      wx.showModal({
        title: "溫馨提示",
        content: res.info || A.information.DATAFAIL,
        showCancel: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    A.clearInterval('accdown');
    A.clearInterval('freeTop');
    this.data.audioCtx.pause();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.getFreeDeal(this.data.initiator_id);
    this.acountShareNum(this.data.initiator_id, 1)
    this.setData({
      isShare: 1,
      shareBoxFlag: false,
      showScratchModal: false,
      isClickFree: false,
      showScratchModal8: false,

    })
    var wx_name = this.data.freeDeta.bonus.store_name;
    var url = "/packageFree/detailsFree/detailsFree?initiator_id=" + this.data.initiator_id;
    var imgUrl = "http://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/gj14.jpg";

    return {
      title: "【" + wx_name + "】" + "正在派发红包,名额有限,快来抢红包",
      path: url,
      imageUrl: imgUrl,
    }
  },

  //监听页面滚动
  onPageScroll: function (scrollTop) {
    var _that = this, _d = _that.data;
    if (scrollTop.scrollTop > 500) {
      startTran: true
    }
    if (scrollTop.scrollTop > 10) {
      clearTimeout(animationInterval);
      _that.setData({
        shakeFlag: 0,
      })
      animationInterval = setTimeout(() => {
        var animation = _that.data.animation;
        animation.translateX(_d.animationX).step();
        _that.setData({
          animationData: animation.export()
        })
        clearTimeout(interval)
        interval = setTimeout(function () {
          clearTimeout(animationInterval);
          animation.translateX(0).step();
          _that.setData({
            animationData: animation.export(),
            shakeFlag: 1
          })
          clearTimeout(interval)
        }, 1000);
        clearTimeout(animationInterval);
      }, 500)
    }
  },
  // 顯示分享盒子
  shareBox:function(){
   this.setData({
     shareBoxFlag: true,
     showScratchModal:false,
     showScratchModal8:true,
     isClickFree:false

   })
  },

  //点击分享图片
  showCanvasBtn: function () {
    var changeData = this.drawCanvas(this.data);
    if (!changeData) {
      changeData = { imgCreatFn: 0, saveAlbum: false }
    }
    this.setData({
      showCanvas: true,
      showScratchModal: false,
      imgCreatFn: changeData.imgCreatFn,
      saveAlbum: changeData.saveAlbum,
      shareBoxFlag:false
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
  getShareImages: function () {
   
    //  分享页面准备
    if (!this.data.imgLoadNewArr[0]) {
      let imgLoadArr = [
       "https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/gj34.png",
         this.data.freeDeta.bonus.wx_img,
        // "https://www.pintuanqu.cn/Public/WeChatApps/image/store_share_ico.png",
        this.data.freeDeta.qr_code,
        'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/gj35.png'
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
            } else { }
          },
          complete: res => {
            wx.hideLoading()

          },
        });
      }
    }
  },
  //提示取消按钮
  hideAllBtn() {
    this.setData({
      showCanvas: false,
      showScratchModal: false,
      showScratchModal8: false,
    })
  },
  // 分享图片
  drawCanvas: function (data) {

    let freeDeta = data.freeDeta;
    let rate = data.rate;
    let imgLoadNewArr = data.imgLoadNewArr;
    let goods_name = freeDeta.bonus.name.length > 18 ? freeDeta.bonus.name.substring(0, 18) + '...' : freeDeta.bonus.name;
    let store_name = freeDeta.bonus.store_name.length > 9 ? freeDeta.bonus.store_name.substring(0, 9) + '...' : freeDeta.bonus.store_name;
    let canvasTimes = data.canvasTimes;
    var canvasW = data.canvasW;
    var canvasH = data.canvasH;
    let nameLen = this.lengS(freeDeta.bonus.name);
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
    // ctx.setFillStyle("#000000");
    // ctx.setGlobalAlpha(0.3);
    // ctx.fillRect(0, (canvasW / 1.5) - (canvasW * 0.1), canvasW, canvasW * 10 / 100);
    // ctx.setGlobalAlpha(1)
    // ctx.setFillStyle("#ffffff");
    // ctx.drawImage(imgLoadNewArr[3], 10 * rate, ((canvasW / 1.5) - (canvasW * 0.1)) + 7 * rate, 20 * rate, 20 * rate);
    // ctx.setFontSize(14 * rate);
    // ctx.setFillStyle("#ffffff");
    // ctx.fillText(store_name, 40 * rate, ((canvasW / 1.5) - (canvasW * 0.1)) + 23 * rate, 200 * rate);
    // 2. 活动信息

    ctx.setFillStyle("#FEFAF2");
    ctx.fillRect(0, canvasW / 1.5, canvasW, canvasW * 0.167);
    ctx.setStrokeStyle('#999999')
    ctx.drawImage(imgLoadNewArr[3], 10 * rate, canvasW / 1.5 + 20 * rate, 20 * rate, 20 * rate  );
    ctx.setFontSize(14 * rate);
    ctx.setFillStyle("#000000");
    ctx.fillText(store_name, 35 * rate, canvasW / 1.5 + 36 * rate, store_name.length * 14 );
    ctx.setFillStyle("#999999");
    ctx.setFontSize(12 * rate);
    ctx.fillText("一正在派发红包", 35 * rate + store_name.length * 14 ,canvasW / 1.5 + 36 * rate, );
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
    ctx.fillText(freeDeta.bonus.wx_name + '已刮到红包', (canvasW * 37) / 100, canvasW * 0.94 + 5 * rate, (canvasW * 60) / 100);
    ctx.setFontSize(21 * rate);

    ctx.setFillStyle("#FF1729");
    ctx.fillText('喊你一起帮忙砍价!', (canvasW * 25) / 100, canvasW + 25 * rate);
    ctx.drawImage(imgLoadNewArr[2], ((canvasW * 34) / 100), canvasW + 40 * rate, 100 * rate, 100 * rate);
    ctx.setFillStyle("#666666");
    ctx.setFontSize(14 * rate);
    ctx.fillText('长按识别二维码', ((canvasW * 34) / 100) + 112 * rate, canvasW + 25 * rate + 107 * rate);

    ctx.draw()
    return { imgCreatFn: imgCreatFn || 0, saveAlbum: true }
  },
   lengS: function (str) {
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
                    showScratchModal: false,
                    showScratchModal8: false,

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
  goIndex:function(){
    A.G('switchTab:///pages/index')
  }

}))