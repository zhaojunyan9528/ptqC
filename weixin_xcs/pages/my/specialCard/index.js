// pages/my/specialCard/index.js
const A = getApp();

Page(A.assignPage({
  data: {
		tabs:[
			{
				index:0,
				text:'可用专享卡'
			},
			{
				index: 1,
				text: '已失效专享卡'
			}
		],
		currentIndex:0,
    paging:1,
		all_paging:1,
		showTFlag:true,//显示专享卡使用、剩余次数
		flag:0,//0可用 1失效
		cardLen:-1,
		cardLostLen:-1,
  },
  onLoad: function (options) {
		this.cardCanList(this.data.paging);
  },
  onShow(){
    
  },

	//可用专享卡列表
	cardCanList(paging){
		wx.showLoading({
			title: '加载中...',
		})
		A.updata.getCardList(paging).then(res => {
			wx.hideLoading();
			if (res.status == 1) {
				let card_list = this.data.card_list || []
				if(res.list){
					res.list.map((item, index) => {
						card_list.push(item)
					})
				}
				this.setData({
					all_paging: res.all_paging,
					paging: res.paging,
					card_list: card_list,
					cardLen: card_list.length
				})
			} else {
				A.showTipModal(res.info || A.information.DATAFAIL)
			}
		}, err => {
			wx.hideLoading();
			A.showTipModal(err.info || A.information.DATAFAIL)
		})  
	},
	//失效专享卡列表
	cardLoseList(paging){
		wx.showLoading({
			title: '加载中...',
		})
		A.updata.getCardLoseList(paging).then(res => {
			wx.hideLoading();
			if (res.status == 1) {
				let card_lose_list = this.data.card_lose_list || [];
				if(res.list){
					res.list.map((item,index)=>{
						card_lose_list.push(item)
					})
				}
				this.setData({
					all_lose_paging: res.all_paging,
					lose_paging: res.paging,
					card_lose_list: card_lose_list,
					cardLostLen: card_lose_list.length
				})
			} else {
				A.showTipModal(res.info || A.information.DATAFAIL)
			}
		}, err => {
			wx.hideLoading();
			A.showTipModal(err.info || A.information.DATAFAIL)
		})
	},
	//专享卡详情
	gocardDetail:function(event){
    let card_id = event.currentTarget.dataset.id;
		let flag = this.data.flag;
		A.G('/pages/my/specialCard/detail/detail?flag=' + flag + '&card_id=' + card_id)
  },
 
  select: function (e) {
		let index = e.currentTarget.dataset.id;
		this.setData({
			currentIndex:index,
			flag:index,
			cardLen:-1,
			cardLostLen:-1
		})
		if(index){
			this.setData({
				lose_pagig:1,
				all_lose_paging:1,
				card_lose_list:[]
			})
			this.cardLoseList(1);
		}else{
			this.setData({
				all_paging: 1,
				paging: 1,
				card_list: []
			})
			this.cardCanList(1);
		}
  },

  //触底加载
  onReachBottom() {
    let that = this;
		let currentIndex = that.data.currentIndex;
		if (currentIndex) {
			let all_lose_paging = that.data.all_lose_paging;
			let lose_pagig = that.data.lose_pagig;
			if (all_lose_paging <= lose_pagig) {
				return
			}
			lose_pagig++;
			that.cardLoseList(lose_pagig);
		}else{
			let all_paging = that.data.all_paging;
			let paging = that.data.paging;
			if (all_paging <= paging) {
				return
			}
			paging++;
			that.cardCanList(paging)
		}
  },

    //逛逛
  redirect:function(){
    A.G('reLaunch:///pages/nearShopList/nearShopList')
  }
}));