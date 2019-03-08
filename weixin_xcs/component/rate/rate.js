// component/rate/rate.js
Component({
  /**
   * 组件参数
   */
  options: {
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    edit: Boolean,
    fontSize: {
      type: String,
      value: '45rpx'
    },
    marginRight: {
      type: String,
      value: '16rpx'
    },
    rate: Number
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
    setRate: function (e) {
      let rate = e.currentTarget.dataset.index
      if (rate != this.data.rate) {
        this.triggerEvent('rate', rate);
      }
    },
  }
})
