// pages/my/applyStore/index.js
const A = getApp();
Page(A.assignPage({
   data: {
      showText: true, //是否显示textarea
      canGetIdenCode: false, // 是否可获取验证码
      isActive: false, // 倒计时显示是否为激活状态
      timer: 60, // 验证码倒计时总秒数
      addr: [], // 地址
      wayArr: ['业务员', '网上', '朋友介绍', '其他'], // 了解ptq途径
      canSubmit: true, // 是否可提交表单（防止重复提交）
   },
   onLoad: function(){ },
   onShow(opts) {
      wx.hideShareMenu();
    },
    // 点击按钮加载完成
    hideLoading() {
      this.data.btn.hideLoading();
    },
    // 显示textarea
    showTextarea: function(){
      this.setData({ showText: true });
    },
    // 隐藏textarea
    hideTextarea: function () {
      this.setData({ showText: false });
    },
   // 设置商户名称
   setName: function(e) {
      let name = e.detail.value;
      this.setData({ name: name });
      this.validateFormData(this.setFormCanSubmit);
   },
   // 验证联系人姓名
   setRealName: function(e) {
      let realName = e.detail.value;
      this.setData({ realName: realName });
      this.validateFormData(this.setFormCanSubmit);
   },
   // 验证手机号
   validatePhone: function(e) {
      let phone = e.detail.value;
      this.setData({ phone: phone });
      if (A.REG.CellPhone(phone)) {
         this.setData({
            canGetIdenCode: true,
            isActive: true
         });
      } else {
         this.setData({
            canGetIdenCode: false,
            isActive: false
         });
      }
      this.validateFormData(this.setFormCanSubmit);
   },
   // 获取验证码
   getIdenCode: function() {
      const _that = this, _d = _that.data;
      A.updata.getIdenCode(4, _d.phone).then(res => {
         if (res.status == A.STATE.STATUS.OK) {
           A.showToast(res.info || A.information.SENTVERIFICODE);  //验证码已发送
            _that.countDown();
         } else {
           _that.hideTextarea();
           A.showTipModal(res.info, _that.showTextarea)
         }
      }, err => {});
   },
   // 设置/验证验证码
   setIdenCode: function(e) {
      let idenCode = e.detail.value;
      this.setData({ idenCode: idenCode });
      this.validateFormData(this.setFormCanSubmit);
   },
   // 设置地址
   setAddr: function(e) {
      let addr = e.detail.value;
      this.setData({ addr: addr });
      this.validateFormData(this.setFormCanSubmit);
   },
   // 设置详细地址
   setAddrDetail: function(e) {
      let addrDetail = e.detail.value;
      this.setData({ addrDetail: addrDetail });
      this.validateFormData(this.setFormCanSubmit);
   },
   // 设置了解拼团趣方式
   setWay: function(e) {
      let i = e.detail.value;
      this.setData({
         wayText: this.data.wayArr[i],
         way: i
      });
      this.validateFormData(this.setFormCanSubmit);
   },
   // 验证表单是否可提交
   validateFormData: function(success, fail) {
      const _that = this, _d = _that.data;
      //必填项验证
      if (_d.name &&
         _d.realName &&
         _d.phone &&
         _d.idenCode &&
         _d.addr &&
         _d.addrDetail &&
         _d.way) {
        success();
      }else{
        if(fail){
          fail();
        }
      }
   },
   // 设置表单可提交
   setFormCanSubmit:function(){
     // _that.setData({ canSubmit: true });
   },
   // 提交表单
  submitInfo: function (e) {
      const _that = this, _d = _that.data;
      if(_d.canSubmit){
        _that.setData({ canSubmit: false })
        // A.showTipModal(A.information.SUSPENDAPPLICATION);   //暂停商家申请
        //   return false;

        console.log(A.information);
        _that.validateFormData(() => {
          if (!A.REG.CellPhone(_d.phone)) {
            _that.hideTextarea();
            A.showTipModal(A.information.WRONGPHONE, function () {
              _that.showTextarea();
              _that.setData({ canSubmit: true })
            });   //请输入正确的手机号
            return;
          } else if (_d.idenCode.length != 6) {
            _that.hideTextarea();
            A.showTipModal(A.information.WRONGVERFIFYCODE, function () {
              _that.showTextarea();
              _that.setData({ canSubmit: true })
            })   //请输入正确的验证码
            return;
          }
          let formData = e.detail.value;
          formData.province = formData.addr[0];
          formData.city = formData.addr[1];
          formData.district = formData.addr[2];
          delete formData.addr;
          _that.setData({ formData: formData });
          A.updata.applyStore(formData).then(res => {
            _that.setData({ canSubmit: true })
            if (res.status == A.STATE.STATUS.OK) {
              _that.hideTextarea();
              A.showTipModal(A.information.CONTACTYOU, function () {
                _that.showTextarea();
                _that.goBack();
              })   //工作人员将在1-3个工作日联系您
            } else {
              _that.hideTextarea();
              A.showTipModal(res.info, _that.showTextarea)
            }
          }, err => {
            _that.setData({ canSubmit: true })
          });
        }, function () {
          _that.hideTextarea();
          console.log();
          A.showTipModal(A.information.INPUTALLINFO, function(){
            _that.showTextarea();
            _that.setData({ canSubmit: true })
          })  //请输入全部信息
          return;
        })
      }
   },
   // 倒计时
   countDown: function() {
      const _that = this, _d = _that.data;
      let t = _d.timer;
      _that.setData({
         countDown: t,
         canGetIdenCode: false
      });
      let timer = setInterval(function() {
         if (t == 0 || !_d.isActive) {
            clearInterval(timer);
            _that.setData({
               canGetIdenCode: true,
               countDown: 0
            });
            return;
         }
         t--;
         _that.setData({
            countDown: t
         });
      }, 1000);
   }
}))