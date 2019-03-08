// pages/my/order/list/list.js
const BASE = require('../../utils/base.js');

const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,
    type: 0, // 订单状态：0-全部
    curOrder: '',
    store_id: A.DB.user.sid,
    noList: false,
    noListInfo: {
      img: '/assets/images/n3_ico2.png',
      txt1:'您还没有订单',
      txt: "去逛逛看看吧",
    },
    noBtn: true,

    pageNum: 0,
    pageCount: 0,
    isLastPage: false,
    isDetail: false,
    list: [],
    
  },
  onLoad: function (opts) {
    const _that = this, _d = _that.data;

    // 加载初始数据
    BASE.PRO._set(_that);

    // 状态栏
    const sequence = [0, 1, 2, 6, 3, 4, 5, 10];
    const navTabs = [];
    for (var i in sequence) {
      navTabs.push({
        key: sequence[i],
        value: A.DF.OrderStatus[sequence[i]]
      });
    }
    _that.setData({ navTabs: navTabs });

    // 订单状态
    if (opts && opts.type) {
      const type = opts.type;
      _that.setData({ type: type });
    }
    // 初始化页面数据
    _that.initData();
    // 订单列表
    _that.getOrderList();
  },
  onShow: function(){
    const _that = this, _d = _that.data;
    // 加载初始数据
    BASE.PRO._set(_that);
    // 初始化页面数据
    _that.initData();
    // 订单列表
    _that.getOrderList();
  },
  
  // 初始化数据
  initData(){
    this.setData({
      pageNum: 0,
      pageCount: 0,
      isLastPage: false,
      noList: false,
      list: [],
      curOrder: ''
    });
  },
  // 获取订单列表
  getOrderList(){
    const _that = this, _d = _that.data;
    A.updata.orderList(this).then(res => {
      if (_d.list.length == 0){
          this.setData({
            noList:true
          })
      }
      let list = _d.list;
      for(let i in list){
        list[i].sale_price = ((parseFloat(list[i].total_price) - parseFloat(list[i].postage)) / parseInt(list[i].nums)).toFixed(2)
      }
      _that.setData({ list: list})
    }, err => { A.showTipModal(A.information.FAILREQ) });   //请求接口失败
  },
  // 切换订单状态
  tabClick(e) {
    this.setData({ type: e.currentTarget.id });
    this.initData();
    wx.pageScrollTo({ scrollTop: 0 })
    this.getOrderList();
  },
  // 核销订单
  orderPickUp: function(e){
    this.setData({ curOrder: e.target.dataset.id });
    A.showBaseModal(A.information.WRITEOFF || A.information.DATAFAIL, this.orderConfirmPickUp);//"确定后，此订单将成为已消费状态，如您还未消费，请谨慎操作！"
  },
  // 确认核销
  orderConfirmPickUp() {
    const _that = this;
    A.hideModal();
    A.updata.orderPickUp(_that).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.initData();
        _that.getOrderList();
        A.showTipModal(res.info)
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 收货
  orderReceive: function (e) {
    this.setData({ curOrder: e.target.dataset.id });
    A.showBaseModal(A.information.COLLECTGOODS || A.information.DATAFAIL, this.orderConfirmReceive);//'是否确认收货？'
  },
  // 确认收货
  orderConfirmReceive(){
    const _that = this;
    A.hideModal();
    A.updata.orderReceive(_that).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.initData();
        _that.getOrderList();
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 删除订单
  orderDelete: function (e) {
    this.setData({ curOrder: e.target.dataset.id });
    A.showBaseModal(A.information.DELETEORDER || A.information.DATAFAIL, this.orderConfirmDelete);//"是否确认删除此订单？"
  },
  // 确认删除订单
  orderConfirmDelete(){
    const _that = this;
    A.hideModal();
    A.updata.orderDelete(_that).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.initData();
        _that.getOrderList();
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { A.showTipModal(err.info || A.information.FAILREQ) });
  },
  // 触底加载更多
  onReachBottom: function () {
    if (!this.data.isLastPage) { this.getOrderList() }
  },
}))