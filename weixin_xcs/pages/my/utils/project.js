import A from '../../../vwx/uset.js';
let _that = null,
   _this = this;

module.exports = {
   /**
    * 初始化
    */
   // 初始化data
   _set(val) {
      _that = val
   },

   /**
    * 加载列表
    */
   // 加载列表：不分页
   _loadList: function(opts) {
      return new Promise(function(resolve, reject) {
         wx.showLoading({
            title: '加载中'
         });
         const _d = _that.data;
         let method = opts.method || 'POST';
         let data = opts.data || {};
         A.updata.getTData({
            url: opts.url,
            method: method,
            data: data
         }).then(res => {
            wx.hideLoading();
            if (res.status == 1) {
               _that.setData({
                  list: res.list || res.evaluate_list || res.order_list || res.wuliu_list
               });
            } else if (res.status == 0) {
               _that.setData({
                  noList: true
               });
            } else {
               A.showTipModal(res.info);
            }
            resolve(res);
         }, err => {
            wx.hideLoading();
            reject(err)
            A.showTipModal(err.info)
         });
      })
   },
   // 加载列表:分页
   _loadListPaging(opts) {
      const _this = this;
      return new Promise(function(resolve, reject) {
         wx.showLoading({
            title: '加载中'
         });
         const _d = _that.data;
         let method = opts.method || 'POST',
            data = opts.data || {};
        A.updata.getTData({
            url: opts.url,
            method: method,
            data: data
         }).then(res => {
            wx.hideLoading();
            if (res.status == 1) {
               if (res.all_paging == 0 || res.all_pages == 0) {
                  _that.setData({
                     noList: true
                  });
                  return;
               }
               if (res.paging >= (res.all_paging || res.all_pages)) {
                  _that.setData({
                     isLastPage: true
                  });
               }
               let list = _d.list || [];
               let newList = list.concat(res.list || res.evaluate_list || res.order_list);
               _that.setData({
                  pageCount: res.all_paging || res.all_pages,
                  pageNum: res.paging,
                  list: newList
               });
            } else if (res.status == 0) {
               _that.setData({
                  noList: true
               });
            } else {
               A.showTipModal(res.ifno);
            }
            resolve(res);
         }, err => {
            wx.hideLoading();
            reject(err);
            A.showTipModal(err.info)
         });
      })
   }
}