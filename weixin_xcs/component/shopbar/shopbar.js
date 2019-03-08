// component/shopBar/shopBar.js
const A = getApp();
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      // 店铺信息
      store: {
         type: Object,
         observer: function() {}
      },
      is_phone:{
        type:Boolean,
        value:false
      },
      //商品信息
      goods: {
         type: Object,
         value: {},
         observer: function(a, b) {}
      },
      //多人团购信息
      group: {
         type: Object,
         observer: function() {}
      },
      // 用户信息
      user: {
         type: Object,
         observer: function(a, b) {
        
           if (a.is_collect != undefined && a.is_collect!= null )
            this.setData({
               is_collect: a.is_collect
            })
         }
      },
      //商品价格
      price: {
         type: String,
         value: '0.00'
      },
      buyTxt: {
         type: String,
         value: "立即购买"
      },
      //活动状态
      type: {
         type: Number,
         value:0
      },
      //活动类型
      is_group: {
         type: String,
         value: ''
      },
  
     shareGroup:{
       type: Number,
     }

      
   },
   data: {

   },
   /**
    * 组件的方法列表
    */
   methods: {
     //前往店铺
     storebutton: function (e) {
        var storeid = e.currentTarget.dataset.storeid;
       console.log(e.currentTarget.dataset.storeid)
        this.triggerEvent("storebutton",storeid)
     },
      //收藏
     aboutBtn(e) {
       var goods_id = e.currentTarget.dataset.goodsid;
       var store_id = e.currentTarget.dataset.storeid;
       A.updata.upMemberPointCollect(goods_id, store_id).then(res => {
         if (res.status == 1) {
           this.setData({
             is_collect: !this.data.is_collect
           });
         }
       }, err => { });
     },
      // 点击拨打电话
      callPhone(e) {
         var phone = this.data.store.telephone;
         wx.makePhoneCall({
            phoneNumber: phone
         })
      },
      //点击购买
      goBuy: function(e) {
        let is_group = e.currentTarget.dataset.type;
        if (is_group != 6){
          var groupid = e.currentTarget.dataset.groupid;
          var is_remind = e.currentTarget.dataset.is_remind;
          var goodsid = e.currentTarget.dataset.goodsid;

          var dateil = {};
          dateil.group_id = groupid;
          dateil.is_remind = is_remind;
          dateil.goods_id = goodsid;
          this.triggerEvent("goBuy", dateil)
        }
      },
      // 点击报名
     goBargain:function(){
       this.triggerEvent("goBargain")
     },
      //展示是否下次提示弹窗
      showPay: function (e) {
        this.triggerEvent("showPay")
      },

      // 我要报名
     getPhoneNumber: function(e){
       console.log(e);
       this.triggerEvent("getPhoneNumber",e.detail)
     }
   }
})