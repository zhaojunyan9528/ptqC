// pages/my/footprint/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,
    listType: 3,
    topbar: {
      system: A.store.my.system,
      title: '我的足迹',
      optType: 0,
      optFn: 'clearFootprint',
      optTxt: '清空'
    },

    isEdit: false, // 是否为编辑状态
    selectedAll: false, // 是否为全选状态

    pageCount: 0, // 总页数
    pageNum: 0, // 当前页数
    isLastPage: false,  // 是否为最后一页
    list: [], // 数据列表

    noList: false, // 是否没有列表数据
    noListInfo: {
      img: '../../../assets/images/n3_ico8.png',
      txt: A.information.NULLSTORE,//'您还没有浏览过商品，先去逛逛吧'
    }, // 没有列表数据提示内容
  },
  onLoad: function () {
    // 加载初始数据
    BASE.PRO._set(this);
  },
  onShow: function (opts) {
    // 加载收藏列表
    this.getFootprintList();
  },

  // 获取足迹列表
  getFootprintList() {
    A.updata.footPrintList(this.data).then(res => { }, err => { });
  },
  // 触底加载更多
  onReachBottom: function () {
    if (!this.data.isLastPage) { this.getFootprintList() }
  },
  // 清空列表
  clearFootprint() {
    A.showBaseModal(A.information.EMPTYLIST , this.confirmClear);// '确认清空吗'
  },
  // 确认清空
  confirmClear: function () {
    const _that = this, _d = _that.data;

    A.hideModal();
    wx.showLoading({ title: '加载中...' });
    A.updata.footprintClear().then(res => {
      wx.hideLoading()
      if (res.status == A.STATE.STATUS.ERROR) {
        A.showTipModal(res.info, function(){
          A.hideModal();
          _that.setData({
            pageNum: 0,
            isLastPage: false,
          });
          _that.getFootprintList();
        })
      } else { A.showTipModal(res.info) }
    }, err => { A.showTipModal(err.info) });
  }
}))