const A = getApp();
Page(A.assignPage({
  data:{
    storyArr:[],
    clearKey:"",
  },  
  onLoad:function(options){

  },
  onShow:function(){
    this.initData();
  },
  initData:function(){
    A.updata.getStrollKeyword().then(res => {
      this.setData({
        storyArr: res.search_list
      })
    }, err => {
      A.showTipModal(A.information.FAILREQ)
    })
  },
  navNearBtn(e) {
      var name = e.currentTarget.dataset.name;
    if (A.validateFrom(name,"empty") !== true) {
        A.showTipModal(A.information.NULLSEARCH);
      } else {
        A.G(
         'reLaunch:///pages/nearShopList/nearShopList?key=' + name
        )
      }
  },
  clearDataBtn(){
    A.showBaseModal(A.information.CLEARSEACH,()=>{
      A.updata.deleteNearShopList().then(res => {
        if (res.status == A.STATE.STATUS.OK) {
          this.initData();
        } else {
          A.showTipModal(A.information.FAILREQ)
        }
      }, (err) => {
        A.showTipModal(A.information.FAILREQ)
      })
    })

  },
  
  bindinput(e) {

    let name = e.detail.value;
    this.setData({ keyWork: name })
  },
  clearKeyWord(e){

    this.setData({ clearKey:""})
  }
}))