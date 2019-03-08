
module.exports = {
  //关注列表
 
  MemberAttention: function (paging) {

    paging = paging||1;
    return this.getTData({
      url: "/WeChatAppsCs/MemberAttention/attention_index",
      data: { paging: paging },
    
    })

  },
  //取消关注
  MemberAttentionCancel: function (paging,id) {
    paging = paging || 1;
    return this.getTData({
      url: "/WeChatAppsCs/MemberAttention/cancel_attention",
      data: { paging: paging,store_ids: id },
    })

  },
  //点击取消/关注接口
  MemberPoint: function (store_id, user_id, is_attention) {
    return this.getTData({
      url: "/WeChatAppsCs/MemberPoint/attention",
      data: { store_id: store_id, user_id: user_id, is_attention: is_attention },
    })

  },
  //获取逛逛列表
  GetStrollInfo: function ( longitude, latitude, sort_type, keyword, paging) {

    var store_id = wx.getStorageSync('store_id');
    paging = paging || 1;
    return this.getTData({
      url: "/WeChatAppsCs/Stroll/stroll",
      data: {
        store_id: store_id || 0,
        longitude: longitude,
        latitude: latitude,
        sort_type: sort_type,
        keyword: keyword,
        paging: paging,
     
      },
    })

  },
  //获取所有店铺列表用于地图显示
  GetStrollStoreMapList: function (latitude, longitude, paging){
   
    paging = paging || 1;
    return this.getTData({
      url: "/WeChatAppsCs/Stroll/stroll_store",
      data: {
        longitude: longitude,
        latitude: latitude,
        paging: paging,
      },
    })
   
  },
  //获取逛逛历史记录列表
  getStrollKeyword: function (paging){

    paging = paging || 1;
    return this.getTData({
      url: "/WeChatAppsCs/Stroll/stroll_keyword",
      data: { paging: paging }
    })

    
  },  //获取拼团立减详情
  getGroupInfo: function (goods_id, group_id, recommend_id) {
    var group_id = parseInt(group_id) || 0;
    return this.getTData({
      url: "/WeChatAppsCs/MemberGoods/group",
      data: { goods_id: goods_id, group_id: group_id, recommend_id}
    })
  },
  //购买下次是否弹窗
  goodsVerify: function (is_remind, goods_id){
      return this.getTData({
        url:'/WeChatAppsCs/MemberGoods/goods_verify',
        data: { is_remind: is_remind, goods_id: goods_id}
      })
  },
  changeIdentity:function(){
    return this.getTData({
      url: '/WeChatAppsCs/IdentityCut/index',
      data: {  }
    })
  },
  // 判断是否有登陆权限的接口
  identityVerify: function (upidentity){
    return this.getTData({
      url: '/WeChatAppsCs/IdentityCut/index',
      data: { upidentity: upidentity}
    })
  },
  //是否关注公众号

 getAttationwx:function() {
    return this.getTData({ url: '/WeChatAppsCs/Member/attation' });
  },
 
  getEvaluateNumber: function (order_id) {
     return this.getTData({ 
       url: '/WeChatAppsCs/MemberMy/evaluate' ,
       data: { order_id: order_id }
     
     });
  },
  //申请商家入驻
  registered: function (store_id) {
    return this.getTData({ url: '/WeChatAppsCs/distributor/getInfo',
      data: { storeId: store_id }
    });
  },

  //获取手机号 

  getPhoneNumber: function (encryptedData, iv) {
    return this.getTData({
      url: "/WeChatAppsCs/StoreCustomer/decrypt",
      data: { encryptedData: encryptedData, iv: iv },
    })
  },

  //解锁拼团中
  unlock:function(group_id){
    return this.getTData(
      {
        url:'/WeChatAppCs/WeChatPay/clear_lock',
        data:{
          group_id:group_id
        }
      }
    )
  },
  //支付后订单是否生成 

  getIsOrder: function (orderId) {

    return this.getTData({
      url: "/WeChatAppsCs/MemberShare/judge",
      data: { orderId: orderId},
    })
  },
  //删除逛逛历史记录
  deleteNearShopList:function(){
    return this.getTData({
      url: "/WeChatAppsCs/Stroll/hideSearchHis",
      data:{}
    })
  }

}


