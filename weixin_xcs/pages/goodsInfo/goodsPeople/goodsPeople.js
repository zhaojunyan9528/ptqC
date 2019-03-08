// pages/teacher/add.js
var canvas = require("../goodsGroup/canvas.js");
const fixedData = require("../../../common/fixed-data.js")
var regis = require("../register.js");
let animationInterval;
let interval
const A = getApp();
Page(A.assignPage({
  data: {
    rate: 1,
    animation: {},
    type: 0,
    radiusFlag: false,
    canvasTimes: 1,
    showCanvas: false,
    xsFlag: false,
    imgLoadNewArr: [],
    imgurl: "/assets/images/red_img.png",
    red_img: [],
    red_data_code: {},
    tabs: ['商品详情', '宝贝评价'],
    activeIndex: 0,
    goods_info: {},
    user_info: {},
    store_info: {},
    evaluate_list: [],
    recommend: {},
    goods_id: 0,
    group_id: 0,
    is_group: 3,
    recommend_people: 0,//标识，渲染推荐人信息
    // 拼团信息
    openmore: false,
    is_remind: 0,
    showAvatar: false,
    plist: [],
    plist2: [],
    vgroup: {},
    ptFlage: false,
    mengbanFlage: false,
    imgUrl: A.config.uApi.imgUrl,
    groupPlay: [{
      img: 'goods3_ico2.png',
      name: '开团或参团'
    }, {
      img: 'goods3_ico3.png',
      name: '付款'
    }, {
      img: 'goods3_ico4.png',
      name: '邀请好友参团'
    }, {
      img: 'goods3_ico15.png',
      name: '拼团成功'
    }, ],
    bHeight: 0, //窗口高度
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
    shareGroup:0,
	  is_share:0

  },
  onLoad: function(options) {
    //   this.startAnimation();
   
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
    })
    //推荐人信息
    var recommend_id;
    if (options.m) {
      recommend_id = options.m;
      this.setData({
        recommend_id: options.m,
		is_share:1
      })
    }else{
        recommend_id = A.DB.user.uid
        this.setData({
            recommend_id:recommend_id,
			is_share:0
        })
    }
    if (options.goods_id) {
      this.setData({
        goods_id: options.goods_id
      })
      if (options.group_id != "undefined" && 　options.group_id　 != null　) {

        this.setData({
          group_id: options.group_id,
          shareGroup: options.group_id,
        })
      }
      this.initData(options.goods_id)
    }
  },
  onShow() {
    // 设置换行业图片宽度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          animationX: res.screenWidth / 750 * 200
        })
      }
    });
  },
  initData: function(goods_id) {
    wx.showLoading({
      title: "加载中..."
    });
      var that = this
      var recommend_id = that.data.recommend_id
    A.updata.getMemberGoodsPeopleGroup(goods_id, this.data.group_id, recommend_id).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        //是否开启赚红包，is_red
        if (res.goods_info.is_red) {
          // 开启赚红包，下载图片
            // this.downloadImg().then(function () {
            //     that.startAnimation();

            // });
          // 开启赚红包，新增赚红包记录
          this.setData({
            tabs: ['商品详情', '赚红包记录', '宝贝评价']
          })
          // 开启赚红包，动图效果
        //   this.startAnimation();
          // 如果推荐人信息存在，判断recommend对象是否为空，不为空给个标识渲染页面
          if (res.recommend) {
			  if (Object.keys(res.recommend).length != 0 && this.data.is_share == 1) {
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
                  if (res.goods_info.is_unit  == 1&& res.recommend.is_account != "false") {
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
        var store_info = fixedData.reviseExampleShop(res.store_info)
        if (res.group_info.group_two_info) {
          for (let i = 0; i < res.group_info.group_two_info.length; i++) {
            res.group_info.group_two_info[i]['time'] = A.rtime(res.group_info.group_two_info[i]['last_time'] - 1);
          }
          this.setData({
            plist: res.group_info.group_two_info
          })

        }
        // 回车符处理
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
          store_info: store_info,
          user_info: res.user_info,
          type: res.type,
          is_remind: res.is_remind,
        })
        this.settime();

        A.updata.getEvaluateList(goods_id).then(res => {

          if (res.status == A.STATE.STATUS.OK) {
            this.setData({
              evaluate_list: res.info.evaluate_list
            })
          }
        }, err => {
          A.showTipModal(err.info)
        })
        //赚红包记录
        A.updata.getMakePackget(goods_id).then(res => {
          if (res.status == 1) {
            this.setData({
              makepacget: res.data,
            })
          }
        }, this.rsErr)
        // 生成二维码
        var is_reds = this.data.goods_info.is_red
        console.log(this.data.goods_info.is_red)
        A.updata.redCode(goods_id, 0, is_reds).then(res => {
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
      } else {
        var arr = getCurrentPages();
        if (arr[0].route == "pages/my/order/list/list") {
          wx.navigateBack({
            delta: 1
          })
        } else {
          A.showTipModal(res.info, () => {
            A.G('reLaunch:///pages/nearShopList/nearShopList')
          })
        }
      }

    }, err => {
      // 获取商品失败
      wx.hideLoading();
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

  morePeople: function() {
    wx.showLoading({
      title: '加载中...'
    })
    var _this = this
    A.updata.getPeopleGroupFive(this.data.goods_info.goods_id).then(res => {
      wx.hideLoading();
      if (res.status == 1) {
        this.setData({
          plist2: res.group_list
        });
        this.selectComponent("#groupPanelMore").open({
          title: A.information.GROUPING, //"正在拼团"
          confirmText: A.information.MAX5 //"最多显示5个团购"
        });
        this.settime2();
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.DATAFAIL)
      this.reErr
    })
  },
  onlyMFShow: function(evt) {
    wx.showLoading({
      title: '加载...',
    })
    A.updata.getPeopleGroup(evt.detail.people.group_id).then(res => {
      wx.hideLoading();
      if (res.status == 1) {
        this.setData({
          vgroup: res.info
        })

        this.selectComponent("#groupPanelMore").close();
        this.selectComponent("#groupPanel").open({
          title: res.info.head_str,
          confirmText: "参与拼团（参团价：￥" + res.info.bottom_price + "）"
        });
        this.settime3();
      }
    }, err => {
      wx.hideLoading()
      A.showTipModal(err.info || A.information.DATAFAIL)
    })
  },
  settime: function() {
    A.clearInterval("ppt");
    A.setInterval("ppt", (id) => {
      let _plist = this.data.plist;
      if (_plist.length > 0) {
        let plist = _plist.concat();
        for (let i = 0; i < plist.length; i++) {
          plist[i]['time'] = A.rtime(plist[i]['last_time'] - id.count);
        }
        this.setData({
          plist
        });
      }
    })
  },
  settime2: function() {
    A.clearInterval("ppt2");
    A.setInterval("ppt2", (id) => {
      let _plist2 = this.data.plist2;
      if (_plist2.length > 0) {
        let plist2 = _plist2.concat();
        for (let i = 0; i < plist2.length; i++) {
          plist2[i]['time'] = A.rtime(plist2[i]['last_time'] - id.count);
        }
        this.setData({
          plist2
        });
      }
    })
  },
  settime3: function() {
    A.clearInterval("ppt3");
    A.setInterval("ppt3", (id) => {
      // 选择的拼团倒计时
      if (this.data.vgroup.last_time) {
        this.data.vgroup.time = A.rtime(this.data.vgroup.last_time - id.count);

        this.setData({
          vgroup: this.data.vgroup
        })
      }
    })
  },
  showmore() {
    this.setData({
      showAvatar: true
    })
  },
  goBuy(evt) {

    if (this.data.is_remind == 1) {
      this.setData({
        customFlag: true
      })
    } else {
      var group_id = this.data.group_id;
      if (this.data.group_info.group_num < 1) {
        group_id = 0
      }
      var restriction = Number(this.data.goods_info.restriction)
      var sales = Number(this.data.goods_info.sales)

      //  if (this.data.goods_info.restriction != 0 && restriction - sales <= 0) {
      //     A.showTipModal(A.information.PURCHASE)
      //  } else {
      //     A.G("/pages/buy/buy?goods_id=" + this.data.goods_id + "&group_id=" + group_id + "&type=1");
      //  }
        // var recData = this.data.recommend
        // var rec = JSON.stringify(recData)
        // console.log(rec)
        // A.G("navigateTo:///pages/buy/buy?goods_id=" + this.data.goods_id + "&type=0" + "&recommend_id=" + this.data.recommend_id);
        wx.navigateTo({
            url: '/pages/buy/buy?goods_id=' + this.data.goods_id + '&group_id=' + group_id + '&type=0' + '&recommend_id=' + this.data.recommend_id 
        })
    }
  },
  payMoneyBox() {
    var group_id = this.data.group_id;
    var goods_id = this.data.goods_id
    if (this.data.group_info.group_num < 1) {
      group_id = 0
    }
    var restriction = Number(this.data.goods_info.restriction)
    var sales = Number(this.data.goods_info.sales)
    //是否提示不支持退款
    var is_remind = this.data.radiusFlag ? 1 : 0

    A.updata.goodsVerify(is_remind, goods_id).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        // if (this.data.goods_info.restriction != 0 && restriction - sales <= 0) {
        //    A.showTipModal(A.information.PURCHASE)
        // } else {
        //    A.G("/pages/buy/buy?goods_id=" + this.data.goods_id + "&group_id=" + group_id + "&type=1");
        // }
        A.G("/pages/buy/buy?goods_id=" + this.data.goods_id + "&group_id=" + group_id + "&type=1");
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.DATAFAIL)
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
  //  多人拼团玩法详情
  show_activity_flow: function() {
    this.setData({
      ptFlage: true,
      showTitle: true,
      mengbanFlage: true
    })
  },
  //提示取消按钮
  hideAllBtn() {
    this.setData({
      ptFlage: false,
      mengbanFlage: false,
      customFlag: false,
      sharImgFlage: false,
      showCanvas: false,
    })
  },


  //前往店铺
  storebutton: function(e) {

    var store_id = Number(e.detail)
    A.G("reLaunch:///pages/myStore/index?store_id=" + store_id);

  },
  //点击分享图片
  showCanvasBtn: function() {
    var red_data = this.data.goods_info
    // 加个判断，如果is_red == 0,调用原来的，如果为1，调用redShare
    if (red_data.is_red == 0) {
      var changeData = canvas.drawCanvas(this.data);
    } else {
      var changeData = canvas.redShare(this.data);
    }
    if (!changeData) {
      changeData = {
        imgCreatFn: 0,
        saveAlbum: false
      }
    }
    this.setData({
      showCanvas: true,
      imgCreatFn: changeData.imgCreatFn,
      saveAlbum: changeData.saveAlbum
    })
  },
  //点击图片结束时间
  endTimeBtn(e) {
    var startTime = this.data.startTime;
    var endTime = canvas.endTimeBtn(e);
    var time = Number(endTime) - Number(startTime);
    if (time > 500) {
      canvas.saveImgBtn(this)
    } else {
      this.hideCanvas()
    }
  },
  //保存到相册
  saveImgBtn() {
    canvas.saveImgBtn(this)
  },
  //点击图片开始时间
  startTimeBtn(e) {
    var startTime = canvas.startTimeBtn(e)
    this.setData({
      startTime: startTime
    })
  },
  hideCanvas() {
    this.setData({
      showCanvas: false,
      xsFlag: false,
      redFlag: false
    })
  },
  // 点击我知道了
  share_packget_Know: function () {
    this.setData({
      xsFlag: false,
      showCanvas: false,
    })
  },
  // 点击分享赚现金红包按钮
  share_btn: function () {
    this.setData({
      xsFlag: false,
      mengbanFlage: true
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

  goBuyt() {

    var group_id = this.data.vgroup.group_id || 0;
    var restriction = Number(this.data.goods_info.restriction)
    var sales = Number(this.data.goods_info.sales)

    // if (this.data.goods_info.restriction != 0 && restriction - sales <= 0) {
    //    A.showTipModal(A.information.PURCHASE)
    // } else {

    // }
    // A.G("/pages/buy/buy?goods_id=" + this.data.goods_id + "&group_id=" + group_id + "&type=1");
      var recData = this.data.recommend
      var rec = JSON.stringify(recData)
      console.log(rec)
      wx.navigateTo({
          url: '/pages/buy/buy?goods_id=' + this.data.goods_id + "&group_id=" + group_id + '&type=1' + '&recommend_id=' + this.data.recommend_id + '&recData=' + rec,
      })
    this.selectComponent("#groupPanel").cancel()

  },

  hideGroupList() {
    this.selectComponent("#groupPanelMore").cancel()
  },
  onHide: function() {
    this.setData({
      customFlag: false,
      radiusFlag: false
    })
    clearInterval(this.data.imgCreatFn)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    var that = this
    var goods_info = that.data.goods_info
    var store_info = that.data.store_info
    var user_info = that.data.user_info;
    var goods_id = goods_info.goods_id || 0
    var store_id = store_info.store_id || 0
    var user_id = user_info.user_id || 0;
    var group_id = 0
    if (this.data.group_info) {
      group_id = this.data.group_info.group_id || this.data.shareGroup
    }
    var goods_name = '拼团趣去拼团'
    if (goods_info.goods_name) {
      goods_name = goods_info.goods_name
    }
    let is_account = false
      if (that.data.recommend){
          is_account = that.data.recommend.is_account
      }
      let url = "{{ goods_info.is_unit && group_id == 0 }}" ? '/pages/goodsInfo/goodsPeople/goodsPeople?store_id=' + store_id + "&goods_id=" + goods_id + "&group_id=" + group_id + "&m=" + that.data.recommend_id : "{{goods_info.is_red}}" ? '/pages/goodsInfo/goodsPeople/goodsPeople?store_id=' + store_id + "&goods_id=" + goods_id + "&group_id=" + group_id + '&m=' + user_id : '/pages/goodsInfo/goodsPeople/goodsPeople?store_id=' + store_id + "&goods_id=" + goods_id +"&group_id=" + group_id
     console.log(url)
    let imgUrl = goods_info.goods_slide[0]
    return {
      title: '超值！秒拼价' + (Number(goods_info.bottom_price)).toFixed(2) + '元,' + goods_name + '【' + store_info.store_name + '】',
      path: url,
      imageUrl: imgUrl,
    }
  },
  //自主注册
  regis() {
    var store_id = this.data.store_info.store_id || wx.getStorageSync("store_id")
    regis.register(store_id)
  },
  //监听页面滚动
  onPageScroll: function(scrollTop) {
    var _that = this,
      _d = _that.data;
    _that.setData({
      shakeFlag: 0
    })
    clearInterval(interval);
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    animation.translateX(_d.animationX).step();
    _that.setData({
      animation: animation.export()
    })
    interval = setInterval(function() {
      animation.translateX(0).step();
      _that.setData({
        animation: animation.export(),
        shakeFlag: 1
      })
      clearInterval(interval);
    }, 1000);
  },
  myselect: function(e) {

    var index = e.detail.index;
    this.setData({
      activeIndex: index
    })
  }
}));