// 获取A对象
import A from '../../vwx/uset.js'

// 过滤不存在商家ID的请求
module.exports = {
  // 查询用户是否录入过手机号
  search(unionid){
    return this.getTData({
      url:'/WeChatAppsCs/StoreCustomer/query',
      data: { unionid}
      });
  },
  // 获取手机号
  getPhoneNum(encryptedData, iv) {

    return this.getTData({ url: '/WeChatAppsCs/StoreCustomer/decrypt', data: { encryptedData, iv } });
  },
   // 限时优惠详情
  getMemberGoodsSale(goods_id, group_id, recommend_id) {
      
      if (goods_id) {
        group_id = parseInt(group_id) || 0;
        return this.getTData({ url: '/WeChatAppsCs/MemberGoods/sale', data: { goods_id, group_id, recommend_id} });
      } else {
         return A.promiseReject("缺少商品id");
      }
   },
   // 多人拼团返现详情
  getMemberGoodsPeopleGroup(goods_id, group_id, recommend_id) {
      if (goods_id) {
        group_id = parseInt(group_id)  || 0;
        
        return this.getTData({ url: '/WeChatAppsCs/MemberGoods/people_group', data: { goods_id, group_id, recommend_id } });
      
        
      } else {
         return A.promiseReject("缺少商品id");
      }
   },
   // 多人拼团返现详情
   getPeopleGroupFive(goods_id) {
      if (goods_id) {
         return this.getTData({ url: '/WeChatAppsCs/MemberPoint/people_group_list_five', data: { goods_id } });
      } else {
         return A.promiseReject("缺少商品id");
      }
   },
   // 拼团立减详情
  // getMemberGoodsGroup(goods_id, group_id, recommend_id) {
  //     if (goods_id) {
  //         var group_id = group_id || 0;
  //       return this.getTData({ url: '/WeChatAppsCs/MemberGoods/group', data: { goods_id, group_id, recommend_id} });
  //     } else {
  //        return A.promiseReject("缺少商品id");
  //     }
  //  },
   // 评价列表
   getEvaluateList(goods_id, paging) {
      if (goods_id) {
         paging = paging || 1;
         return this.getTData({ url: '/WeChatAppsCs/MemberPoint/evaluate_list', data: { goods_id, paging } });
      } else {
         return A.promiseReject("缺id");

      }
   
  },
  // 赚红包记录
  getMakePackget(goodsId, paging) {
    if (goodsId) {
      paging = paging || 1;
      return this.getTData({ url: '/WechatApi/redEarning/list', data: { goodsId, paging } });
    } else {
      return A.promiseReject("缺id");

    }

  },
  //赚红包二维码
  redCode(goodsId, groupId,is_red){
    if (goodsId){
      return this.getTData({
        url: '/WechatApi/redEarning/qrcode',
        data: {
          goodsId, groupId, is_red
        }
      });
    }
    
  },
  // 砍价详情
  getBarginDetails(goods_id, group_id, recommend_id) {
    if (goods_id) {
      group_id = parseInt(group_id) || 0;
      return this.getTData({
        url: '/WeChatAppsCs/MemberGoods/bargain',
        data: {
          goods_id,
          group_id,
          recommend_id
        }
      });
    } else {
      return A.promiseReject("缺少商品id")
    }
  },
  // 限时优惠详情
  // getMemberGoodsSale(goods_id, group_id) {

  //   if (goods_id) {
  //     group_id = parseInt(group_id) || 0;
  //     return this.getTData({
  //       url: '/WeChatAppsCs/MemberGoods/sale',
  //       data: {
  //         goods_id,
  //         group_id
  //       }
  //     });
  //   } else {
  //     return A.promiseReject("缺少商品id");
  //   }
  // },
  // 多人拼团返现详情
  // getMemberGoodsPeopleGroup(goods_id, group_id) {
  //   if (goods_id) {
  //     group_id = parseInt(group_id) || 0;

  //     return this.getTData({
  //       url: '/WeChatAppsCs/MemberGoods/people_group',
  //       data: {
  //         goods_id,
  //         group_id
  //       }
  //     });


  //   } else {
  //     return A.promiseReject("缺少商品id");
  //   }
  // },
  // 多人拼团返现详情
  getPeopleGroupFive(goods_id) {
    if (goods_id) {
      return this.getTData({
        url: '/WeChatAppsCs/MemberPoint/people_group_list_five',
        data: {
          goods_id
        }
      });
    } else {
      return A.promiseReject("缺少商品id");
    }
  },
  // 拼团立减详情
  // getMemberGoodsGroup(goods_id, group_id) {
  //   if (goods_id) {
  //     var group_id = group_id || 0;
  //     return this.getTData({
  //       url: '/WeChatAppsCs/MemberGoods/group',
  //       data: {
  //         goods_id,
  //         group_id
  //       }
  //     });
  //   } else {
  //     return A.promiseReject("缺少商品id");
  //   }
  // },
  // 评价列表
  getEvaluateList(goods_id, paging) {
    if (goods_id) {
      paging = paging || 1;
      return this.getTData({
        url: '/WeChatAppsCs/MemberPoint/evaluate_list',
        data: {
          goods_id,
          paging
        }
      });
    } else {
      return A.promiseReject("缺id");
    }
  },
  // 凑团请求信息
  getPeopleGroup(group_id) {
    if (group_id) {
      return this.getTData({
        url: '/WeChatAppsCs/MemberPoint/is_people_group',
        data: {
          group_id
        }
      });
    } else {
      return A.promiseReject("缺少拼团id");
    }
  },
  // 收藏活动
  upMemberPointCollect(goods_id, store_id) {

    if (goods_id) {
      store_id = store_id || 0;
      if (A.user.uid) {
        return this.getTData({
          url: '/WeChatAppsCs/MemberPoint/is_collect',
          data: {
            goods_id,
            store_id,
            user_id: A.user.uid
          }
        });
      } else {
        this.mySelfInfo().then(res => {

          if (res.status == 1) {
            A.user.uid = res.info.user_id;
            return this.getTData({
              url: '/WeChatAppsCs/MemberPoint/is_collect',
              data: {
                goods_id,
                store_id,
                user_id: res.info.user_id
              }
            });
          }
        }, err => {

        })
      }
    } else {
      return A.promiseReject("缺少活动ID");
    }
  },
  // 下单详情界面
  getOrderData(params) {
    if (params.goodsId) {
      return this.getTData({
        url: '/WeChatAppsCs/WeChatPay/Order',
        data: {
          bargin_id: params.barginId,
          goods_id: params.goodsId,
          order_num: params.orderNum || 1,
          group_id: params.groupId,
          address_id: params.addressId,
        //   sharer_id: params.sharer_id
            share_id: params.share_id
        }
      });
    } else {
      return A.promiseReject("缺少商品id");
    }
  },
  // 根据数量获取邮费
  getFare(_that) {
    if (_that.goodsNum || _that.goodsNum == 0) {
      return this.getTData({
        url: '/WeChatAppsCs/MemberGoods/calculateFreight',
        data: {
          goods_id: _that.goodsInfo.goods_id,
          goods_nums: _that.goodsNum,
          goods_price: _that.goodsInfo.goods_price,
          address_id: _that.addressInfo.id || 0
        }
      });
    } else {
      return A.promiseReject("请先设置购买数量");
    }
  },
  // 提交订单信息
  submitOrderInfo: function(data) {
    let url = '/WeChatAppsCs/NewWeChatPay/order_do';
    if (data.is_group == 6){
      url = '/WeChatAppsCs/bargain/order/confirm';
    }
    return this.getTData({
      url: url,
      data: {
        id: data.id,
        goods_id: data.goodsId,
        hx_name: data.userInfo.hx_name,
        hx_tel: data.userInfo.hx_tel,
        address_id: data.addressId,
        pay_type: data.payType,
        remark: data.remark,
        order_num: data.orderNum,
        group_id: data.groupId,
        genre: data.genre,
        account_id: data.staffInfo.account_id || 0,
		  sharer_id: data.share_id || 0,
        now_number: data.now_number || 0,
        // sharer_id: data.sharer_id
         
      }
    });
  },


}