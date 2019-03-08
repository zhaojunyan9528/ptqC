// component/goods/goodmore.js
const A = getApp();
Component({
   properties: {
      info: {
         type: Object,
         observer: function(newVal, oldVal, changedPath) {
           this.read()
         }
      },
      comments: {
         type: Array,
         value: []
      },
      actIndex: {
         type: Number,
         value: 0
      },
     activeIndex:{
       type: Number,
       value: 0
     },
     monenyRecord:{
       type:Array,
       value:[]
     }
   },

   data: {
      tabs: ['商品详情'],
      activeIndex: 0
   },
   methods: {
      imgload(e) {},
      selectTab(e) {
         this.setData({
            activeIndex: e.detail.index
         })
      },
     read: function () {
         
     },
  },

 
 
})