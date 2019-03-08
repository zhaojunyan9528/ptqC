const BASE = require('../../../pages/my/utils/base.js');
// 获取A对象
import A from '../../../vwx/uset.js'

// 过滤不存在商家ID的请求
module.exports = {
   //可用专享卡列表
  getCardList(paging) {
    paging = paging || 1;
   return this.getTData({ url: '/WeChatAppsCs/MemberCard/card_list', data: { paging } });
    
  },

  //失效专享卡列表
  getCardLoseList(paging) {
    paging = paging || 1;
      return this.getTData({ url: '/WeChatAppsCs/MemberCard/card_lose_list', data: { paging } });
   
  },

  //专享卡列表详情
  getCardInfo(card_id) {
    if (card_id) {
      return this.getTData({ url: '/WeChatAppsCs/MemberCard/card_info', data: { card_id } });
    } else {
      return A.promiseReject("缺少专项卡id");
    }
  },

  //商品专享卡详情
  getCardInfoGoods(card_id) {
    if (card_id) {
      return this.getTData({ url: '/WeChatAppsCs/MemberGoods/card_info', data: { card_id } });
    } else {
      return A.promiseReject("缺少专项卡id");
    }
  },

  //消费记录列表
  getUseCardList(paging,card_id){
    if(card_id){
      paging = paging || 1;
      return this.getTData({ url: '/WeChatAppsCs/MemberCard/use_card_list', data: { paging, card_id } });
    }else{
      return A.promiseReject("缺专享卡id");
    }
  }
}