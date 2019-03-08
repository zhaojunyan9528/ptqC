
# 安装
1.node.js https://nodejs.org

2.当前目录下运行 node命令窗口 npm i 安装初始化依赖

3.运行服务器web服务 node mweb

4.小程序框架目录 weixin_xcs

5.微信weui 地址 https://github.com/Tencent/weui-wxss


#接口说明

**A属性** 
- A.DB
    本地存储属性 使用小程序StorageSync同步方法实现set get 方法

```
module.exports = {
   get v() {
      return wx.getStorageSync('api_version');
   },
   set v(_val) {
      wx.setStorageSync('api_version', _val)
   },
}
```

- A.DF
    定义常量枚举
- A.STATE
    定义状态码，根据模块划分

```
module.exports = {
  BUY: {
    OK: 0,
    ERROR: 2
  },
  LOGIN: {
    OK: 200
  }
}
```

- A.config
    应用配置，包含api host 等

**A方法**
* A.C(event)
    传递组件事件对象，返回组件上data数据值
* A.G(string)
    page页面url跳转，"类型://地址"
    类型包含：navigateTo，redirectTo，switchTab，navigateBack
    ```
    A.G("navigateTo://page")
    ```
* A.P(object)
    微信支付请求,传递与小程序相同类型参数

* A.R(object)
    网络通信request请求
* A.RS(object)
    网络通信request请求，返回Promise对象，object为小程序request参数，也可以是url字符串地址
    ```
    A.RS("http://wxpy.yangwl.com/abc").then(res=>{...},err=>{...})
    ```
    
* A.S
    界面交互提示，包含toast,OK,loading三个方法
    ```
    A.S.toast(string)
    A.S.OK(object)
    A.S.loading(object)
    ```
    
* A.assignPage()
     page页面扩展

* A.chooseImage()
    图片选择方法，返回Promise对象
    ```
    A.chooseImage().then(resolve, reject)
    ```
* A.dateFormat(number,string)
    格式化时间,传递时间戳或者时间兑现和格式类型（"YYMMDDhhmmssqqS"）年,月,日,小时,分钟,秒,季度,毫秒
    ```
    A.dateFormat(new Data(),"YY-MM-DD hh:mm")
    ```
* A.formatData
    数据处理
    ```
    //字符串转为ArrayBuffer数据对象
    A.formatData.STB(string)

    //ArrayBuffer数据对象转字符串
    A.formatData.BTS(ArrayBuffer)

    //字符串转base64
    A.formatData.stringToBase64(_str)

    //base64转字符串
    A.formatData.base64ToString(_str)
    ```
* A.updata
    请求接口列队，网络数据，返回Promise对象
     - A.updata.postTData(object)
    post请求数据,object={url,data}
    ```
    A.updata.getTDataStorage({ url: '/cf/asdfasdf',data:{abc:123} }).then(res=>{...},err=>{...});
    ```
    - A.updata.getTDataStorage()
        get请求数据（本地存储版），返回Promise对象
 
        ```
        A.updata.getTDataStorage({ url: '/cf/asdfasdf' }).then(res=>{...},err=>{...});
        ```
  -  ...  扩展方法
    所有扩展方法写入service目录下，统一管理调用

* A.getParentPage(number)
    返回上一页主体，默认1
* A.getUserInfo()
    获取小程序用户基本信息
* A.upFile(object)
    文件上传,与小程序 uploadFile方法参数一致，默认返回Promise对象
    
*  A.wxLogin(object)
    微信登陆

**page方法**

* page.goPage()
    跳转url页面
* page.goBack()
    页面后退
* page.goBackR()
    页面后台并重新读取
* page.wToast()
     界面交互提示说明(同等于A.S.toast)


