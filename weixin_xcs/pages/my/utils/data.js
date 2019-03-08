/**
 * 首页
 */
// 菜单-悬浮框
let myHomeShortcutList = [
  {
    iconClass: 'icon-pq-collection',
    iconColor: '#FFC87A',
    iconSize: '50rpx',
    text: '收藏',
    textSize: '28rpx',
    value: 'collection',
    navUrl: 'collection/index'
  }, {
    iconClass: 'icon-pq-order',
    iconColor: '#FF8B67',
    iconSize: '60rpx',
    text: '订单',
    textSize: '28rpx',
    value: 'order',
    navUrl: 'order/index'
  }, {
    iconClass: 'icon-pq-evaluate',
    iconColor: '#71BFF1',
    iconSize: '50rpx',
    text: '评价',
    textSize: '28rpx',
    value: 'evaluation',
    navUrl: 'evaluation/index'
  }
];
// 菜单-列表
let myHomeList = [
  [{
    iconClass: 'icon-pq-wallet',
    iconColor: '#FFD556',
    iconSize: '40rpx',
    text: '钱包',
    value: 'wallet',
    optTxt: '',
    navUrl: 'wallet/index'
  }],
  [{
    iconClass: 'icon-pq-dfx',
    iconColor: '#FF8275',
    iconSize: '40rpx',
    text: '待分享活动',
    value: 'inSharingActs',
    optTxt: '',
    navUrl: 'inSharingActs/index'
  }, {
    iconClass: 'icon-pq-mycard',
    iconColor: '#FF8275',
    iconSize: '40rpx',
    text: '我的专享卡',
    value: 'specialCard',
    optTxt: '',
    navUrl: 'specialCard/index'
  }, {
    iconClass: 'icon-pq-zuji',
    iconColor: '#FFC87A',
    iconSize: '40rpx',
    text: '我的足迹',
    value: 'footprint',
    optTxt: '',
    navUrl: 'footprint/index'
  }],
  [{
    iconClass: 'icon-pq-address',
    iconColor: '#FF8275',
    iconSize: '40rpx',
    text: '收货地址',
    value: 'address',
    optTxt: '',
    navUrl: 'address/index'
  }, {
    iconClass: 'icon-pq-qhsf',
    iconColor: '#FF8275',
    iconSize: '40rpx',
    text: '切换身份',
    value: 'changeRole',
    optTxt: '',
    navUrl: 'changeRole/index'
  }]
];

/**
 * 订单
 */
// 首页-订单不同状态
let orderTypeList = [{
  iconClass: 'icon-pq-dct',
  iconColor: '#fe8a5d',
  iconSize: '65rpx',
  text: '待成团',
  url: 'list/list?type=1'
}, {
  iconClass: 'icon-pq-dfh',
  iconColor: '#ff6a7b',
  iconSize: '75rpx',
  text: '待发货',
  url: 'list/list?type=2'
}, {
  iconClass: 'icon-pq-dsy',
  iconColor: '#ff9a4f',
  iconSize: '70rpx',
  text: '待使用',
  url: 'list/list?type=6'
}, {
  iconClass: 'icon-pq-dshh',
  iconColor: '#ff6d5e',
  iconSize: '65rpx',
  text: '待收货',
  url: 'list/list?type=3'
}];

/**
 * 钱包
 */
// 余额明细详情类型
let balanceDetailType = ['充值', '提现', '收入', '支出', '提现失败', '退款', '刮奖免单返还'];
let balanceDetailType1 = ['充值', '提现', '收入', '支出', '提现失败', '退款', '收入'];
// 余额明细详情数据项
let balanceDetailItemList = [{
  index: 0,
  field: '',
  label: '类型',
  value: '',
}, {
  index: 1,
  field: 'create_at',
  label: '时间',
  value: '',
}, {
  index: 2,
  field: 'order_no',
  label: '订单号',
  value: '',
}, {
  index: 3,
  field: 'bill_no',
  label: '流水号',
  value: '',
}, {
  index: 4,
  field: 'is_group',
  label: '活动类型',
  value: '',
}, {
  index: 5,
  field: 'goods_name',
  label: '活动名称',
  value: '',
}, {
  index: 6,
  field: 'pay_way',
  label: '支付渠道',
  value: '',
}, {
  index: 7,
  field: 'message',
  label: '备注',
  value: '',
}];
// 余额明细详情类型对应要显示的余额明细详情数据项
let balanceDetailTypeItem = [
  [0, 1, 3, 6],
  [0, 1, 2, 6, 7],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 3, 7],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 6],
];
// 提现方式
let WithdrawDepositWay = [{
  index: 0,
  iconClass: 'icon-pq-WeChat', // icon
  iconSize: '60rpx',
  iconColor: '#259b24',
  txt: '微信', // 提现方式
  rate: 0, // 手续费费率
  minSum: 10, // 最低金额
  rule: "单日、单笔限额￥20000.00，微信未实名认证用户无法成功提现，暂无手续费。最低提现金额￥10。", // 规则
  serviceMinCharge: 0, // 最低手续费
  serviceMaxCharge: 0, // 最高手续费
  active: true // 当前是否可用
},{
  index: 1,
  iconClass: 'icon-pq-Alipay',
  iconSize: '60rpx',
  iconColor: '#56abe4',
  txt: '支付宝',
  rate: 0.50,
  minSum: 10,
  rule: "支付宝扣费规则：单笔费率 0.5%,最低 1 元\/笔,最高 25 元\/笔。最低提现金额 10元。",
  serviceMinCharge: 1,
  serviceMaxCharge: 25,
  active: false
}]

module.exports = {
  // 首页
  myHomeShortcutList, myHomeList,
  // 订单
  orderTypeList,
  // 钱包
  balanceDetailType, balanceDetailType1, balanceDetailItemList, balanceDetailTypeItem, WithdrawDepositWay
};