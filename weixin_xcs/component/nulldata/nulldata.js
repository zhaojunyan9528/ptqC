// component/nulldata/nulldata.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // nullData有三个必须值nullData.shortFlag (长页面还是短页面);nullData.img(页面图片路径)；nullData.nearFlag(是否有跳转逛逛);nullData.txt(显示文字)
    nullData:{
      type:Object
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPage:function(){
      wx.reLaunch({
        url: '/pages/nearShopList/nearShopList',
        
      })
    }
  }
})
