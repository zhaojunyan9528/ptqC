import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'
// 过滤不存在商家ID的请求
module.exports = {

  //收货地址列表
  getAddressList(paging){
    paging = paging || 1;
      return this.getTData({ url: '/WeChatAppsCs/Address/address_list', data: { paging } });
  },

  //添加收货地址
  addAddress(address_id, consignee, telephone, province, city, country, place, is_default){
    if (address_id) {
      address_id = address_id || 0;
      return this.getTData({ url: '/WeChatAppsCs/Address/add_address', data: { address_id, consignee, telephone, province, city, country, place, is_default} });
    } else {
      return A.promiseReject("缺少地址id");
    }
  },

  //编辑收货地址详情
  editAddressInfo(address_id){
    if (address_id) {
      address_id = address_id || 0;
      return this.getTData({ url: '/WeChatAppsCs/Address/address_info', data: { address_id } });
    } else {
      return A.promiseReject("缺少地址id");
    }
  },

  //收货地址编辑保存
  editAddressSave(address_id, consignee, telephone, province, city, country, place, is_default) {
    if (address_id){
      return this.getTData({ url: '/WeChatAppsCs/Address/edit_address', data: { address_id, consignee, telephone, province, city, country, place, is_default } });
    } else {
      return A.promiseReject("缺少地址id");
    }
  },

  //删除地址
  deleteAddress(address_id){
    if (address_id) {
      return this.getTData({ url: '/WeChatAppsCs/Address/del_address', data: { address_id} });
    } else {
      return A.promiseReject("缺少地址id");
    }
  }
}