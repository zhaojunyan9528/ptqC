// pages/index.js
const fixedData = require("../common/fixed-data.js")
const A = getApp();
Page(A.assignPage({
  data: {
    errStore: true,
    aboutFlag: 1,//是否关注公众号，默认已关注
    storeCloseTime: 0,
    hasApplyEntry: true,
    imgUrl: A.config.uApi.imgUrl,
    bottFlag: false,
    activeIndex: 0,
    goods_list: [],
    group_list: [],
    store_info: {},
    wxAboutshow: false,//是否关注公众号
    //空白页面
    nullData1: {
      shortFlag: false,
      img: "/assets/images/n3_ico9.png",
      nearFlag: false,
      txt: A.information.NULLGROUP
    },
    nullData: {
      shortFlag: false,
      img: "/assets/images/n3_ico9.png",
      nearFlag: false,
      txt: A.information.NULLSPECIALS
    },
    //未关注公众号
    miniapps_codeTxt: [
      '点击上方二维码打开，长按保存至相册',
      '微信扫一扫，点击相册选择此图片',
      '关注公众号',
      '点击推送的店铺信息,自动关注店铺'
    ],
    store_id:0,
     tabs: ['特惠活动', '拼团立减'],

  },
  computedA: {

    // 配置全局
    cart: ['count', 'list']
  },
  onLoad: function (options) {
    var that = this

    if (options.store_id) {
      that.setData({
        store_id: options.store_id
      })
    } else if (options.scene) {
      that.setData({
        store_id: options.scene
      })
    } else if (A.reLaunchQuery){
       this.setOpt(A.reLaunchQuery);
       A.reLaunchQuery=false;
    }

  },
   setOpt(options) {
      if (options.store_id) {
         this.setData({
            store_id: options.store_id
         })
      } else if (options.scene) {
         this.setData({
            store_id: options.scene
         })
      }
   },
  onShow:function(){
    // 获取商户信息
    var that = this
    A.updata.getMember(that.data.store_id).then(res => {

      if (res.status == A.STATE.STATUS.OK) {
        var store_info = fixedData.reviseExampleShop(res.store_info)

        this.setData({
          store_info: store_info,
          miniapps_code: res.store_info.miniapps_code

        });
        this.initGoodData();
      } else if (res.status == 3) {
        
        A.showTipModal(res.info, () => {
          A.G('reLaunch:///pages/nearShopList/nearShopList')
        })
        this.setData({
          errStore: false
        })
      } else if (res.status == 600) {
        A.G('reLaunch:///pages/userPower/userPower')
      }else {
        A.showTipModal(res.info || A.information.DATAFAIL, () => {
          A.G('reLaunch:///pages/nearShopList/nearShopList')
        })
        this.setData({
          errStore: false
        })
      }
      //标题
      wx.setNavigationBarTitle({
        title: this.data.store_info.store_name
      })
    
    }, err => { });
  },
  
  // 点击打开店铺二维码 
  storageWxAbout() {
    wx.previewImage({
      current: this.data.miniapps_code, // 当前显示图片的http链接
      urls: [this.data.miniapps_code] // 需要预览的图片http链接列表
    })
  },
  // 关注
  tapPoint: function () {


    var store_id = this.data.store_info.store_id;
    var user_id = wx.getStorageSync('user_id');
    var is_attention = this.data.store_info.is_attention;
    if (this.data.aboutFlag == 0 && this.data.store_info.is_attention != 1) {
      this.setData({
        wxAboutshow: true
      })
      return
    }
    A.updata.MemberPoint(store_id, user_id, is_attention).then(res => {

      if (res.status == A.STATE.STATUS.OK) {
        A.updata.getMember(store_id).then(res => {

          var store_info = fixedData.reviseExampleShop(res.store_info)
          this.setData({
            store_info: store_info,
            miniapps_code: res.store_info.miniapps_code
          });

        })
      } else {
        this.ModalFail(res)
      }
    })
  },
  // 初始化商户的相关活动信息
  initGoodData: function () {
    var flagse = 0;
    var flaggr = 0;
    // 获取商户优惠列表
    wx.showLoading({
      title: '加载中',
    })
    A.updata.getMemberPointSpecialsList().then(res => {
      flagse = 1;
      wx.hideLoading()
      this.setData({
        goods_list: res.goods_list,
        specialsAllPaging: res.all_paging,
        specialsPaging: res.paging
      });
    }, err => {
      wx.hideLoading()

    });
    // 当前店铺团购活动
    A.updata.getMemberPointGroupList().then(res => {
      flaggr = 1
      this.setData({
        group_list: res.goods_list,
        groupAllPaging: res.all_paging,
        groupPaging: res.paging
      });
      wx.hideLoading()
    }, err => {
      wx.hideLoading()
    });

      A.setInterval('setIntervalId', () => {
          if (flagse == 1 && flaggr == 1) {
            A.clearInterval('setIntervalId')
        
          if (this.data.goods_list.length == 0 && this.data.group_list.length != 0) {
            this.setData({
              tabs: ['拼团立减', '特惠活动'],
            })
          }
          }else{
            this.setData({
              tabs: ['特惠活动', '拼团立减'],
            })
          
          }
      }, 10)
     
    
 
    //获取当前店铺商盟的特惠活动
    A.updata.getMemberPointAllySpecialsList().then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          allySpecialsList: res
        })
      } else {
        this.ModalFail(res)
      }
    
    })
    //获取当前店铺商盟的团活动
    A.updata.allyActivityInfo().then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          allyGroupList: res
        })
      } else {
        this.ModalFail(res)
      }
    
    })
    //获取当前用户是否关注公众号
    A.updata.getAttationwx().then(res => {

      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          aboutFlag: res.data
        })
      } else {
        this.ModalFail(res)
      }
    })
  
  },
  selectTab(evt) {
    this.setData({
      activeIndex: evt.detail.index
    });

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
  //打电话
  Callphone: function () {


    wx.makePhoneCall({
      phoneNumber: this.data.store_info.telephone
    })


  },
  //请求接口失败弹窗提示
  ModalFail: function (res) {
    A.showTipModal(res.info || A.information.DATAFAIL)   //获取数据失败
  },
  //触底事件
  onReachBottom: function () {

    if (this.data.activeIndex == 0) {
      var specialsPaging = this.data.specialsPaging
      if (this.data.specialsAllPaging <= specialsPaging) {
        this.setData({
          bottFlag: true
        })
        return
      }
      specialsPaging++
      A.updata.getMemberPointSpecialsList(specialsPaging).then(res => {

        var goods_list = this.data.goods_list;
        if (res.status == A.STATE.STATUS.OK) {
          res.goods_list.map((item, index) => {
            goods_list.push(item)
          })
          this.setData({
            goods_list: goods_list,
            specialsPaging: res.paging
          });

        } else (
          this.showCancel(res)
        )
      });
    } else {
      var groupPaging = this.data.groupPaging
      if (this.data.groupAllPaging <= groupPaging) {
        this.setData({
          bottFlag: true
        })
        return
      }
      groupPaging++
      wx.showLoading({
        title: '加载中',
      })
      A.updata.getMemberPointGroupList(groupPaging).then(res => {
        wx.hideLoading()
        var group_list = this.data.group_list;
        if (res.status == A.STATE.STATUS.OK) {

          res.goods_list.map((item, index) => {
            group_list.push(item)
          })
          this.setData({
            group_list: group_list,
            groupPaging: res.paging
          });

        } else (
          this.showCancel(res)
        )
      }, err => {
        wx.hideLoading()
        A.showTipModal(err.info || A.information.FAILREQ)
      });
    }


  },
  //去店铺
  storebutton: function (e) {

    var store_id = Number(e.detail)
    A.G("reLaunch:///pages/myStore/index?store_id=" + store_id);

  },
  //隐藏公众号二维码
  hideWxAbout() {
    this.setData({ wxAboutshow: false })
  },
  navStore: function (e) {
    var goods_id = e.detail.goods_id;
    var is_group = e.detail.is_group;
    if (is_group == 1) {//拼团立减
      A.G('/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id)
    } else if (is_group == 3) {
      A.G('/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id)
    } else {
      A.G('/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id)
    }
  }
}));