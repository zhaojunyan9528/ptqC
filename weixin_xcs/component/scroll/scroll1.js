// component/scroll/scroll1.js
var timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 滚动位数
    num: {
      type: Number,
      value: 6
    },
    // 滚动结果值
    value: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal != oldVal) {
          this.calculate(newVal);
        }
      }
    },
    // 是否滚动
    scroll: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueArr: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    calculate() {
      var valueArr = [], value = String(this.data.value);
      if (value.length < this.data.num) {
        var len = this.data.num - value.length;
        for (var j = 0; j < len; j++) {
          value = '0' + value;
        }
      }
      for (var i = 0; i < this.data.num; i++) {
        valueArr.push(value[i])
      }
      this.setData({ valueArr: valueArr });
    }
  }
})
