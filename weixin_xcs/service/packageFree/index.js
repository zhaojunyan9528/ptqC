// 获取A对象
import A from '../../vwx/uset.js'

// 过滤不存在商家ID的请求
module.exports = {
  //代金券列表
  couponList(pageNum,flag){
    pageNum = pageNum || 1;
    return this.getTData({
      url:'/WeChatAppsCs/ActivityVoucher/list',
      data: { pageNum, flag}
    });
  },
  //活动明细列表
  activiDetails(initiator_id, type,paging) {
    initiator_id = initiator_id || 1;
    paging = paging || 1;
    return this.getTData({
      url: '/WeChatAppsCs/ScratchAward/scratch_detail',
      data: { initiator_id, type, paging}
    });
  },
  //刮奖免单页面数据
  getFreeDeal:function(id){
    return this.getTData({
      url: "/WeChatAppsCs/query/Initiator",
      data: { initiatorId: id },

    })
  },
  //刮奖免单页面顶部轮询
  getFreeTop: function (id) {
    return this.getTData({
      url: "/WeChatAppsCs/query/InitiatorBar",
      data: { part_id: id }
    })
  },
  //刮奖战绩

  getFreeRecord: function (id) {
    return this.getTData({
      url: "/WeChatAppsCs/query/Scraping_awards",
      data: { initiatorId: id },
    })
  },
  //刮到的結果
  getRecordAcount: function (id) {
    return this.getTData({
      url: "/WeChatAppsCs/ScratchAward/scratchInfo",
      data: { initiatorId: id },
    })
  },
  // 查询用户代金券
  couponbyUser(goodsId, amount){
    amount = amount || 0;
    return this.getTData({
      url:'/WeChatAppsCs/list/ActivityVoucher',
      data: { goodsId, amount}
    })
  },
  //刮奖免单支付
  requestPay(goodsId, voucherId, payAmount){
    return this.getTData({
      url: '/WeChatAppsCs/ScratchActivity/Pay',
      data: { 
        goodsId,
        voucherId,
        payAmount
      }
    })
  },
  //获取刮奖发起人id
  getInitiatorId(goodsId,userId) {
    return this.getTData({
      url: '/WeChatAppsCs/getInitiatorId',
      data: {
        goodsId,
        userId
      }
    })
  },
  //统计分享
  acountShareNum(id,type){
   
    return this.getTData({
      url: '/WeChatAppsCs/Scratch/shareViews',
      data: {id,type}
    })
  },
  //是否收集过手机号
  userHasPhone() {

    return this.getTData({
      url: '/WeChatAppsCs/StoreCustomer/query',
     
   
    })
  },
  //提交手机号
  conmitPhnoe(storeId, telephone) {

    return this.getTData({
      url: '/WeChatAppsCs/StoreCustomer/save',
      data: { storeId: storeId, telephone: telephone }
   
    })
  },
}