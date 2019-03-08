// packageFree/pay/paySuccess/paySuccess.js
// pages/buy/pay/paySuccess/paySuccess.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    telephone: 0,
    successImg: '/assets/images/paySuccess.png',
    btnText:'开启刮奖免单',
    btnText1: '进入店铺查看更多活动',
    initiator_id:'',
    // inputPlaceholder:"输入手机号码开启刮奖免单",//输入框的初始内容
    // isJump:false,//是否可跳转页面
    // isPhone:false,//未收集
    // Hint:''
		jump:0,//1跳转刮奖页面  2，跳转店铺
		payAmount:0,//支付金额
		store_id:0,//店铺ID
		user_id:0,//用户ID
		pageW: 375,//可使用窗口宽度
		pageH: 603, //可使用窗口高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var jump = options.jump;
      var payAmount = options.payAmount;
      var store_id = options.store_id;
      var user_id = options.user_id;
      var goods_id = options.goods_id;
      that.setData({
        jump: jump,
        payAmount: payAmount,
        store_id: store_id,
        user_id:user_id
      })
    that.getInitiatorId(goods_id,user_id);
    //获取手机的可用宽高
    wx.getSystemInfo({
      success: (res) => {
        var pageW = Number(res.windowWidth);
        var pageH = Number(res.windowHeight) ;
        this.setData({
          pageW: pageW,
					pageH: pageH,
        })
      },
    })
//判断用户是否收集过手机号
    // this.userHasPhone()
  },
  //是否收集过用户手机号
  // userHasPhone:function(){
  //   A.updata.userHasPhone().then(res => {
  //     if (res.status == A.STATE.STATUS.OK) {
  //       if(res.data>0){
  //         this.setData({
  //           isPhone: true
  //         })
  //       }
  //     } else {
  //       A.showTipModal(res.info || A.information.DATAFAIL);
  //     }
  //   }, err => {
  //     A.showTipModal(err.info || A.information.DATAFAIL);
  //   })
  // },

  //提交手机号
  // conmitPhnoe: function (storeId, telephone ) {
  //   A.updata.conmitPhnoe(storeId, telephone).then(res => {
  //     if (res.status == A.STATE.STATUS.OK) {

  //     } else {
  //       A.showTipModal(res.info || A.information.DATAFAIL);
  //     }
  //   }, err => {
  //     A.showTipModal(err.info || A.information.DATAFAIL);
  //   })
  // },

  //监控input输入
  // bindblur:function(e){
  //   var telephone = e.detail.value
  //   this.setData({
  //     telephone: telephone
  //   })
  //   if(telephone.length == 11){
  //       this.setData({
  //         isJump: true
  //       })
       
  //   } else if (telephone.length == 0){
  //     this.setData({
  //       Hint:'手机号不可为空'
  //     })
  //   }else{
  //     this.setData({
  //       Hint: A.information.WRONGPHONE
  //     })
  //   }

  // },

  //跳转刮奖免单或店铺
  jump(){
    var that = this;  
    // var isPhone = this.data.isPhone;
    // var isJump = this.data.isJump;
    var storeId = 0;
    var telephone = this.data.telephone;
    // if (that.data.jump == 1 ){
    //   if (isPhone){
    //       A.G('redirectTo:///packageFree/detailsFree/detailsFree?initiator_id=' + that.data.initiator_id)
    //   }else{
    //     if (isJump){
    //       this.conmitPhnoe(storeId, telephone);
    //       A.G('redirectTo:///packageFree/detailsFree/detailsFree?initiator_id=' + that.data.initiator_id)  
    //     }else{
    //       A.showTipModal(A.information.WRONGPHONE)
    //     }
       
    //   }
     
    // } else {
    //   A.G('redirectTo:///pages/myStore/index?store_id=' + that.data.store_id)
    // }

		if(that.data.jump== 1){//跳转刮奖页面
			A.G('redirectTo:///packageFree/detailsFree/detailsFree?initiator_id=' + that.data.initiator_id)
		}else{//跳转店铺
			A.G('redirectTo:///pages/myStore/index?store_id=' + that.data.store_id)
		}
  },
  //获取发起人的ID
  // 刮到的奖金
  getInitiatorId: function (goods_id,user_id) {
    A.updata.getInitiatorId(goods_id, user_id).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          initiator_id: res.data
        })
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL);
      }
    }, err => {
      A.showTipModal(err.info || A.information.DATAFAIL);
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))