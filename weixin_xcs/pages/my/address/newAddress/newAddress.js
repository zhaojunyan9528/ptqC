// pages/my/address/newAddress/newAddress.js
const A = getApp();
Page(A.assignPage({
  data: {

    address_id: '0',   //地址ID
    consignee: '',    //用户名
    telephone: '',    //电话
    province: '',
    city: '',
    country: '',
    place: '',        //详细地址
    is_default: true,   //是否默认地址
    isClick: false,     //保存按钮是否可点击
    flag: 0        //1是添加地址保存，0是编辑地址保存
  },
  // 点击按钮加载完成
  hideLoading() {
    this.data.btn.hideLoading();
  },

  //省市区选择改变事件
  bindRegionChange: function (e) {
    var that = this;
    that.setData({
      province: e.detail.value[0],
      city: e.detail.value[1],
      country: e.detail.value[2],
    })
    this.getInputInfo();
  },
  //监听用户名输入
  consigneeInput: function (e) {
    this.setData({
      consignee: e.detail.value
    })
    this.getInputInfo();
  },

  //监听电话号码输入
  telephoneInput: function (e) {
    this.setData({
      telephone: e.detail.value
    })
    this.getInputInfo();
  },

  //监听详细地址输入
  placeInput: function (e) {
    this.setData({
      place: e.detail.value
    })
    this.getInputInfo();
  },

  //验证保存按钮是否变色可点击
  getInputInfo: function (e) {
    var that = this;
    var consignee = that.data.consignee
    var telephone = that.data.telephone
    var place = that.data.place
    var province = that.data.province
    if (consignee.trim().length != 0 && telephone.trim().length != 0 && place.trim().length != 0 && province.length > 0) {
      that.setData({
        isClick: true
      })
    } else {
      that.setData({
        isClick: false
      })
    }
  },
  isDefault: function (e) {
    var status = this.data.is_default;
    this.setData({
      is_default: !status
    })
  },
  //添加、编辑地址保存
  saveAddress: function () {
    var that = this;
    that.setData({ btn: that.selectComponent('#vwx-button-save') })
    var address_id = that.data.address_id;
    var consignee = that.data.consignee;
    var telephone = that.data.telephone;
    var region = that.data.region;
    var province = that.data.province;
    var city = that.data.city;
    var country = that.data.country;
    var place = that.data.place;
    var is_default = that.data.is_default ? 1 : 0;
    var re = /^1\d{10}$/;
    if (!(re.test(telephone))) {
      A.showTipModal(A.information.PHONEERR, that.hideLoading)//"手机号不正确，请重新输入手机号" 
    } else {
      var goods_id = that.data.goods_id;
      var group_id = that.data.group_id;
      var type = that.data.type;
      var select_address = that.data.select_address;
      if (that.data.flag == 1) {     //新增收货地址保存
        A.updata.addAddress(address_id, consignee, telephone, province, city, country, place, is_default).then(res => {
          that.hideLoading();
          if (res.status == A.STATE.STATUS.OK) {
            A.showTipModal(A.information.SAVESUCESS, function () {   //保存成功
              A.hideModal();
              if (select_address == 1) {
                A.G('redirectTo:///pages/my/address/index?group_id=' + group_id + '&goods_id=' + goods_id + '&type=' + type + '&select_address=' + select_address)
              } else {
                A.G('navigateBack:///pages/my/address/index')
              }
            });
          } else {
            A.showTipModal(res.info)
          }
        }, err => {
          that.hideLoading();
          A.showTipModal(err.info);
        })
      } else {    //编辑地址保存
        A.updata.editAddressSave(address_id, consignee, telephone, province, city, country, place, is_default).then(res => {
          that.hideLoading();
          if (res.status == A.STATE.STATUS.OK) {
            A.showTipModal(A.information.SAVESUCESS, function () {   //保存成功
              A.hideModal();
              if (select_address == 1) {
                A.G('redirectTo:///pages/my/address/index?group_id=' + group_id + '&goods_id=' + goods_id + '&type=' + type + '&select_address=' + select_address)
              } else {
                A.G('redirectTo:///pages/my/address/index')
              }
            });
          } else {
            A.showTipModal(res.info)
          }
        }, err => {
          that.hideLoading();
          A.showTipModal(err.info)
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.flag) {
      this.setData({
        flag: options.flag
      })
    } else {
      this.getAddressInfo();//获取编辑地址详情
    }

    this.getInputInfo();

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
  getAddressInfo: function () {
    try {
      var data = wx.getStorageSync("addressInfo");
      if (data) {
        this.setData({
          address_id: data.address_id,
          consignee: data.consignee,
          country: data.country,
          city: data.city,
          place: data.place,
          province: data.province,
          telephone: data.telephone,
          is_default: data.is_default,
          isClick: true
        })
      }
    } catch (e) {

    }
  },

}))
