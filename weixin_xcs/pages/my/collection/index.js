// pages/my/collection/index.js
const BASE = require('../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    ActsType: A.DF.ActsType,
    listType: 0,
    topbar: {
      system: A.store.my.system,
      title: '我的收藏',
      optType: 0,
      optFn: 'editCol',
      optTxt: '编辑',
      
    },
    judgeNum: 0,

    isEdit: false, // 是否为编辑状态
    selectedAll: false, // 是否为全选状态

    pageCount: 0, // 总页数
    pageNum: 0, // 当前页数
    isLastPage: false,  // 是否为最后一页
    list: [], // 数据列表

    noList: false, // 是否没有列表数据
    noListInfo: {
      img: '../../../assets/images/n3_ico6.png',
      txt: A.information.NULLCOLLECTSHOP,   //您还没有收藏商品，先去逛逛吧
    }, // 没有列表数据提示内容
  },
  onLoad: function(){
    // 加载初始数据
    BASE.PRO._set(this);
  },
  onShow: function (opts) {
    // 加载收藏列表
    this.getColList();
  },

  // 触底加载更多
  onReachBottom: function () {
    if (!this.data.isLastPage) { this.getColList() }
  },
  // 获取收藏列表
  getColList() {
    A.updata.loadColList(this).then(res => { }, err => { });
  },
  // 编辑
  editCol() {
    const _that = this, _d = _that.data;
    let ie = _d.isEdit;
    _that.setData({
      isEdit: !ie,
      'topbar.optTxt': ie ? '编辑' : '取消',
      selectedAll: false,
     
    });
    let list = this.data.list
    var  flag = false;
    for (let i in list) { list[i].noSelected = flag; }
    this.setData({
      list: list
    });
  },
  // 选择活动
  selCol(e) {

    var list = this.data.list
    const index = e.currentTarget.dataset.index;
    const ns = this.data.list[index].noSelected;
    const field = 'list[' + index + '].noSelected';
    this.setData({ [field]: !ns });
    var count = 0;
    for (let i in list) {
      if (list[i].noSelected != undefined && list[i].noSelected) {
       count += 1
      } 
    }
    if (count == list.length){
      this.setData({
        selectedAll:true
      })
    }else{
      this.setData({
        selectedAll: false
      })
    }
    if(count > 0){
      this.setData({
        judgeNum: 1
      })
    } else{
      this.setData({
        judgeNum: 0
      })
    }
  },
  // 全选
  selAll() {
    let list = this.data.list, flag = false;
    if (!this.data.selectedAll) {
       flag = true; 
      this.setData({
        judgeNum: 1
      })
     }else{
      this.setData({
        judgeNum: 0
      })
     }
    for (let i in list) { list[i].noSelected = flag;  }
    this.setData({
      selectedAll: flag,
      list: list
    });
  },
  // 删除
  delCol() {
    var list = this.data.list
    
    A.showBaseModal(A.information.CANCELCOLLECT, this.confirmDel);  //是否取消收藏当前商品
  },
  // 确认删除
  confirmDel: function () {
    wx.showLoading({ title: '加载中...' });
    const _that = this;
    A.hideModal();
    A.updata.delCol(_that).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          isEdit: false,
          'topbar.optTxt': '编辑',
          selectedAll: false,
          pageNum: 0,
          list: [],
        });
        this.getColList();
      }else{
        A.showTipModal(A.information.DATAFAIL)  //获取数据失败
      }
    }, err => { 
      wx.hideLoading();
      A.showTipModal(err.info || A.information.FAILREQ)  //请求接口失败
      });  
  },
  //逛逛
  redirect:function(){
   
    A.G('reLaunch:///pages/nearShopList/nearShopList')
  }
}))