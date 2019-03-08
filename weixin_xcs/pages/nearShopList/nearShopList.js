const A = getApp();
let int;
var comm = require("./nearShopFZ.js");
Page(A.assignPage({
   data: {
      nearMarkerArr: [],

      loadingF: false,
      scaleMap: 14,
      listNull:false,//列表为空
      dTime: [],
      mapHeight: 460,
      inteSortArr: ['距离最近', '价格最低', '人气最高'],
      inteSortFlag: ['', '', '1'],
      mapArr: ['列表展示', '地图展示'],
    
      mapFlag: ['1'],
      sortFlag: ['', ''],
      mengbanFlage: false,
      topJuli: 88,
      nearType: 3,
      goods_list: [],
     nullData: {
       shortFlag: true,
       img: "/assets/images/stroll4.png",
       nearFlag: false,
       txt: "您的附近暂无商家"
     },
     mengFlag:0,//是否显示蒙层点击人气最高或列表展示0否  1是
     expendFlag:0,//列表和距离默认收起0，展开1
     shadow:0
   },
   /**
     * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

      var that = this;
      var store_id = wx.getStorageSync('store_id');
      var unionid = wx.getStorageSync('thisCode');
      var paging = that.data.paging;
      let keyword = options.key ? options.key : '';
      this.setData({ keyword: keyword });
       wx.getLocation({
         type: 'gcj02',
          success: (res) => {

             var latitude = res.latitude
             var longitude = res.longitude;
            
             this.setData({ latitude: latitude, longitude: longitude })
          }
       })
     //获取手机的可用宽高
     wx.getSystemInfo({
       success: (res) => {
         var canvasW = (res.windowWidth) ;
         var canvasH = (res.windowHeight);
         that.setData({
           canvasW: canvasW,
           canvasH: canvasH,
           mapHeight: (canvasH * 80) /100
         })
       },
     })
     
   },
   //隐藏蒙版
  cancelMeng:function(){
    this.sortTabBtn(this.data.index);
  },
   // 点击选择排序或者展示方式
   sortTabBtn(e) {
      let index = e.currentTarget.dataset.index;
      let sortFlag = this.data.sortFlag;
      let mengbanFlage = false;
      let topJuli = 88;
      if (index == 0) {
         if (sortFlag[0]) {
            sortFlag[0] = '';
         } else {
            sortFlag[0] = '1';
            sortFlag[1] = '';
            mengbanFlage = true
         }
      } else {
         if (sortFlag[1]) {
            sortFlag[1] = '';
            let topJuli = 88;
         } else {
            sortFlag[1] = '1';
            sortFlag[0] = '';
            mengbanFlage = true
            topJuli = 178;
         }
      }
      this.setData({
         sortFlag: sortFlag,
         mengbanFlage: mengbanFlage,
         topJuli: topJuli,
        
      })
     if (this.data.expendFlag==0){//收起
       this.setData({
         mengFlag: 1,//蒙层显示
         expendFlag:1,
         index:e,
         shadow: 1
       })
     }else{
       this.setData({
         mengFlag: 0,//蒙层不显示
         expendFlag: 0,
         index: e,
         shadow: 0
       })
     }
   },
   // 点击选择排序方式
   sortBtn(e) {
    
      var that = this;
      let index = Number(e.currentTarget.dataset.index);
      let inteSortFlag = [];
      inteSortFlag[index] = '1';
      let goods_list = this.data.goods_list;
      this.setData({
         inteSortFlag: inteSortFlag,
         nearType: index + 1,
         sortFlag: [],
         paging :1,
         mengbanFlage: false,
        mengFlag:0,
        expendFlag: 0
      })
     wx.showLoading({ title: '加载中', })
      comm.nearStoreFZ(index + 1, this.data.keyword, 1, 'seach', res => {
        wx.hideLoading()
    
        let glist = res.goods_list;
        this.setInterVal(glist);
      
      },err=>{
        wx.hideLoading() 
      });
   },
   // 选择展示方式
   mapTabBtn(e) {
      let index = e.currentTarget.dataset.index;
      let mapFlag = [];
      mapFlag[index] = '1';
      this.setData({
         mapFlag: mapFlag,
         sortFlag: [],
         mengbanFlage: false,
         topJuli: 88,
         mengFlag:0,
        expendFlag: 0,
        shadow: 0
      })
   },
   hideAllSelct() {
      this.setData({ sortFlag: [], mengbanFlage: false })
   },
   navNearGo() {
      A.G("search/search")
   },
   //显示全部
   nearAllDataBtn() {
      this.setData({ keyword: '' })
     comm.nearStoreFZ(this.data.nearType, '', 1, 'seach', res => {


       let glist = res.goods_list;
      this.setInterVal(glist);

      });
    
   },
   // 点击跳转不同的页面
   navStore(e) {
     let type = e.currentTarget.dataset.type; 

     var goods_id = e.currentTarget.dataset.id;
     if (type == 1) {
       A.G(
           '/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id
       )
     } else if (type == 3) {
       A.G(
         '/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id
       )
     } else if (type == 4) {
       A.G(
         '/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id
       )
     }
    
   },
   clickBjOrigin(e) {
      var that = this;
      var markerId = e.markerId
      var nearMarkerArr = that.data.nearMarkerArr;
      var meno = nearMarkerArr.find(v => {
         return v.id == markerId
      })
      var content = meno.callout.content;
      var storedes = meno.storedes ? meno.storedes : '无';
  
    //  A.showBaseModal('是否进入 ' + content +"\n"+ "店铺简介：" + storedes,
    //  function(){
    //    A.G('reLaunch:///pages/index?store_id=' + meno.id)
    //  }

    //  )
    wx.showModal({
      title: '温馨提示',
      content: '是否进入 ' + content + "\n" + "店铺简介：" + storedes,
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          A.G('reLaunch:///pages/myStore/index?store_id=' + meno.id)
        } else if (res.cancel) {
         
        }
       
      },
      fail: function(res) {

      },
     
    })
   },
   onShow() {
     wx.showLoading({
       title: '加载中',
     })
      comm.nearStoreFZ(this.data.nearType, this.data.keyword, 1, 'seach', res => {
        wx.hideLoading()
        if(res.status == A.STATE.STATUS.OK){
          if (!res.goods_list[0]){
            this.setData({ listNull:true})
          }
          this.setData({ all_paging: res.all_paging, paging: res.paging })
          let glist = res.goods_list;
       
          this.setInterVal(glist)
        }else{
          A.showTipModal(
            res.info || A.information.DATAFAIL
          )
        }
      

      },err=>{
        wx.hideLoading()
      })
      comm.nearStoreFZMap(1, res => {
       
         for (var i = 0; i < res.store_list.length; i++) {
            var iconPath = "../../assets/images/shopImg.png";
            res.store_list[i].iconPath = iconPath;
         }
         if (res.status == A.STATE.STATUS.OK) {
            this.setData({ nearMarkerArr: res.store_list });
         }  
        
      });
    
   },
   //触底加载
    onReachBottom() {

       var that = this;
       var all_paging = that.data.all_paging;
       var paging = Number(that.data.paging);
       var latitude = that.data.latitude;
       var longitude = that.data.longitude;
       var store_id = wx.getStorageSync('store_id');
       if (all_paging <= paging) {
         wx.hideLoading()
         return
       }
       paging++

      wx.showLoading({
        title: '加载中',
      })
       comm.nearStoreFZ(this.data.nearType, this.data.keyword, paging, 'seach', res => {
         wx.hideLoading()
         this.setData({ all_paging: res.all_paging, paging: res.paging });
         let glist = res.goods_list;
         let goods_list = that.data.goods_list || [];
         glist.map((item, index) => {
           goods_list.push(item)
         })
         this.setInterVal(goods_list)
        
       },err=>{
         wx.hideLoading()
         A.showTipModal(err.info)
       })
     }, 
    /**
  * 生命周期函数--监听页面隐藏
  */
    onHide() {
      this.setData({
        // goods_list: '',
        paging: 1,
        keyword: '',
        
      })
      A.clearInterval('setIntervalId')
    },
    //定时器处理列表
  setInterVal(goods_list){
      
      let outime = 1;

      A.setInterval('setIntervalId', () => {
        for (let key in goods_list) {
          if ((goods_list[key].limit_time - outime) >=0){
            goods_list[key]['dTime'] = comm.forMat(goods_list[key].limit_time - outime);
          }else{
            return
          }
        }
        outime++;
        this.setData({ goods_list: goods_list });
      }, 1000)
    }
}));