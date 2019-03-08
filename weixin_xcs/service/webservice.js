// web service api 业务处理
import A from '../vwx/uset.js'

// 此模块用于扩展updata功能
const home = require('home.js');
const goods = require('goods/goods.js');
const atten = require('atten.js')
const myIndex = require('my/index.js');
const myApplyStoreAccoIndex = require('my/applyStoreAccount/index.js');
const myPIIndex = require('my/personalInfo/index.js');
const myPIeditName = require('my/personalInfo/editName.js');
const myColIndex = require('my/collection/index.js');
const myOrderIndex = require('my/order/index.js');
const myOrderList = require('my/order/list.js');
const myOrderDetail = require('my/order/detail.js');
const myOrderEvaluate = require('my/order/evaluate.js');
const myOrderLogistics = require('my/order/logistics.js');
const myEvaluationIndex = require('my/evaluation/index.js');
const myWalletIndex = require('my/wallet/index.js');
const myWalletBalance = require('my/wallet/balance.js');
const myWalletWithdrawDeposit = require('my/wallet/withdrawDeposit.js');
const myInSharingActsList = require('my/inSharingActs/list.js');
const myInSharingActsShare = require('my/inSharingActs/share.js');
const myFootprint = require('my/footprint/index.js');
const myAddress = require('my/address/index.js');
const mySpecialCard = require('my/specialCard/index.js');
const myHomeIndex = require('my/indexHome/index.js');
const myStroeIndex = require('my/storeIndex/index.js');
const myPackageFree = require('packageFree/index.js');
const bargain = require('bargain/bargainDetail.js');
module.exports = {
   getTData(_val) {
      return new Promise((resolve, reject) => {
         A.RS(_val).then(res => {
            if (!res.status && res.status != A.STATE.STATUS.ERROR) {
               wx.hideLoading();
               A.showTipModal(res.info || A.DF.RES_NULL, () => {
                  A.goPrower();
               })
               return
            } else if (res.status == A.STATE.STATUS.ERROR) { // 0
               resolve(res);
               return
            } else if (res.status == A.STATE.STATUS.TOKEN || res.status == A.STATE.STATUS.AUTH) { // 600
               wx.hideLoading();
              //  A.showModal({
              //     content:  A.DF.RES_600,
              //     showCancel: false,
              //     confirmText: '重新登录',
              //     txtAlign:'center',
              //     complete() {
              //        A.goPrower();
              //     }
              //  })
              A.goPrower();
               return
            } else {
               resolve(res);
            }
         }, err => {
            wx.hideLoading();
            reject(err);
         });
      })
   },
   ...home,
   ...goods,
   ...atten,
   ...myIndex,
   ...myApplyStoreAccoIndex,
   ...myPIIndex,
   ...myPIeditName,
   ...myColIndex,
   ...myOrderIndex,
   ...myOrderList,
   ...myOrderDetail,
   ...myOrderEvaluate,
   ...myOrderLogistics,
   ...myEvaluationIndex,
   ...myWalletIndex,
   ...myWalletBalance,
   ...myWalletWithdrawDeposit,
   ...myInSharingActsList,
   ...myInSharingActsShare,
   ...myFootprint,
   ...myAddress,
   ...mySpecialCard,
  ...myHomeIndex,
  ...myStroeIndex,
  ...myPackageFree,
  ...bargain
}
