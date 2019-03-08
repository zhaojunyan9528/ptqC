// pages/my/participatingActs/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,
    listType: 1, // 使用模板类型
    
    isEdit: false,
    noList: false,
    // noListInfo: {
    //   img: '../../../assets/images/n3_ico1.png',
    //   txt: A.information.NULLSHARE  //'您还没有待分享活动，先去逛逛吧',
    // },
    noListInfo: {
      img: '../../../assets/images/n3_ico8.png',
      txt: A.information.NULLSTORE,//'您还没有浏览过商品，先去逛逛吧'
    }, // 没有列表数据提示内容
    pageCount: 0,
    pageNum: 0,
    isLastPage: false,
    list: [],
  },
  onLoad: function (opts) {
   
    const _that = this;
    // 加载初始数据
    BASE.PRO._set(_that);
  },
  onHide:function(){
    this.setData({
    
      list: [],
      pageCount: 0,
      pageNum: 0,
      isLastPage: false,
      noList: false,
    })
  },
  onUnload: function () {
    this.setData({
      list: [],
      pageCount: 0,
      pageNum: 0,
      isLastPage: false,
      noList: false,
    })
  },
  goPage1:function(e){
    // var initiator_id = id
    A.G('navigateTo:///packageFree/activitiDetails/index?initiator_id=' + e.currentTarget.dataset.id)
  },
  // 获取带分享列表
  getInSharingList: function(){
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.inSharingList(this.data).then(res => { 
      wx.hideLoading()
    }, err => { wx.hideLoading() });

  },
  // 触底加载更多
  onReachBottom: function(){
    if (!this.data.isLastPage){ this.getInSharingList() }
  },
  onPullDownRefresh:function(){
    this.setData({
      list: [],
      pageCount: 0,
      pageNum: 0,
      isLastPage: false,
      noList: false,

    })
    this.getInSharingList();
    wx.stopPullDownRefresh();
 
  },
  // 立即分享
  share: function(){
    
  },
  onShow:function(){
		const _that = this;
		// 加载初始数据
		BASE.PRO._set(_that);
    // 获取待分享列表
    this.getInSharingList();
  }
}))