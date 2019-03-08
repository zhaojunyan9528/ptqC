// component/tab/tab.js
Component({
   externalClasses: ['vwx-class','tab'],
   properties: {
      tabs: {
         type: "Array",
         value: []
      },
    
     isBorderBottom: {
       type: Boolean,
       value: true
     },
      actIndex: {
         type: "Number",
         value: 0
      },
     evaluate_num:{
       type:Number,
       value:0
     },
     is_red:{
       type:Number,
       value:-1,
       observer: function (newVal, oldVal, changedPath) {
         this.read()
       }
     }
   },
   data: {
   },
   methods: {
      change(evt) {
         this.setData({ actIndex: evt.currentTarget.dataset.index})
         this.triggerEvent('myselect', evt.currentTarget.dataset)
      },
      open(){

      },
      read:function(){
        if(this.data.is_red != -1){
          var num = this.data.evaluate_num || '暂无'
          var tabs1 = '宝贝评价' + '(' + num + ')'
          var tabs = this.data.tabs
          if (this.data.is_red == 1) {
            tabs = ['商品详情', '赚红包记录']
          }else{
            tabs = ['商品详情']
          }
          tabs.push(tabs1)
          this.setData({
            tabs: tabs
          });
        }
        
      }
   }
})