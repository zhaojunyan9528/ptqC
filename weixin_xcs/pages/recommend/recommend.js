// pages/recommend/recommend.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[],
    pageNum:1,
    allpaging:1

  },
  //关注商家推荐活动
  recentRecommend(paging) {
    wx.showLoading({
      title: "加载中...",
    })
    A.updata.recentRecommend(paging).then(res => {
      wx.hideLoading()
      if (res.status == A.STATE.STATUS.OK) {
        var recommendList = this.data.recommendList;
        res.data.map(( item,index)=>{
          recommendList.push(item)
        })
        this.setData({
          recommendList: recommendList,
          paging:res.pageNum,
          allpaging:res.pages
        })
      } else {
   
        A.showTipModal( res.info || A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading()
      A.showTipModal(err.info || A.information.DATAFAIL)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recentRecommend(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  //跳详情
  goDetail: function (e) {

    var goods_id = e.detail.goods_id;
    var is_group = e.detail.type;
    var group_id = e.detail.groupid;
    if (is_group == 1) {//拼团立减
      A.G('/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 3) {
      A.G('/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 4) {
      A.G('/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + goods_id + '&group_id=' + group_id)
    } else if (is_group == 6) {
      A.G('/pages/goodsInfo/goodsBargain/goodsBargain?goods_id=' + goods_id + '&group_id=' + group_id)
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var paging = this.data.paging;
    var allpaging = this.data.allpaging;
    if (paging >= allpaging) {
      return;
    }
    this.recentRecommend(++paging);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))