// component/allyactivity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
//商盟活动列表
    allySpecialsList:{
      type:"Array ",
      value:[]
    },
    specialsAllPaging:{
      type:Number

    },
    //店铺本身活动列表
    goods_list:{
      type: "Array ",
      value: []
    },
    //店铺活动是否加载完毕
    bootomFlag:{
      type:Boolean,
      value:false
    },
    //是否显示友情推荐
    friendFlag:{
      type: String,
      value:1  //1显示 0不显示
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
    //前往店铺
    storebutton: function (e) {
      var storeid = e.currentTarget.dataset.id;
      this.triggerEvent("storebutton", storeid)
    },
    navStore:function(e){
      var goods_id = e.currentTarget.dataset.id;
      var type = e.currentTarget.dataset.type;
      var group = { goods_id, type};
      this.triggerEvent("navStore", group)
    }
  }
})
