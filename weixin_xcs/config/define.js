// 状态类描述定义
const state = require('state.js')
module.exports = {
   DF: {
      FANS: "客粉数",
      ERROR: {
         [state.STATUS.ERROR]: '提交失败！',
         '提交失败！': [state.STATUS.ERROR],
         [state.STATUS.IDEN]: '用户身份验证失败！',
         '用户身份验证失败！': [state.STATUS.IDEN],
         [state.STATUS.TOKEN]: '登录过期，请重新登录！',
         '登录过期，请重新登录！': [state.STATUS.TOKEN],
         [state.STATUS.NO]: '找不到页面！',
         '找不到页面！': [state.STATUS.NO]
      },
      OrderStatus: {
         0: '全部',
         '全部': 0,
         1: '待成团',
         '待成团': 1,
         2: '待发货',
         '待发货': 2,
         3: '待收货',
         '待收货': 3,
         4: '待评价',
         '待评价': 4,
         5: '完成',
         '完成': 5,
         6: '待使用',
         '待使用': 6,
         10: '过期',
         '订单过期': 10
      },
      is_authentication: {
         YES: 1
      },
      ActsType: {
         1: {
            name: '拼团立减',
            iconClass: 'icon-pq-tgfx',
            iconColor: '#ff4949',
            priceLabel: '最低价'
         },
         3: {
            name: '多人拼团',
            iconClass: 'icon-pq-drpt',
            iconColor: '#ff5581',
            priceLabel: '拼团价'
         },
         4: {
            name: '限时专享',
            iconClass: 'icon-pq-xxyh',
            iconColor: '#ffa625',
            priceLabel: '优惠价'
         },
          5: {
            name: '刮奖免单',
            iconClass: '',
            iconColor: '',
            priceLabel: ''
          }
      },
      Payment: {
         1: '余额',
         2: '微信',
         3: '支付宝',
         '余额': 1,
         '微信': 2,
         '支付宝': 3
      },
    //  // 请求结果类
    //  RES_BREAK: '请求中断,请返回上级页面后重新进入',
    //  RES_NULL: '网络错误,请重新登录!',
    //  RES_600: '登录过期，请重新登录!',
    //  RES_233: '请前往绑定',
    //  RES_333: '您的商家身份已被禁用',
    //  RES_AUTH: '您已成功提交认证！审核期间，工作人员会致电与您核对相关信息，请注意接听电话！',
   },
   STATE: state
}