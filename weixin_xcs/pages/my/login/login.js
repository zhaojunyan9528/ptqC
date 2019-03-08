// pages/my/login/login.js
const A = getApp();
Page(A.assignPage({
  data: {
    urlNav: '',
    store_id: 0,
    purl: "",
    hiddenName: true, //默认不显示
  },
  onLoad: function (options) {
    if (options.page) {
      this.setData({
        purl: options.page
      })
    }
    this.wxlogin();
  },
  onShow: function () {
    A.isPrower(false);
  },
  onHide: function () {
    A.isPrower(true);
  },
  // 获取微信的授权
  wxlogin() {
    wx.login({
      success: (res) => {

        this.setData({
          code: res.code,
          hiddenName: true,
        });
        // A.G("reLaunch://" + decodeURIComponent(this.data.purl));
      },
      fail(res) {
        //  console.log("222")
        A.showTipModal(A.information.NEEDPERMISSION, () => { //需要用户权限
          A.G('reLaunch:///pages/my/authorize/authorize')
        })
      }
    });
  },
  userDataBtn(e) {
    this.setData({
      hiddenName: true,
    });
    // 微信版本比较
    // if (A.vsnum(wx.getSystemInfoSync().SDKVersion) < A.vsnum("1.6.8")) {
    //    A.showModal({
    //       title: A.information.LOWVERSION, //版本太低
    //       content: A.information.UPGRADEWECHAT, //您的微信基础版本库过低，请升级微信或使用原版微信进行体验！
    //       success: () => {
    //          A.G('redirectTo:///pages/my/wxversion/wxversion')

    //       }
    //    })
    //    return
    // }
    // wx.showLoading({
    //    title: '授权登录中.',
    // })
    A.updata.login({
      code: this.data.code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }).then(res => {
      wx.hideLoading()
      let data = res.info;
      if (res.status == 1) {
        // 微信授权同意
        A.DB.user.unid = data.unionid;
        A.config.req.data.unionid = data.unionid;
        var date = new Date();
        var nowDate = date.getTime();
        wx.setStorageSync('loginAccDown', nowDate)
        // 判断用户是否录入手机号  
        A.updata.search(data.unionid).then(res => {
          if (res.data > 0) {

            // if (decodeURIComponent(this.data.purl) == "//pages/index"){
            //   A.G('reLaunch:///pages/index');
            // }else{
            //   A.G("reLaunch://" + decodeURIComponent(this.data.purl));
            // }
            A.G("reLaunch://" + decodeURIComponent(this.data.purl));
          } else {
            this.setData({
              hiddenName: false
            });
          }
        })

        // 不会直接登陆上，授权手机号将显示
        // A.G("reLaunch://" + decodeURIComponent(this.data.purl));
      } else {
        // 微信授权拒绝
        this.setData({
          hiddenName: true
        });
        this.wxlogin();
        wx.showModal({
          content: data || "获取数据失败"
        });
      }
    }, err => {
      wx.hideLoading()
      wx.showModal({
        content: '授权失败'
      })
      this.wxlogin();
    });
  },
  //  获取手机号
  getPhoneNumber(e) {
    console.log(e.detail.iv)
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv
    A.updata.getPhoneNum(encryptedData, iv).then(res => {
      if (res.status == 1) {
        A.G("reLaunch://" + decodeURIComponent(this.data.purl));
      } else {
        wx.navigateBack({
          delta: 2
        })
        //  A.G('reLaunch:///pages/my/login/login')
      }
    }, this.rsSrr)
  }
}));
