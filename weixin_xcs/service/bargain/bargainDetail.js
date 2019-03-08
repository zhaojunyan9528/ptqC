
module.exports = {
  //关注列表 bargain是砍价活动id。
  getBargainDetail: function (bargainId) {
    return this.getTData({
      url: "/WeChatAppsCs/bargainInfo/info",
      data: { bargainId: bargainId },
    })
  },
  //获取手机号 

  getPhoneNumber: function (encryptedData, iv) {
    return this.getTData({
      url: "/WeChatAppsCs/StoreCustomer/decrypt",
      data: { encryptedData: encryptedData, iv: iv },
    })
  },
  //获取音乐id bargain是砍价活动id。
  getMusicId: function (bargainId){
    return this.getTData({
      url: "/WeChatAppsCs/bargainInfo/bgMusic",
      data: { bargainId: bargainId},
    })
  },
  // 帮忙砍价 bargain是砍价活动id。
  helpFriendBargain: function (bargainId){
    return this.getTData({
      url: "/WeChatAppsCs/bargainInfo/cutMoney",
      data: { bargainId: bargainId },
    })
  },
  //实时刷新砍价 bargain是砍价活动id。
  allBargainInfoLoop: function (bargainId){
    return this.getTData({
      url: "/WeChatAppsCs/bargainInfo/poll",
      data: { bargain_id: bargainId },
    })
  },
// sharImage  bargain是砍价活动id。goods是商家发起活动id
  getShareImage: function (bargainId, goodsId){
    return this.getTData({
      url: "/WeChatAppsCs/bargainInfo/shareImg",
      data: { bargainId: bargainId, goodsId: goodsId},
    })
  },
  // 新增baegain活动 goodsId活动id
  addBargainGood: function (goodsId, sharerId){
    return this.getTData({
      url: "/WeChatAppsCs/bargain/add",
      data: { goodsId: goodsId, sharerId},
    })
  },
  
}


