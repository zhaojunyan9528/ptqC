// pages/my/specialCard/multiCard/multiCard.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    showTFlag: false, //是否显示专享卡使用、剩余次数
		flag:0,
		card_info:[],//专享卡列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		if (wx.getStorageSync("card_info")){
			let card_info = wx.getStorageSync("card_info");
			for(let i in card_info){
				if (card_info[i].card_is_time == 1) {//限时间
					if (card_info[i].is_custom !=0 ){
						card_info[i].validity_period = '购买日起' + card_info[i].validity_period + '个月'
					}
				}
			}
			this.setData({
				card_info: card_info
			})
		}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  gocardDetail(e) {
    let id = e.currentTarget.dataset.id1;
    A.G('navigateTo:///pages/my/specialCard/cardDetail/cardDetail?goods_card_id=' + id)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))