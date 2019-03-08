// pages/my/order/detail/detail.js
const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,

    isDetail: true,
    express: 0, //(0-送货上门，1-上门自取)
    orderId: '',
    type: 0, // 所有订单
    list:[]
  },
  onLoad: function(opts) {
    const _that = this;

    // 设置参数
    if (opts.order_id) {
      this.setData({
        orderId: opts.order_id
      });
    }

  },
  onShow: function() {
    const _that = this;
    // 加载初始数据
    BASE.PRO._set(this);


    // 订单详情
    _that.orderDetail();

    // 强制刷新上一页数据
    _that.setRPdata();
  },

  // 获取订单详情
  orderDetail() {
    const _that = this;
    A.updata.orderDetail(_that).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        let orderInfo = Object.assign({}, res.order_info);
        let orderDetail = Object.assign({}, res.order_detail);
        _that.setData({
          express: res.order_info.genre,
          orderInfo: res.order_info,
          storeInfo: res.store_info,
          orderDetail: res.order_detail,
          orderStatus: res.order_status,
          orderGoods: res.order_goods,
          item: Object.assign(orderInfo, orderDetail),
          curOrder: res.order_info.order_id
        });

      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ)
    });
  },
  // 核销订单
  orderPickUp(e) {
    this.setData({
      curOrder: e.target.dataset.id
    });
    A.showBaseModal(A.information.WRITEOFF || A.information.DATAFAIL, this.orderConfirmPickUp); //"确定后，此订单将成为已消费状态，如您还未消费，请谨慎操作！"
  },
  // 确认核销
  orderConfirmPickUp() {
    const _that = this;
    console.log(_that.data.orderInfo.order_id)
    A.updata.orderPickUp(_that).then(res => {
      A.hideModal();
      if (res.status == A.STATE.STATUS.OK) {
        _that.orderDetail();
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ)
    });
  },
  // 收货
  orderReceive: function(e) {
    this.setData({
      curOrder: e.target.dataset.id
    });
    A.showBaseModal(A.information.COLLECTGOODS || A.information.DATAFAIL, this.orderConfirmReceive); //'是否确认收货？'
  },
  // 确认收货
  orderConfirmReceive() {
    const _that = this;

    A.showBaseModal(A.information.COLLECTGOODS, () => {
      A.updata.orderReceive(_that).then(res => {
        A.hideModal();
        if (res.status == A.STATE.STATUS.OK) {
          wx.navigateBack({
            delta: 1
          })

        } else {
          A.showTipModal(res.info)
        }
      }, err => {
        A.showTipModal(err.info)
      });
    })


  },
  // 删除订单
  orderDelete: function(e) {
    this.setData({
      curOrder: e.target.dataset.id
    });
    A.showBaseModal(A.information.DELETEORDER, this.orderConfirmDelete); //"是否确认删除此订单？"
  },
  // 确认删除订单
  orderConfirmDelete() {
    const _that = this;
    A.updata.orderDelete(_that).then(res => {
      A.hideModal();
      if (res.status == A.STATE.STATUS.OK) {
        A.G('reLaunch:///pages/my/order/list/list')
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ)
    });
  },
  // 点击拨打电话
  callSellerBtn() {
    let storeInfo = this.data.storeInfo;
    wx.makePhoneCall({
      phoneNumber: storeInfo.kefu_tel
    })
  },
}))