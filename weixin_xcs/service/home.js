// 获取A对象
import A from '../vwx/uset.js'

// 过滤不存在商家ID的请求
const filterSore = function(_promise) {
   if (A.DB.user.sid == "" && A.DB.user.sid != 0) {
      return A.promiseReject("缺少商户ID");
   } else {
      return _promise;
   }
}
module.exports = {
   //店铺基本信息
   getMember(store_id) {
      store_id = store_id || 0;
      return new Promise((resolve, reject) => {
         this.getTData({
            url: '/WeChatAppsCs/Member/index',
            data: {
               store_id
            }
         }).then(res => {
            if (res.status == A.STATE.STATUS.OK) {
               resolve(res);
               A.DB.user.sid = res.store_info.store_id;
               A.DB.user.uid = res.user_id
            } else {
               resolve(res)
            }
         }, rej => {
            reject(rej)
         })
      })
   },
   // 本店特惠活动的列表
   getMemberPointSpecialsList(_paging) {
      _paging = _paging || 1;
      return filterSore(this.getTData({
         url: '/WeChatAppsCs/MemberPoint/specials_list',
         data: {
            store_id: A.DB.user.sid,
            paging: _paging
         }
      }));
   },
   // 当前店铺团购活动
   getMemberPointGroupList(_paging) {
      _paging = _paging || 1;
      return filterSore(this.getTData({
         url: '/WeChatAppsCs/MemberPoint/group_list',
         data: {
            store_id: A.DB.user.sid,
            paging: _paging
         }
      }));
   },
   // 商盟的特惠活动
   getMemberPointAllySpecialsList(_paging) {
      _paging = _paging || 1;
      return filterSore(this.getTData({
         url: '/WeChatAppsCs/MemberPoint/ally_specials_list',
         data: {
            store_id: A.DB.user.sid,
            paging: _paging
         }
      }));
   },
   //商盟的团购活动
   allyActivityInfo: function(_paging) {
      _paging = _paging || 1;
      return filterSore(
         this.getTData({
            url: '/WeChatAppsCs/MemberPoint/ally_group_list',
            data: {
               store_id: A.DB.user.sid,
               paging: _paging
            }
         })
      )
   },
   //点击取消/关注
   getMemberPointAattention(_is_attention) {
      _is_attention = _is_attention || 2;
      return filterSore(this.getTData({
         url: '/WeChatAppsCs/MemberPoint/attention',
         data: {
            store_id: A.DB.user.sid,
            user_id: A.DB.user.uid,
            is_attention: _is_attention
         }
      }));
   },
   setErrorlog(page,val) {
      return this.getTData({
         url: 'https://clog.pintuanqu.cn:91/log/add',
         data: {
            url: page,
            unid: A.user.unid,
            src: 2,
            content: val
         }
      })
   }
}