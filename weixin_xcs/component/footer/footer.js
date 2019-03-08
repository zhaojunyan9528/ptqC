// component/footer/footer.js
const A = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    store_id:{
      type:String
    },
    show:{
      type:String,
      value:1
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
    registered(e){
      var store_id = e.currentTarget.dataset.storeid
      A.updata.registered (store_id).then(res => {

            if(res.status == A.STATE.STATUS.OK){
              var version = 2;
              if (res.data.store_version != undefined && res.data.store_version != null){
                version = res.data.store_version == 0 ? 2 : res.data.store_version   
              } 
              wx.navigateToMiniProgram({
                appId: "wx429f42a870cd65c0",
                path: '/pages/register/register?version=' + version  + '&regcode=' + res.data.regcode + '&entry=1',
                extraData: {},
                envVersion: 'release',
                success: function (res) {

                }
              })
          
            }else{
              A.showTipModal(res.info || A.information.DATAFAIL)  
            }
      },err=>{
        A.showTipModal(err.info || A.information.DATAFAIL)  
      })
    }
  }
})
