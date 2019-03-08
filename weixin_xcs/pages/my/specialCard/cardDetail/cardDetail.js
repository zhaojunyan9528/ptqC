// pages/my/specialCard/cardDetail/cardDetail.js
const A = getApp();

Page(A.assignPage({
  /**
   * 页面的初始数据
   */
  data: {

    imgUrl: 'https://www.pintuanqu.cn/Public/WeChatApps/image/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let goods_card_id = options.goods_card_id;
    if (goods_card_id) {
			wx.showLoading({
				title: '加载中...',
			})
      A.updata.getCardInfoGoods(goods_card_id).then(res => {
				wx.hideLoading();
        if (res.status == 1) {
          var card_detail1 = [];
          if (res.card_info.card_detail) {
            var card_detail = res.card_info.card_detail
            var str = card_detail.replace(/\n/g, "||-&");
            card_detail1 = str.split("||-&");
            if (card_detail1[0]) {
              card_detail1 = card_detail1;
            } else {
              card_detail1[0] = card_detail
            }
          }
          let card_info = res.card_info
          card_info.card_detail1 = card_detail1
          this.setData({
            card_info: card_info
          })

        } else {
          A.showTipModal(res.info || A.information.DATAFAIL)
        }
      }, err => {
				wx.hideLoading();
        A.showTipModal(err.info || A.information.FAILREQ)
      });
    } else {
			console.log('缺少goods_card_id')
    }
  },


}));