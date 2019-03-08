// component/select/select.js
const BASE = require('../../pages/my/utils/base.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'simple'
    },
    title: String,
    data: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    select: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange: function (e) {
      this.setData({ select: e.detail.value });
      this.triggerEvent('select', e.detail.value)
    },

    checkboxChange: function (e) {
      // let selects = this.data.selects,
      //     val = e.detail.value
      //     idx = selects.indexOf(val);
      // if (idx == -1){
      //   selects.push(val);
      // }else{
      //   BASE.arrFn.removeByIndex(selects, idx);
      // }
      // var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      // for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      //   checkboxItems[i].checked = false;

      //   for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      //     if (checkboxItems[i].value == values[j]) {
      //       checkboxItems[i].checked = true;
      //       break;
      //     }
      //   }
      // }

      // this.setData({
      //   checkboxItems: checkboxItems
      // });
      // this.setData({
      //   select: selects
      // });
    },
  },
  
})
