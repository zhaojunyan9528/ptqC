// pages/my/wallet/balance/list.js
const BASE = require('../../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    balanceType: '', // 0收入，1支出
    type: '', // 类型：0充值，1提现，2收入，3支出，4提现失败，5退款 
    items: [], // 显示项数组
  },
  onLoad: function (opts) {
    const _that = this, _d = _that.data;

    // 参数
    if(opts.id){ _that.setData({ id: opts.id }) }

    // 加载初始数据：首页菜单
    _that.setData({
      typeArr: BASE.DATA.balanceDetailType,
      itemArr: BASE.DATA.balanceDetailItemList,
      typeItemArr: BASE.DATA.balanceDetailTypeItem
    });

    // 加载初始数据
    BASE.PRO._set(this);
  },
  onShow: function () {
    const _that = this, _d = _that.data;

    // 获取余额明细列表
    _that.getBalanceDetail();

  },

  // 获取余额明细列表
  getBalanceDetail: function () {
    const _that = this, _d = _that.data;
    A.updata.balanceDetail(_that).then(res => { 
      if(res.status == A.STATE.STATUS.OK){
        let data = res.list;
        let balanceType = data.type == 1 ? 0 : 1,
            type = data.genre, 
            typeTxt = BASE.DATA.balanceDetailType[type],
            itemsIdx = BASE.DATA.balanceDetailTypeItem[type], // 要显示项编号
            allItems = BASE.DATA.balanceDetailItemList, // 所有情况所有明细项
            items = [];
        for (let i = 0, len = allItems.length; i < len; i++){
          if (itemsIdx.indexOf(i) > -1){
            let item = allItems[i];
            if (i == 0) { item.value = BASE.DATA.balanceDetailType1[type] }
            else if (i == 4) { item.value = A.DF.ActsType[data[item.field]].name }
            else if (i == 6) { item.value = A.DF.Payment[data[item.field]] + '支付'}
            else { item.value = data[item.field] }
            items.push(item);
          }
        }
        _that.setData({
          info: data,
          balanceType: balanceType,
          type: type,
          typeTxt: typeTxt,
          items: items
        });
 
      } else { A.showTipModal(res.info || A.information.DATAFAIL) }
    }, err => { A.showTipModal(err.info || A.information.FAILREQ) });
  }
}))