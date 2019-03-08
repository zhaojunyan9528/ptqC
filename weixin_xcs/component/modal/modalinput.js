// component/modal/modalinput.js
Component({
   properties: {
      title: {
         type: String,
         value: ""
      },
      confirmtext: {
         type: String,
         value: "确认"
      },
      showCancel:{
        type:Boolean,
        value:false
      },
      canceltext:{
        type: String,
        value: "取消"
      },
      titleColor:{
        type: String,
        value: "#333"
      },
      titleStyle:{
        type: String,
        value: ""
      },
      maskCancel:{
        type:Boolean,
        value:false
      }
   },
   data: {
      show: false,
      showCancel:false,
   },
   methods: {
      open() {
         this.setData({
            show: true
         })
      },
      close() {
         this.setData({
            show: false
         })
      },
      cancel() {
         this.setData({
            show: false
         })
      },
      success(e) {
        this.triggerEvent("goBuyt");
      },
     cancelFlag(e) {
       this.triggerEvent("noUse");
     },
   }
})