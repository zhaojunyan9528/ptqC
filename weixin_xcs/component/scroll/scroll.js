// component/scroll/scroll.js
let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 滚动的内容
    data: {
      type: Array,
      value: numArr
    },
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
        if(newVal != oldVal){
          this.calculate(newVal);
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueArr: [],
    node: 0
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
      this.scroll();
    },
    scroll(){
      let _that = this, _d = _that.data;
      clearTimeout(timer);
      let i = _d.node;
      _that.timerFn().then(res => {
        i++;
        _that.setData({ node: i });
        if(i < _d.num){
          _that.scroll();
        }
      }, err => {})
    },
    timerFn(){
      return new Promise((resolve, reject) => {
        timer = setTimeout(function () {
          resolve();
          clearTimeout(timer);
        }, 300);
      })
    }
  }
})
