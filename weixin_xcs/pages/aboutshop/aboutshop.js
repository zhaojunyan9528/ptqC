const A = getApp();
Page(A.assignPage({
  /* 
   *页面初始数据  
   */
  data: {
    store_listForNullS: false,
    eidtRArr: [],
    eidtFlage: false,
    allAbFlag: false,
    lth: -1,
    judgeNum: 0,
    imgUrl: A.config.uApi.imgUrl, //地址前缀
    nullData: {
      shortFlag: true,
      img: "https://www.pintuanqu.cn/Public/WeChatApps/image/noD_ico1.png",
      nearFlag: true,
      txt: A.information.NULLABOUT //'您还没有关注的店铺，先去逛逛吧'
    }

  },
  onLoad: function(options) {

  },
  onShow() {
    wx.showLoading({
      title: '加载中',
    })
    A.updata.MemberAttention().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {

        this.setData({
          list: res.list,
          paging: res.paging,
          all_paging: res.all_paging,
          lth: res.list.length
        });

      } else {
        A.showTipModal(A.information.DATAFAIL);
      }

    }, err => {
      wx.hideLoading();
      A.showTipModal(A.information.FAILREQ)
    })
  },
  //点击删除
  emptyBtn() {
    var that = this;
    var footprintArr = this.data.list;
    console.log(footprintArr)
    let eidtRArr = this.data.eidtRArr;
    var paging = this.data.paging;
    A.showBaseModal(A.information.UNFOLLOW, function() {
      A.hideModal();
      let upIdArr = [];
      for (let i = footprintArr.length - 1; i >= 0; i--) {
        if (eidtRArr[i]) {
          upIdArr.push(footprintArr[i].store_id),
            footprintArr.splice(i, 1)
        }
      }
      let id = upIdArr.join(',')
      A.updata.MemberAttentionCancel(paging, id).then(res => {

      }, err => {})

      that.setData({
        list: footprintArr,
        lth: footprintArr.length,
        eidtFlage: false
      })


      setTimeout(() => {
        wx.hideLoading()
      }, 1000);
    })

  },
  // 判断是否可以点击
  judgeClick() {
    let eidtRArr = this.data.eidtRArr;
    let judgeNum = 0;
    eidtRArr.find(item => {
      item ? judgeNum++ : ''
    })
    this.setData({
      judgeNum: judgeNum
    })
  },
  //点击编辑
  eidtAbsBtn() {
    let eidtRArr = this.data.eidtFlage ? this.data.eidtRArr : []
    this.setData({
      eidtFlage: !this.data.eidtFlage,
      eidtRArr: eidtRArr,
      judgeNum: 0,
      allAbFlag: false

    })
  },
  //多选
  selectEidtBtn(e) {
    let index = e.currentTarget.dataset.index;
    let eidtRArr = this.data.eidtRArr;
    eidtRArr[index] = eidtRArr[index] ? '' : '1';
    this.setData({
      eidtRArr: eidtRArr
    });
    var onceRadArrLength = this.data.list.length;
    var judgeFlag = 0;
    for (let i in eidtRArr) {
      if (eidtRArr[i]) {
        judgeFlag++
      };
    }
    if (judgeFlag == onceRadArrLength) {
      this.setData({
        allAbFlag: true
      })
    } else {
      this.setData({
        allAbFlag: false
      })
    }
    this.judgeClick();
  },
  // 全选
  clickAllBtn() {
    let allAbFlag = this.data.allAbFlag;
    let eidtRArr = [];
    if (allAbFlag) {
      allAbFlag = false
    } else {
      allAbFlag = true;
      for (let i in this.data.list) {
        eidtRArr.push('1')
      }
    }
    this.setData({
      eidtRArr: eidtRArr,
      allAbFlag: allAbFlag
    })
    this.judgeClick();
  },
  //前往店铺
  storebutton(e) {
    var thatId = e.currentTarget.dataset.id;
    A.G('/pages/myStore/index?store_id=' + thatId)
  },
  //触底
  onReachBottom() {
    let that = this;
    let all_paging = that.data.all_paging;
    let paging = that.data.paging;
    if (all_paging <= paging) {
      return
    }
    paging++
    wx.showLoading({
      title: '加载中',
    })
    A.updata.MemberAttention(paging).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        let list = that.data.list;
        res.list.map((item, index) => {
          list.push(item)
        })
        this.setData({
          list: list,
          paging: res.paging,
          all_paging: res.all_paging
        });
      } else {
        A.showTipModal(A.information.DATAFAIL)
      }
    }, err => {
      wx.hideLoading();
      A.showTipModal(A.information.FAILREQ)
    })
  },
  onHide: function() {
    this.setData({
      eidtFlage: false,
      eidtRArr: []
    })
  },
  onUnload: function() {
    this.setData({
      eidtFlage: false,
      eidtRArr: []
    })
  }
}));