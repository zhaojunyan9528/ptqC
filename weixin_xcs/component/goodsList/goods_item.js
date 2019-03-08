// component/allyactivity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //单个活动项
    goods_item:{
      type: Object,
    },
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
    goDetail:function(e){
      var goods_id = e.currentTarget.dataset.goods_id;
      var type = e.currentTarget.dataset.type;
   
      var group_id = e.currentTarget.dataset.group_id
      var group = { goods_id, type, group_id};
      this.triggerEvent("goDetail", group)
    }
  }
})
