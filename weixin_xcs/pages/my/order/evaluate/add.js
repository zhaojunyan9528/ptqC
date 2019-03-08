// pages/my/order/evaluate/add.js
const BASE = require('../../utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: {
    orderId: '',
    rate: 4,
    content: '',
    photos: [],
    submitPhotos: [],
    isAnonymous: false,
    photoAllNum: 9,
    actLogo: '',
    loading: true,
  },
  onLoad: function (opts) {
    const _that = this;

    // 加载初始数据
    BASE.PRO._set(_that);

    // 参数
    if (opts.order_id) {
      _that.setData({
        orderId: opts.order_id
      });
    }

    // 加载初始数据
    BASE.PRO._set(_that);

    A.updata.getEvaluateNumber(opts.order_id).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          actLogo: res.goods_img,
        })
      }
    })
  },
  // 评价星级
  setRate: function (e) {
    this.setData({
      rate: e.detail
    });
  },
  // 填写评价
  setContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 添加图片
  addPhoto: function (e) {
    const _that = this,
      _d = _that.data;
    let photos = _d.photos,
      submitPhotos = _d.submitPhotos;
    if (_d.photos.length < 9) {
      wx.chooseImage({
        count: 9 - _d.photos.length,
        success: function (res) {
          let tempFilePaths = res.tempFilePaths;
          for (let i = 0, len = tempFilePaths.length; i < len; i++) {

            A.updata.uploadPhoto(tempFilePaths[i]).then(res => {
              if (res.statusCode == 200) {
                photos.push(res.data)
                let logo = res.data.replace(/[\r\n]/g, "");
                let logoS = logo.replace("https://pintuanqu.oss-cn-hangzhou.aliyuncs.com", "");
                submitPhotos.push(logoS);
                _that.setData({
                  photos: photos,
                  submitPhotos: submitPhotos
                });
              }
            }, err => { })
          }
        }
      });
    } else {
      A.showTipModal('最多上传' + _d.photoAllNum + '张图片！');
    }
  },
  // 删除图片
  delPhoto: function (e) {
    this.setData({
      delPhotoIdx: e.currentTarget.dataset.index
    });
    A.showBaseModal(A.information.DELETEIMG || A.information.DATAFAIL, this.confirmDelPhoto); //是否删除这张照片
  },
  // 确认删除图片
  confirmDelPhoto: function () {
    const _that = this,
      _d = _that.data;

    var photos = _d.photos
    photos.splice(_d.delPhotoIdx, 1)
    _that.setData({
      photos: photos
    });


  },
  // 设置匿名
  setAnonymous: function (e) {

    this.setData({
      isAnonymous: !this.data.isAnonymous
    });
  },
  // 发布
  saveEvaluation: function () {
    let btn = this.selectComponent('#btn-m')

    const _that = this,
      _d = _that.data;
    if (!this.data.content) {
      A.showTipModal(A.information.SAVEECV)
      return
    } else {
      var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&* （）——|{}【】‘；：”“'。，、？]+$");
      if (!reg.test(this.data.content)) {
        btn.hideLoading();
        A.showTipModal(A.information.EVALUATISTRING)
        return
      }
    }
    A.updata.saveEvaluat(_that).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        btn.hideLoading();
        A.showTipModal(A.information.EVALUATIONSUCCESS || A.information.DATAFAIL, this.goBack); //评价成功
      } else {
        A.showTipModal(res.info || A.information.DATAFAI, () => {
          btn.hideLoading();
        })
      }
    }, err => {
      A.showTipModal(err.info || A.information.FAILREQ, () => {
        btn.hideLoading();
      })
    });
  },
  // 返回上一页
  goBack: function () {
    this.goBackR()
    this.setData({
      addaddFlag: 0
    })
  }
}))
