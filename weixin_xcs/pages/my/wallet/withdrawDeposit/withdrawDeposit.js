// pages/my/wallet/withdrawDeposit/withdrawDeposit.js
const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    balance: "", // 可提现余额
    sum: '', // 输入的提现金额
    times: 0, // 提现次数
    role: 1, // 
    curWithDepWay: 0,
    title: '提现方式',
    WithdrawDepositWay: BASE.DATA.WithdrawDepositWay, // 提现方式
    loading: false, //按钮是否有加载样式
  },
  onLoad: function(opts) {
    const _that = this;

    // 初始化
    BASE.PRO._set(_that);

    // 获取初始化数据
    _that.getWithDepInfo();
  },
  // 点击按钮加载完成
  hideLoading() {
    this.data.btn.hideLoading();
  },
  // 获取初始数据
  getWithDepInfo: function() {
    A.updata.getWithDepInfo(this.data).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          balance: res.wallet,
          role: res.identity,
          times: res.deposit,
        });
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ)
    });
  },
  // 余额说明
  showTipCont: function() {
    A.showTipModal(A.information.BALANCEEXPLAIN || A.information.DATAFAIL); //'支持提现类型：拼团立减金额'
  },
  // 输入提现金额事件
  inputSum: function(e) {
    const _that = this,
      _d = _that.data;
    let sum = e.detail.value,
      canWithdrawDeposit = false;
    if (sum >= 10 && sum < 20000) {
      canWithdrawDeposit = true;
    }
    _that.setData({
      sum: sum,
      canWithdrawDeposit: canWithdrawDeposit
    });
  },
  // 选择提现方式
  setWithDepWay: function(e) {
    this.setData({
      curWithDepWay: e.detail
    });
  },
  // 计算手续费
  calculateCharge: function() {
    const _that = this,
      _d = _that.data;
    let way = _d.WithdrawDepositWay[_d.curWithDepWay], // 所选支付方式对应信息
      charge = _d.sum * way.rate // 计算所得手续费
    if (charge < way.serviceMinCharge) {
      charge = way.serviceMinCharge
    } else if (charge > way.serviceMaxCharge) {
      charge = way.serviceMaxCharge
    }
    _that.setData({
      charge: charge
    });
  },
  // 提现
  withdrawDeposit: function() {
    const _that = this,
      _d = _that.data;
    this.calculateCharge();
    this.setData({
      btn: _that.selectComponent('#btn-m')
    })
    if (_d.sum <= parseFloat(_d.balance)) {
      A.showModal({
        contType: 2,
        content: `<div style="padding: 20px 0;text-align: left;">
              <span>提现金额 <span style="color: #f98700;">` + _d.sum + `</span></span>
              <span style="margin-left: 5px;">手续费 <span style="color: #f98700;">` + _d.charge + `</span></span>
              <span style="margin-left: 5px;">实到金额 <span style="color: #f98700;">` + (_d.sum - _d.charge) + `</span></span>
            </div>`,
        success: this.confirmWithDep,
        fail: _that.hideLoading()
      })
    } else {
      A.showTipModal(A.information.BALANCENOTENOUGH || A.information.DATAFAIL, _that.hideLoading())
    } //'可提现金额不足'
  },
  // 确认提现
  confirmWithDep: function() {
    const _that = this,
      _d = _that.data;
    this.setData({
      btn: _that.selectComponent('#btn-m')
    })
    A.updata.submitWithDep(_d).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        _that.hideLoading()
        A.showModal({
          showTitle: false,
          contType: 2,
          content: `<div style="padding-bottom: 10px;">
              <div style="margin: 10px auto; width: 50px; height: 50px;"><img src="https://www.pintuanqu.cn/Public/WeChatApps/image/with3_ico4.png" style="width: 100%; height: 100%;"></div>
              <div style="color: #333; font-size: 15.36px;">提现成功</div>
              <div style="color: #666; font-size: 12.8px;">会在1-3个工作日内到账</div>
            </div>`,
          showCancel: false,
          success: _that.goBackR
        })
        // A.G('redirectTo:///pages/my/wallet/index')
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ, _that.hideLoading())
    });
  },
  //全部提现
  allMoney: function(e) {
    A.updata.getWithDepInfo(this.data).then(res => {
      console.log(this.data)
      if (res.status == A.STATE.STATUS.OK) {     
          let sum = e.detail.value;        
          this.setData({
            sum: this.data.balance,
            canWithdrawDeposit :true
          })        
      } else {
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ)
    });

  }
}))