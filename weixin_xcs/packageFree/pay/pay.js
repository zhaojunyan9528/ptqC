// packageFree/pay/pay.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    focus:false,
    storelogo: '',
    storename: '',
    secs_price:'',//最低消費金額
    nosingle_text: '根据您在店内所消费的金额支付成功后，即可邀请好友进行刮奖免单。',
    pay_text: '买单仅限于到店支付，请确认消费金额后支付',
    protocol: [
      {
				title: '刮奖免单有效期：',
				text: ['如发起刮奖免单活动，则有效期为从支付成功开始算起的48小时内。']
      },
      {
        title: '付款前用户协议:',
        text: [
          '1、在您点击“立即支付”前请确认本次购买行为属于理性纯消费行为。拼团趣倡导理性消费，对于以任何盈利为目的的消费均不支持。拼团趣平台上无任何投资、集资或者其他任何与商户经营产品无关的商品或者服务。',
          '2、在您点击“立即支付”前确认本次购买中不存在任何金融产品、保险产品以及虚拟产品等需要具有相关销售资质的产品或者服务。',
          '3、在您点击“立即支付”前确认您所支付的钱款是与商家达成一致意思表示的购买行为。并且确保商家在本次购买行为中已经完全确保您在使用拼团趣产品的知情权和选择权。您与其他非拼团趣平台的消费者享有平等消费的权利。',
          '4、如果本次购买行为属于会员资格以及预充值行为，请确保商家未来具有履行预充值的资质并且具有履行能力。拼团趣平台对商户不履行承诺的会员权利或者无法兑现的预充值的法律后果不承担任何责任，本次购买行为的后续服务均由商户承担责任与拼团趣平台无关。',
          '5、如您本次购买的产品属于法定的三包服务产品或商户承诺的三包服务产品，商户有义务承担三包义务或者其他的产品质量责任，拼团趣平台作为撮合交易平台对商户是否承担产品质量以及是否履行三包义务均无任何责任，拼团趣平台不是本次买卖关系的一方当事人。',
          '本人对以上提示均已知晓和理解，愿意继续进行本次线上购买行为，并承担由此产生的一切法律责任。'
        ]
      }
    ],
    fixed:0,//弹出代金卷列表 底层页面固定不滚动0:滚动  1:不滚动
    currentIndex:0, //默认选择代金券第一个
    //代金券列表弹框属性 start
      title: '代金券',
      titleColor: '#F6C68D',
      confirmtext: '确定',
      canceltext: '不使用代金券',
      showCancel: true,
      titleStyle:'font-weight:800;',
      maskCancel:true,
    //代金券列表弹框属性 end
    couponText:'不使用代金券',
    choiceFlag:0, //是否选择代金券0 否  1是
    lowMoney:'200.00',//商家设置最低金额
    redFlag:0,//支付按钮是否变红和出现标志0否  1是
    // redFlag1: 0, //代金券选项是否变红和出现标志0否  1是
    money:'',//用户输入金额
    choicedCoupon:{},//被选中代金券信息
    activity_voucher:[],//代金券列表
    goods_id:0,
    inputValue:'',
		return_rate:0,//商家设置返现比例
  },
	//去首页
	goIndex: function () {
		A.G("switchTab:///pages/index")
	},
  //立即支付
  goPay:function(){
    var that = this;
    if(this.data.redFlag == 1){
      var voucherId;
      var goods_id = that.data.goods_id
      if (Object.keys(that.data.choicedCoupon).length === 0){
         voucherId = 0;
      }else{
        voucherId = that.data.choicedCoupon.id
      }
      var currentMoney = parseFloat(that.data.money).toFixed(2);
      
      if(that.data.money==0){
        A.showTipModal("支付金额不能为0")
        return;
      }
      A.updata.requestPay(goods_id, voucherId, currentMoney).then(res=>{
        if (res.status == A.STATE.STATUS.OK) {
          if (res.data.user_id) {
            wx.setStorageSync('user_id', res.data.user_id )
          }
          wx.setStorageSync('store_id', that.data.store_id)
          wx.requestPayment({
            timeStamp: res.data.timeStamp || '',
            nonceStr: res.data.nonceStr || '',
            package: res.data.package || '',
            signType: res.data.signType || '',
            paySign: res.data.paySign || '',
            success:()=>{
							
              A.G('redirectTo:///packageFree/pay/paySuccess/paySuccess?jump=' + res.data.jump + '&payAmount=' + that.data.currentMoney + '&store_id=' + that.data.store_id + '&goods_id=' + goods_id + '&user_id=' + res.data.user_id);            
							}
          })
        } else{
          A.showTipModal(res.info || A.information.DATAFAIL)
        }
      },err=>{
        A.showTipModal(err.info || A.information.FAILREQ)
      })
      
    }else{
      return;
    }
  },
  //不使用代金券
  cancel:function(){
    var that = this;
    var currentMoney = parseFloat(that.data.money).toFixed(2);
    
    that.setData({
      choiceFlag:0,
      couponText:'不使用代金券',
      currentIndex:0,
      currentMoney: currentMoney,
      fixed:0,
      choicedCoupon:{}
    }) 
    that.selectComponent("#couponList").cancel();
  },
  //监听金额输入
  bindMoneyInput:function(e){
    var that = this;
    var money = e.detail.value;
    var inputValue;
    that.setData({
      choicedCoupon:{}
    })
 

    if (money.toString().length>0) {  //判断是否输入金额  是
      if(money.toString() == '.'){
        A.showTipModal("请输入正确金额");
        that.setData({
          money: '',
          focus:false
        })
        return;
      }
 
      if (money.toString().indexOf(".") > -1) {  //判断是否输入小数
        if (money.toString().split(".")[1].length > 2) { //判断小数点后位数是否大于2
          money = money.substring(0, money.indexOf('.') + 3);//是 截取前两位
          that.setData({
            money: money,
            inputValue:money
          })
        }else{  //否 
          that.setData({
            money: money,
            inputValue: money
          })
        }
      }else{
        // money = parseFloat(e.detail.value).toFixed(2);
        that.setData({
          redFlag: 1,
          money:money,
          inputValue:money
        })
      }
  
        //获取代金券和店铺信息
        A.updata.couponbyUser(that.data.goods_id, money).then(res => {
          if (res.status == A.STATE.STATUS.OK) {
            that.setData({
              storename: res.storename,
              storelogo: res.storelogo,
              store_id: res.store_id,
              secs_price: res.secs_price,
              activity_voucher: res.activity_voucher
            })
            if (res.activity_voucher.length > 0) {//该用户有代金券
              if (res.activity_voucher[0].type == 1) {   //有代金券默认显示第一个可用代金券
                var currentMoney = parseFloat(money - res.activity_voucher[0].voucher_amount).toFixed(2);
                that.setData({
                  choiceFlag: 1,
                  couponText: "满" + res.activity_voucher[0].lowest_amount + "元减" + res.activity_voucher[0].voucher_amount + "元代金券",
                  currentMoney: currentMoney,
                  choicedCoupon: res.activity_voucher[0]
                })
              } else {  //有代金券，第一个代金券不可用
                var currentMoney = parseFloat(money).toFixed(2);
                that.setData({
                  choiceFlag: 0,
                  couponText: "不使用代金券",
                  currentMoney: currentMoney
                })
              }
            } else {  //该用户无代金券
              var currentMoney = parseFloat(money).toFixed(2);
              that.setData({
                choiceFlag: 0,
                couponText: "暂无代金券",
                currentMoney: currentMoney
              })
            }
          } else {
            A.showTipModal(res.info || A.information.DATAFAIL)
          }
        }, err => {
          A.showTipModal(err.info || A.information.FAILREQ)
        })
      
    } else {   //未输入金额
      that.setData({
        redFlag: 0,
        // money: '',
        couponText: "不使用代金券",
        currentMoney: 0.00,
        choiceFlag: 0,
      })
    }





    // that.setData({
    //   activity_voucher:[],
    //   choicedCoupon:{},
    //   couponText:'不使用代金券',
    //   choiceFlag:0,
    //   currentMoney:0.00,
    // })
    // if(money){
    //   that.setData({
    //     redFlag:1,
    //     // redFlag1:1
    //     money: inputValue || e.detail.value,
    //     currentMoney: inputValue || e.detail.value
    //   })
    // }else{
    //   that.setData({
    //     redFlag: 0,
    //     // redFlag1: 0,
    //     money:0
    //   })
    // }

  },
//监听输入框失焦
  blurMoney:function(e){
    var that = this;
    var money = e.detail.value;
    if (money) {  //判断是否输入金额  是
      var that = this;
      var moneyF = parseFloat(e.detail.value).toFixed(2);
      that.setData({
        redFlag: 1,
        money: moneyF,
      })
      // wx.showLoading({
      //   title: '加载中...',
      // })
      //获取代金券和店铺信息
    //   A.updata.couponbyUser(that.data.goods_id, moneyF).then(res => {
    //     // wx.hideLoading();
    //     if (res.status == A.STATE.STATUS.OK) {
    //       that.setData({
    //         storename: res.storename,
    //         storelogo: res.storelogo,
    //         store_id: res.store_id,
    //         secs_price: res.secs_price,
    //         activity_voucher: res.activity_voucher
    //       })
    //       if (res.activity_voucher.length > 0){//该用户有代金券
    //         if (res.activity_voucher[0].type == 1) {   //有代金券默认显示第一个可用代金券
    //           var currentMoney = parseFloat(money - res.activity_voucher[0].voucher_amount).toFixed(2);
    //           that.setData({
    //             // redFlag1: 1,
    //             choiceFlag: 1,
    //             couponText: "满" + res.activity_voucher[0].lowest_amount + "元减" + res.activity_voucher[0].voucher_amount + "元代金券",
    //             currentMoney: currentMoney,
    //             choicedCoupon: res.activity_voucher[0]
    //           })
    //         } else {  //有代金券，第一个代金券不可用
    //           var currentMoney = parseFloat(money).toFixed(2);
    //           that.setData({
    //             choiceFlag: 0,
    //             // redFlag1: 1,
    //             couponText: "不使用代金券",
    //             currentMoney: currentMoney
    //           })
    //         }
    //       } else {  //该用户无代金券
    //         var currentMoney = parseFloat(money).toFixed(2);
    //         that.setData({
    //           // redFlag1: 0,
    //           choiceFlag: 0,
    //           currentMoney: currentMoney
    //         })
    //       }
    //     } else {
    //       A.showTipModal(res.info || A.information.DATAFAIL)
    //     }
    //   }, err => {
    //     // wx.hideLoading();
    //     A.showTipModal(err.info || A.information.FAILREQ)
    //   })
      
    }
    //  else {   //未输入金额
    //   that.setData({
    //     redFlag: 0,
    //     // redFlag1: 0,
    //     money:0,
    //     currentMoney: 0.00,
    //     choiceFlag: 0,
    //   })
    // }
  },
  //弹出代金卷列表
  choiceCouponShow: function () {
    var that = this;
    if (that.data.activity_voucher.length > 0) {
      that.selectComponent("#couponList").open();
      //获取设备高度 使代金券列表弹出后 底层固定不能滑动
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            height: res.windowHeight + "px",
            fixed: 1
          })
        },
      })
    }else{
      return;
    }
   
  },
    //选择代金券
  choiceCoupon:function(e){
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.item.type;
    if(type == 1){
      this.setData({
        currentIndex: index,
        choicedCoupon: e.currentTarget.dataset.item //被选择的代金券信息
      })
    }
  },
  //确定选择代金券列表
  hidecouponList:function(){
    var that = this;
    var choicedCoupon = that.data.choicedCoupon;//获取被选中的代金券信息
    var couponText;
    var currentMoney;
    if (Object.keys(choicedCoupon).length === 0){  //未手动选择代金券
    //判断有代金券且第一个可用
      var activity_voucher = that.data.activity_voucher;
      var reduceMoney;//代金券金额
      if (activity_voucher.length > 0 && activity_voucher[0].type == 1){
        couponText = "满" + activity_voucher[0].lowest_amount + "元减" + activity_voucher[0].voucher_amount + "元代金券";
        reduceMoney = activity_voucher[0].voucher_amount;
        that.setData({
          choiceFlag: 1
        })
      }else{
        couponText = '不使用代金券';
        reduceMoney = 0;
        that.setData({
          choiceFlag: 0
        })
      }
      currentMoney = parseFloat(that.data.money - reduceMoney).toFixed(2);
    }else{ //手动选择了代金券
      couponText = "满" + choicedCoupon.lowest_amount + "元减" + choicedCoupon.voucher_amount + "元代金券";
      var reduceMoney = choicedCoupon.voucher_amount;//代金券金额
      currentMoney = parseFloat(that.data.money - reduceMoney).toFixed(2);
      that.setData({
        choiceFlag: 1
      })
    }
    that.setData({
      fixed:0,
      couponText: couponText,
      currentMoney: currentMoney
    })
    that.selectComponent("#couponList").cancel();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;    
    var goodsId = options.scene;
    that.setData({
      goods_id: goodsId
    })
    that.couponInfo(goodsId, that.data.money);
  },
  //查询用户代金券
  couponInfo(goodsId,money){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.couponbyUser(goodsId,money).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        that.setData({
          storename: res.storename,
          storelogo: res.storelogo,
          store_id: res.store_id,
          secs_price: res.secs_price,
					goods_id: res.goods_id,
					return_rate: res.return_rate,
          activity_voucher: res.activity_voucher
        })
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)
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