// pages/myStore/index.js
const fixedData = require("../../common/fixed-data.js")
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    isBorderBottom:false,
    windowWidth: 375,
    NullPageH11:334,
    ifFixedH:119,
    NullPageH:603,
    errStore:true,
    bootomFlag:false,
    scanImg:'/assets/images/scanIcon.png',//去首页
    store_img: '/assets/images/storeBI.png',
    activeIndex:0,
    wxAboutshow: false,//是否关注公众号
    aboutFlag: 1,//是否关注公众号，默认已关注
    paging:1,
    allpaging:1,
    isFixed:false,//是否固定导航
    isFixedNavg:false,//导航已经固定，切换活动类型，活动列表小于2
    tabs:[
      {
        value:'全部',
        type:0
      },
      {
        value: '多人拼团',
        type: 3
      },
      {
				value:'限时专享',
        type:4
      },
      {
        value:'拼团商城',
        type:1
      },
			{
				value: '砍价',
				type: 6
			},
      ],
    bootomFlag:false,//是否加载完
    null_data:{
      null_img:'/assets/images/no_activity.png',
      no_activity:'本店暂无活动',
      go_g:'去逛逛看看吧'
    },
    currentType:0 ,//当前活动类型默认全部：0 多人拼团 3 拼图立减：1 限时专享：4
    allySpecialsList:[],//商盟列表
    activitiList:[],
    length:-1, //活动列表
    store_id:0,
    //未关注公众号
    miniapps_codeTxt: [
      '点击上方二维码打开，长按保存至相册',
      '微信扫一扫，点击相册选择此图片',
      '关注公众号',
      '点击推送的店铺信息,自动关注店铺'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.store_id) {
      this.setData({
        store_id: options.store_id 
      })
    } else if (options.scene) {
      this.setData({
        store_id: options.scene
      })
    }else{
      this.setData({
        store_id: 0
      })
    }
   
    this.startFn();
    // 获取屏幕的高度
    wx.getSystemInfo({
    
      success: (res) => {
        var ifFixedH = 280 * (res.windowWidth / 750) 
        var NullPageH = res.windowHeight  - 120;
        var NullPageH11 = res.windowHeight - (ifFixedH + (240 * (res.windowWidth / 750)))
        var NullPageW = res.windowWidth;
       
        this.setData({
          windowWidth:NullPageH,
          NullPageH: NullPageH,
          ifFixedH: ifFixedH,
          NullPageH11: NullPageH11
        });
      }});
  },
  startFn(){
    var that = this;
    that.storeInfo();
    that.leagueList();
    that.activitityList(that.data.paging);
    that.getAttationwx();
  },
  storeInfo(){
    wx.showLoading({ title: '加载中...' });
    A.updata.getMember(this.data.store_id).then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        var store_info = fixedData.reviseExampleShop(res.store_info)
        this.setData({
          store_info:store_info,
          is_store:res.is_store,
          user_id:res.user_id,
          store_id:res.store_info.store_id,
          miniapps_code: res.store_info.miniapps_code
        })
        wx.setNavigationBarTitle({
          title: this.data.store_info.store_name || "门店"
        })
      } else if (res.status == 3) {

        A.showTipModal(res.info, () => {
          A.G('reLaunch:///pages/nearShopList/nearShopList')
        })
   
      } else if (res.status == 600) {
        A.G('reLaunch:///pages/userPower/userPower')
      } else {
     
        A.showTipModal(res.info || A.information.DATAFAIL, () => {
          A.G('reLaunch:///pages/nearShopList/nearShopList')
    
        })
      
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    })
  },
  //店铺活动
  activitityList(paging){
    var ifFixedH = this.data.ifFixedH
    var that = this;
    var store_id = that.data.store_id;
    var type = that.data.currentType || 0;
    wx.showLoading({ title: '加载中...' });
    A.updata.activitityList(store_id,type,paging).then(res=>{
   
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        var activitiList = that.data.activitiList;
        var new_activitiList = res.list;
        if(res.list.length > 0){
          if (paging>1){
            new_activitiList.map((item, index) => {
              activitiList.push(item)
            })
          }else{
            activitiList = res.list
          }
          that.setData({
            activitiList: activitiList,
            length:activitiList.length,
            paging: res.paging,
            allpaging: res.all_paging
          })
        
        } else{
          that.setData({
            activitiList: [],
            paging: 1,
            all_paging: 1,
            length: 0,
          })
        }
        
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
     
      if(this.data.isFixed && this.data.paging == 1){
        wx.pageScrollTo({
          scrollTop: ifFixedH,
          duration: 0
        })
      }
    }, err => {
 
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
    })
  },
  //商盟列表
  leagueList(){
    var that = this;
    var store_id = that.data.store_id;
    wx.showLoading({ title: '加载中...' });
    A.updata.leagueAllList(store_id).then(res=>{
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        that.setData({
          allySpecialsList: res.list
        })
      } else if (res.status == 2){
        that.setData({
          allySpecialsList:[]
        })
      }else{
        A.showTipModal(A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(A.information.FAILREQ)
    })
  },
  //切换活动
  selectTab(evt) {
    var that = this;
    that.setData({
      bootomFlag: false,
     
      paging:1,
      activeIndex: evt.currentTarget.dataset.index,
			currentType: evt.currentTarget.dataset.type
    })
    that.activitityList(1);
  },
  //跳详情
  goDetail:function(e){
    var goods_id = e.detail.goods_id;
    var is_group = e.detail.type;
    var group_id = e.detail.groupid;
    if (is_group == 1) {//拼团立减
      A.G('/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 3) {
      A.G('/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if(is_group == 4){
      A.G('/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if(is_group == 6){
      A.G('/pages/goodsInfo/goodsBargain/goodsBargain?goods_id=' + goods_id + '&group_id=' + group_id)
    }
  },
  // 关注
  tapPoint: function () {
    var that = this;
    var store_id = that.data.store_info.store_id;
    var user_id = wx.getStorageSync('user_id');
    var is_attention = that.data.store_info.is_attention;
    if (that.data.aboutFlag == 0 && that.data.store_info.is_attention != 1) {
      that.setData({
        wxAboutshow: true
      })
      return
    }
    wx.showLoading({ title: '加载中...' });
    A.updata.MemberPoint(store_id, user_id, is_attention).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        A.updata.storeInfo(store_id).then(res => {
          var store_info = fixedData.reviseExampleShop(res.store_info)
          that.setData({
            store_info: store_info,
            miniapps_code: res.store_info.miniapps_code
          });
        })
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    },err=>{
      wx.hideLoading();
      A.showTipModal(res.info || A.information.FAILREQ)
    })
  },
  // 点击打开店铺二维码 
  storageWxAbout() {
    wx.previewImage({
      current: this.data.miniapps_code, // 当前显示图片的http链接
      urls: [this.data.miniapps_code] // 需要预览的图片http链接列表
    })
  },
  //拨打电话
  Callphone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.store_info.telephone,
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

  //去首页
  goIndex:function(){
    A.G("switchTab:///pages/index")
  },
  //获取当前用户是否关注公众号
  getAttationwx:function(){
    wx.showLoading({ title: '加载中...' });
    A.updata.getAttationwx().then(res => {
    wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          aboutFlag: res.data
        })
      } else {
        this.ModalFail(res)
      }
    },err=>{
      wx.hideLoading();
      A.showTipModal(res.info || A.information.FAILREQ)
    })
  },

  //去店铺
  storebutton: function (e) {

    var store_id = Number(e.detail)
    A.G("/pages/myStore/index?store_id=" + store_id);

  },
  //隐藏公众号二维码
  hideWxAbout() {
    this.setData({ wxAboutshow: false })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    var that = this;
    var paging = that.data.paging;
    var allpaging = that.data.allpaging;
    if (paging >= allpaging) {
      that.setData({
        bootomFlag:true
      })
      return;
    }
    that.activitityList(++paging);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.store_info.store_name,
      path: "/pages/myStore/index?store_id=" + this.data.store_info.store_id || 0,
      success: res => {
      },
      fail: res => {
      }
    }
  },
  /**
   *监控页面滚动
   * 
   */
  onPageScroll:function(e){
    var ifFixedH = this.data.ifFixedH
    
    if (e.scrollTop >= ifFixedH){

      this.setData({
        isFixed : true
      })
    } else if (e.scrollTop < ifFixedH - 2 && e.scrollTop != 0 && e.scrollTop != 101 ){
      this.setData({
        isFixed: false,   
      })
    }
  },
  goDetailI: function (e) {
    var goods_id = e.currentTarget.dataset.id;
    var is_group = e.currentTarget.dataset.type;
    var group_id = e.currentTarget.dataset.groupid;
    if (is_group == 1) {//拼团立减
      A.G('/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 3) {
      A.G('/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id + '&group_id=' + group_id)
    } else {
      A.G('/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id + '&group_id=' + group_id)
    }
  },
}))