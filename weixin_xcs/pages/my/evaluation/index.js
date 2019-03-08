// pages/my/evaluation/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,
    noList: false,
    noListInfo: {
      img: '../../../assets/images/n3_ico5.png',
      txt: A.information.NULLEVALUATION ,//'您还没有任何评价，先去逛逛吧'
    },
    pageCount: 0,
    pageNum: 0,
    isLastPage: false,
    list: [],
    isEdit: false,
    showOptItem: -1, // 显示删除操作的列表项
    delEvalId: -1 // 删除的评价id
  },
  onLoad: function(opts){
    const _that = this, _d = _that.data;

    // 初始化data
    BASE.PRO._set(_that);
  },
  onShow: function(){
    // 加载评价列表
    this.getEvalList();
  },
  //评价图片预览
  preview:function(e){
    if (this.data.showOptItem!=-1){
      return;
    }else{
      var currentUrl = e.currentTarget.dataset.img;
      var urls = e.currentTarget.dataset.array;
      wx.previewImage({
        urls: urls,
        current: currentUrl,
      })
    }
  },
  
  // 获取评价列表
  getEvalList: function(){
    A.updata.evalList(this).then(res => {
  
    }, err => {});
  },
  // 触底加载更多
  onReachBottom: function () {
    if (!this.data.isLastPage){
      this.getEvalList();
    }
  },
  hideOptItem:function(){
    let e = this.data.hideOptItem;
    let index = e.currentTarget.dataset.index;
    this.setData({ showOptItem: -1 });
  },
  // 展开更多操作(删除)
  otherOpts: function (e) {
    let index = e.currentTarget.dataset.index;
    if(this.data.showOptItem == index){
      this.setData({ showOptItem: -1 ,hideOptItem:e});
    }else{
      this.setData({ showOptItem: index, hideOptItem: e });
    }
  },
  // 删除
  delEval: function(e){
    this.setData({ delEvalId: e.currentTarget.dataset.id});
    A.showBaseModal(A.information.DELETEEVALUATION || A.information.DATAFAIL, this.confirmDelEval);//'是否删除此评论？'
  },
  // 确认删除
  confirmDelEval: function(){
    A.updata.evalDelete(this).then(res => {
      if(res.status == A.STATE.STATUS.OK){
        A.hideModal();
        A.showTipModal(A.information.DELETESUCCESS || A.information.DATAFAIL, this.updateEvalList);//'成功删除！'
      }else{ A.showTipModal(res.info) }
    }, err => { A.showTipModal(err.info)});
  },
  // 删除后更新数据
  updateEvalList: function(){
    A.hideModal();
    let theList = this.data.list
    let that = this 
    theList.map(function(val,index){
      if (val.evaluate_id == that.data.delEvalId){
         theList.splice(index,1)
      }
    })
      this.setData({
        pageNum: 0,
        list: theList,
        showOptItem: -1,
        delEvalId: -1
      });   
  }
}))