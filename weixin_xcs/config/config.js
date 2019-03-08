const config = {
  testDebug: true,
  get c() {
    return "3.7.6";
  },
  get v() {
    return "5";
  },
  get host() {
    if (this.testDebug) {
       return "https://pre.pintuanqu.cn";
      // return 'http://pre2.pintuanqu.cn'
      // return "http://japi.ptq.com";
    //  return "http://192.168.31.43:8080";
    } else {
      // 正式地址
      return "https://www.pintuanqu.cn";
    }
  },
  get imgUrl() {
    return this.host + "/Public/WeChatApps/image/";
  },
  // 请求数据配置 application/x-www-form-urlencoded
  req: {
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: {
      unionid: '' //owI24wgpPROy05XD2TPGCE7puuG0
    }
  },

  // 全局默认页面地址
  dPage: {
    index: "/pages/index/index"
  },
  unidPage: [
    "pages/my/login/login"
  ],
  // 全局常用接口
  uApi: {
    upImage: "/upfile/image",
    imgUrl: "https://www.pintuanqu.cn/Public/WeChatApps/image/"
  },
  dApi: {
    "/WeChatAppsCs/Member/index": true
  }
}
module.exports = config
