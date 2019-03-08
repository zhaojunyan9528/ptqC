// pages/my/specialCard/detail/detail.js
const A = getApp();

Page(A.assignPage({
  data: {
    storeSrc:'https://www.pintuanqu.cn/Public/WeChatApps/image/buy3_ico2.png',  //商品图标
    telSrc:'/assets/images/store4_ico3.png',
    shopImg:'/assets/images/logo.png',
    loseSrc:'https://www.pintuanqu.cn/Public/WeChatApps/image/vip_ico3.png',
    flag:0,
    re_paging:1,   //核销记录当前页码
		showTFlag:true,//显示使用次数
		flag:0,//0可用，1失效
		myText:'查看详情'
  },
  onLoad: function (options) {
    
    this.setData({
      flag:options.flag || this.data.flag,
      card_id: options.card_id || options.id  || 0
    })
    this.getCardInfo(this.data.card_id);
    this.getUseCardList();
  },
  getCardInfo:function(card_id){
		wx.showLoading({
			title: '加载中...',
		})
    A.updata.getCardInfo(card_id).then(res=>{
			wx.hideLoading();
      if(res.status == A.STATE.STATUS.OK){
        this.setData({
          card_info: res.card_info,
          store_info: res.store_info,
					item: res.card_info
        })
      }else{
        A.showTipModal(res.info || A.information.DATAFAIL)
      }
    },err=>{
			wx.hideLoading();
			A.showTipModal(err.info || A.information.FAILREQ)
		})

  },
  
	//请求消费记录列表
  getUseCardList:function(){
    var card_id = this.data.card_id ;
    var paging = this.data.re_paging;
    if(card_id){
      A.updata.getUseCardList(paging,card_id).then(res=>{
        if(res.status == 1){
          this.setData({
            re_all_paging: res.all_paging,
            records_list: res.list,
            re_paging: res.paging,
          })
        }else{
          A.showTipModal(res.info || A.information.RECORDSOFCONSUMPTION)//请求消费记录列表失败
        }
      },err=>{
        A.showTipModal(err.info || A.information.RECORDSOFCONSUMPTION)//请求消费记录列表失败
      })
    }
  },
   //店铺专项卡详情
	gocardDetail:function(event){
		let goods_card_id = event.currentTarget.dataset.gcid;
    A.G('navigateTo:///pages/my/specialCard/cardDetail/cardDetail?goods_card_id=' + goods_card_id)
  },
  // 拨打电话
  callPhone() {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.store_info.telephone
    })
  },

  //触底加载
  onReachBottom() {
    let that = this;
    let re_all_paging = that.data.re_all_paging;
    let re_paging = that.data.re_paging;
    let card_id = that.data.card_info.card_id;
    if (re_all_paging <= re_paging) {
      return
    }
    re_paging++;
    A.updata.getUseCardList(paging,card_id).then(res => {
      if (res.status == 1) {
        let list = that.data.records_list;
        res.list.map((item, index) => {
          list.push(item)
        })
        this.setData({ records_list: list, re_paging: res.paging, re_all_paging: res.all_paging });
      } else {
        A.showTipModal(res.info || A.information.RECORDSOFCONSUMPTION)//请求消费记录列表失败
      }
    }, err => { 
      A.showTipModal(err.info || A.information.RECORDSOFCONSUMPTION)//请求消费记录列表失败
    })

    A.updata.getCardLoseList(paging).then(res => {
      if (res.status == 1) {
        let list = that.data.card_lose_list;
        res.list.map((item, index) => {
          list.push(item)
        })
        this.setData({ card_lose_list: list, lose_paging: res.paging, all_lose_paging: res.all_paging });
      } else {
        A.showTipModal(res.info || A.information.RECORDSOFCONSUMPTION)//请求消费记录列表失败
      }
    }, err => { 
      A.showTipModal(err.info || A.information.RECORDSOFCONSUMPTION)//请求消费记录列表失败
    })
  },

}))
