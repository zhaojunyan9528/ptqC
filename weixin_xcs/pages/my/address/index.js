// pages/my/address/index.js
const A = getApp();
Page(A.assignPage({
  data: {
    imgSrc: '/assets/images/n3_ico4.png',
    text: A.information.NULLADDRESS,//'您还没有收货地址，快去添加吧'
    paging: 1,
    address_list: [],   //地址列表
    listLength: -1,
    delAddId: 0,
    select_address: 0
    
  },
  onLoad(options) {
    var group_id = options.group_id || '';
    var goods_id = options.goods_id || '';
    var types = options.type || '';
    var select_address = options.select_address || '';
    this.setData({
      group_id: group_id,
      goods_id: goods_id,
      type: types,
      select_address: select_address
    })
  },
  onShow(){
    this.initData(1);
  },
  onReachBottom() {
    var _that = this, _d = _that.data;
    let paging = _d.paging;
    if (_d.all_paging <= paging) {
      return
    }
    paging++;
    A.updata.getAddressList(paging).then(res => {
      if (res.status == A.STATE.STATUS.Ok) {
        let list = _d.address_list;
        res.list.map((item, index) => {
          list.push(item)
        })
        _that.setData({
          address_list: list,
          paging: res.paging,
          all_paging: res.all_paging
        });
      }
    }, err => { })
  },
  // 点击按钮加载完成
  hideLoading() {
    this.data.btn.hideLoading();
  },
  //加载地址列表
  initData(paging) {
    wx.showLoading({ title: '加载中...' })
    //收货地址列表
    A.updata.getAddressList(paging).then(res => {
      wx.hideLoading();
      if(res.status==1){
        this.setData({
          address_list: res.list,
          listLength: res.list.length,
          all_paging: res.all_paging,
          paging: res.paging
        })
      }else{
        A.showTipModal(A.information.DATAFAIL);
      }
    }, err => { 
      wx.hideLoading();
      A.showTipModal(A.information.FAILREQ);
    });
  },
  //添加地址跳转
  addAddress: function (e) {
    var _that = this, _d = _that.data;
    if (_d.select_address == 1) {
      A.G('redirectTo:///pages/my/address/newAddress/newAddress?flag=1&goods_id=' + _d.goods_id + '&group_id=' + _d.group_id + '&type=' + _d.type + '&select_address=' + _d.select_address)
    } else {
      A.G('/pages/my/address/newAddress/newAddress?flag=1')
    }

  },
  //编辑地址详情
  editAddressInfo: function (event) {
    var _that = this, _d = _that.data;
    var address_id = event.currentTarget.dataset.id;
    if (address_id) {
      A.updata.editAddressInfo(address_id).then(res => {
        if (res.status == A.STATE.STATUS.OK) {
          try {
            wx.setStorageSync("addressInfo", res.info)
          } catch (e) { }
          if (_d.select_address == 1) {
            A.G('redirectTo:///pages/my/address/newAddress/newAddress?goods_id=' + _d.goods_id + '&group_id=' + _d.group_id + '&type=' + _d.type + '&select_address=' + _d.select_address)
          } else {
            A.G('/pages/my/address/newAddress/newAddress')
          }
        }
      }, err => { })
    } else { }
  },
  //删除地址
  delAddress: function (event) {
    let index = event.currentTarget.dataset.index;
    this.setData({ btn: this.selectComponent('#vwx-button-del' + index) })
    var address_id = event.currentTarget.dataset.id;
    if (address_id) {
      this.setData({ delAddId: address_id })
      A.showBaseModal(A.information.EMPTYADDRESS, this.confirmDel, null, this.hideLoading);//"确定删除吗"
    }else{
      this.hideLoading();
    }
  },
  //确认删除操作
  confirmDel: function () {
    A.hideModal();
    wx.showLoading({ title: '加载中...' });
    A.updata.deleteAddress(this.data.delAddId).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.initData();
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.DATAFAIL) 
     })
  },
  //回支付页面
  gotoPay: function (event) {
    var _that = this, _d = _that.data;
    var address_id = event.currentTarget.dataset.id;
    if (address_id && _d.goods_id) {
      A.G('redirectTo:///pages/buy/buy?address_id=' + address_id + '&group_id=' + _d.group_id + '&goods_id=' + _d.goods_id + '&type=' + _d.type)
    }
  }
}));
