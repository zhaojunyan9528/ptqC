//点击分享的画布
const A = getApp();
let drawRoundRect = function (ctx, x, y, width, height, radius, corner) {
  corner = corner || [1, 1, 1, 1];
  if (corner[0]) {
    ctx.moveTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.lineTo(width - radius + x, y);
  } else {
    ctx.moveTo(x, y);
    if (corner[1]) {
      ctx.lineTo(width + x - radius, y);
    } else {
      ctx.lineTo(width + x, y);
    }
  }
  if (corner[1]) {
    ctx.quadraticCurveTo(width + x, y, width + x, y + radius);
    if (corner[2]) {
      ctx.lineTo(width + x, height + y - radius);
    } else {
      ctx.lineTo(width + x, height + y);
    }
  } else {
    if (corner[2]) {
      ctx.lineTo(width + x, height + y - radius);
    } else {
      ctx.lineTo(width + x, height + y);
    }
  }
  if (corner[2]) {
    ctx.quadraticCurveTo(width + x, height + y, width + x - radius, height + y);
    if (corner[3]) {
      ctx.lineTo(x + radius, height + y);
    } else {
      ctx.lineTo(x, height + y);
    }
  } else {
    if (corner[3]) {
      ctx.lineTo(x + radius, height + y);
    } else {
      ctx.lineTo(x, height + y);
    }
  }
  if (corner[3]) {
    ctx.quadraticCurveTo(x, height + y, x, height + y - radius);
  }
  ctx.closePath();
  // ctx.setStrokeStyle('#ffffff');
  // ctx.setFillStyle('#ffffff');
  // ctx.stroke();
  // ctx.fill();
}
// 
function drawCanvas(data) {
  let is_group = data.is_group
  let goods_info = data.goods_info;
  let rate = data.rate;
  let store_info = data.store_info;
  let user_info = data.user_info;
  let imgLoadNewArr = data.imgLoadNewArr;
  let goods_name = goods_info.goods_name.length > 18 ? goods_info.goods_name.substring(0, 18) + '...' : goods_info.goods_name;
  let store_name = store_info.store_name.length > 9 ? store_info.store_name.substring(0, 9) + '...' : store_info.store_name;
  let canvasTimes = data.canvasTimes;
  var canvasW = data.canvasW;
  var canvasH = data.canvasH;
  let nameLen = lengS(user_info.wx_name);
  let storeLen = lengS(store_name);
  let ctx = wx.createCanvasContext('sharingActivities')
  let FontSize = canvasW / ((375 * 95) / 100);
  // 图片缓存
  if (!imgLoadNewArr[2] || !imgLoadNewArr[0] || !imgLoadNewArr[1] || !imgLoadNewArr[3]) {
    wx.showLoading({
      title: '素材加载中...',
    })
    var imgCreatFn = setInterval(() => {
      if (data.imgLoadNewArr[2] && data.imgLoadNewArr[0] && data.imgLoadNewArr[1] && data.imgLoadNewArr[3]) {
        clearInterval(data.imgCreatFn)
        wx.hideLoading()
      }
    }, 100)
    return
  }
  //1. banner部分
  ctx.setGlobalAlpha(1)
  drawRoundRect(ctx, 0, 0, canvasW, canvasW / 1.5, 10 * rate, [1, 1, 0, 0])
  ctx.save()
  ctx.clip()
  ctx.drawImage(imgLoadNewArr[0], 0, 0, canvasW, canvasW / 1.5);
  ctx.setFillStyle("#000000");
  ctx.setFillStyle("#ffffff");
  ctx.restore()
  // 店铺名称
  ctx.setFillStyle("#000000");
  ctx.setGlobalAlpha(0.3);
  ctx.fillRect(0, (canvasW / 1.5) - (canvasW * 0.1), canvasW, canvasW * 10 / 100);
  ctx.setGlobalAlpha(1)
  ctx.setFillStyle("#ffffff");
  ctx.drawImage(imgLoadNewArr[3], 14 * rate, ((canvasW / 1.5) - (canvasW * 0.1)) + 9 * rate, 18 * rate, 16 * rate);
  ctx.setFontSize(14 * rate);
  ctx.setFillStyle("#ffffff");
  ctx.fillText(store_name, 40 * rate, ((canvasW / 1.5) - (canvasW * 0.1)) + 23 * rate, 200 * rate);
  // 2. 活动信息
  ctx.setFillStyle("#e60012");
  ctx.fillRect(0, canvasW / 1.5, canvasW, canvasW * 0.167);
  ctx.setFillStyle("#ffffff");
  ctx.fillText(goods_name, 10 * rate, canvasW / 1.5 + 20 * rate);
  ctx.fillText(is_group == 4 ? '限时专享价：¥' + goods_info.bottom_price : is_group == 3 ? '拼团价：¥' + goods_info.bottom_price : '拼团价：¥' + goods_info.bottom_price, 10 * rate, canvasW / 1.5 + 46 * rate);
  // 原价
  ctx.setFontSize(10 * rate)
  ctx.fillText(is_group == 4 ? '原价： ¥' + goods_info.goods_price : is_group == 3 ? '原价：¥' + goods_info.goods_price : '团长价：¥' + goods_info.goods_price, 150 * rate, canvasW / 1.5 + 46 * rate);
  ctx.fillRect(185 * rate, canvasW / 1.5 + 42 * rate, (((Number(goods_info.goods_price.length)) * 5.5 * canvasTimes * FontSize) + 10) * canvasTimes * FontSize, 1 * canvasTimes);
  ctx.fillRect(0, canvasW * 0.833, canvasW, canvasW * 0.167 + 40 * rate);
  // 3.二维码
  ctx.beginPath();
  ctx.arc((canvasW * 28.4) / 100, canvasW * 0.94, 20 * rate, 0, 2 * Math.PI);
  ctx.setStrokeStyle('#ffffff')
  ctx.stroke();
  ctx.save();
  ctx.clip();
  ctx.drawImage(imgLoadNewArr[1], ((canvasW * 28.4) / 100) - 20 * rate, canvasW * 0.94 - 20 * rate, 40 * rate, 40 * rate);
  ctx.restore();
  ctx.setFontSize(15 * rate);
  ctx.setFillStyle("#333333");
  ctx.fillText(user_info.wx_name + '已经入手', (canvasW * 37) / 100, canvasW * 0.94 + 5 * rate, (canvasW * 60) / 100);
  ctx.setFontSize(21 * rate);
  ctx.setFillStyle("#FF1729");
  ctx.fillText('喊你一起共享优惠!', (canvasW * 25) / 100, canvasW + 25 * rate);
  ctx.beginPath()
  drawRoundRect(ctx, 0, canvasW + 40 * rate, canvasW, canvasW * 0.433 - 40 * rate, 10 * rate, [0, 0, 1, 1])
  ctx.setStrokeStyle('#ffffff');
  ctx.setFillStyle('#ffffff');
  ctx.stroke();
  ctx.fill();
  ctx.save()
  ctx.clip()
  ctx.drawImage(imgLoadNewArr[2], ((canvasW * 34) / 100), canvasW + 40 * rate, 100 * rate, 100 * rate);
  ctx.setFontSize(14 * rate);
  ctx.setFillStyle("#666666");
  ctx.fillText('长按识别二维码', ((canvasW * 34) / 100) + 112 * rate, canvasW + 25 * rate + 107 * rate);
  ctx.restore()
  ctx.draw()
  return { imgCreatFn: imgCreatFn || 0, saveAlbum: true }
}
// 赚红包分享图片
function redShare(data) {
  var imgCreatFn
  let rate = data.rate;
  let goods_info = data.goods_info;
  //二维码
  let red_code = data.red_data_code.data;
  //现金红包金额
  let red_money = goods_info.red_amount;
  //店铺名称
  let store_info = data.store_info;
  let store_name = store_info.store_name.length > 9 ? store_info.store_name.substring(0, 9) + '...' : store_info.store_name;
  //用户
  let user_info = data.user_info;
  let nameLen = lengS(user_info.wx_name);
  let nameImg = user_info.wx_img;
  // let red_img = data.red_img;
  let imgurl = data.imgurl
  let imgLoadNewArr = data.imgLoadNewArr;
    console.log(imgLoadNewArr)
  var canvasW = data.canvasW;
  var canvasH = data.canvasH;
  let ctx = wx.createCanvasContext('sharingActivities')
  let FontSize = canvasW / ((375 * 95) / 100);
  // 现金红包
  ctx.setGlobalAlpha(1);
  drawRoundRect(ctx, 0, 0, canvasW, canvasW * 0.6, 20 * rate, [1, 1, 0, 0])
  ctx.save()
  ctx.clip()
  ctx.drawImage(imgurl, 0, 0, canvasW, canvasW * 0.6);
  ctx.restore()
  //赚钱数目
  ctx.setFillStyle("#FFC832");
  ctx.setGlobalAlpha(1);
  ctx.setFontSize(23 * rate);
  const fontsize = ctx.measureText("现金红包")
  ctx.fillText("现金红包", (canvasW - fontsize.width) / 2, 50 * rate);
  //红包数目
  ctx.setFillStyle("#FFC832");
  ctx.setGlobalAlpha(1);
  ctx.setFontSize(44 * rate);
  const money = ctx.measureText(red_money)
  ctx.fillText(red_money, (canvasW - money.width) / 2 - 10 *rate, 110 * rate);
  ctx.setFontSize(23 * rate);
  const yuan = ctx.measureText("元")
  ctx.fillText("元", (canvasW - yuan.width) / 2 + money.width / 2 + 12 *rate, 105 * rate);
  //店铺名称
  ctx.setFillStyle("#ffffff");
  ctx.setGlobalAlpha(1);
  ctx.setFontSize(14 * rate);
  const metrics = ctx.measureText(store_name)
  ctx.fillText(store_name, (canvasW - metrics.width) / 2, 201 * rate);
  ctx.setFillStyle("#ff3229");

  //下半段的内容
  ctx.beginPath();
  ctx.setGlobalAlpha(1);
  ctx.fillRect(0, canvasW * 0.59, canvasW, canvasW * 0.4);
  //用户头像和昵称
  ctx.beginPath();
  ctx.arc(50 * rate, canvasW * 0.72, 18 * rate, 0, 2 * Math.PI);
  ctx.setFillStyle("#ffffff");
  ctx.fill()
  ctx.beginPath();
  ctx.arc(50 * rate, canvasW * 0.72, 15 * rate, 0, 2 * Math.PI);
  ctx.setStrokeStyle("#ffffff")
  ctx.stroke()
  ctx.save();
  ctx.clip();
  ctx.drawImage(imgLoadNewArr[0], 35 * rate, canvasW * 0.676, 30 * rate, 30 * rate);
  ctx.restore();
  //昵称
  ctx.setFillStyle("#ffffff");
  ctx.setGlobalAlpha(1);
  ctx.setFontSize(13 * rate);
  ctx.fillText(user_info.wx_name, canvasW * 0.22, canvasW * 0.71, 200 * rate);
  //括号
  ctx.setFillStyle("#ffffff");
  ctx.setGlobalAlpha(1);
  ctx.setFontSize(13 * rate);
  ctx.fillText("(已领取" + red_money + "元现金红包)", canvasW * 0.22, canvasW * 0.76, 200 * rate);
  //扫码领取
  ctx.setFillStyle("#ffffff");
  ctx.setGlobalAlpha(1);
  ctx.setFontSize(23 * rate);
  const codelong = ctx.measureText("扫码领取" + red_money + "元现金红包")
  ctx.fillText("扫码领取" + red_money + "元现金红包", (canvasW - codelong.width) / 2, canvasW * 0.925);
  //二维码
  // 红色矩形
  ctx.beginPath();
  ctx.setFillStyle("#ff3229");
  ctx.setGlobalAlpha(1);
  drawRoundRect(ctx, 0, canvasW * 0.96, canvasW, canvasW * 0.48, 10 * rate, [0, 0, 1, 1])
  ctx.fill()
  // 白色矩形
  ctx.beginPath();
  ctx.setFillStyle("#ffffff");
  ctx.setGlobalAlpha(1);
  drawRoundRect(ctx, canvasW * 0.33, canvasW, 120 * rate, 120 * rate, 10 * rate, [1, 1, 1, 1])
  ctx.fill()
  ctx.save()
  ctx.clip()
  ctx.drawImage(imgLoadNewArr[1], canvasW * 0.33 + 11 * rate, canvasW + 11 * rate, 98 * rate, 98 * rate);
  ctx.restore()
  ctx.save()
  ctx.setFontSize(14 * rate);
  ctx.setFillStyle("#ffffff");
  const code = ctx.measureText('长按识别二维码')
  ctx.fillText('长按识别二维码', (canvasW - code.width) / 2, canvasW + 140 * rate);
  ctx.draw();
  return { imgCreatFn: imgCreatFn || 0, saveAlbum: true }
}

function lengS(str) {
  var nameLen = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      nameLen += 2;
    } else {
      nameLen++;
    }
  }
  return nameLen
}
function saveImgBtn(that) {

  let canvasTimes = that.data.canvasTimes;
  wx.showLoading({
    title: '保存中...',
  })
  let canvasW = Number(that.data.canvasW);
  let canvasH = Number(that.data.canvasH);
  wx.canvasToTempFilePath({
    x: 0 * canvasTimes,
    y: 0 * canvasTimes,
    width: canvasW * canvasTimes,
    height: canvasH * canvasTimes,
    canvasId: 'sharingActivities',

    fileType: 'png',
    success: res => {
      let img = res.tempFilePath;
      wx.saveImageToPhotosAlbum({
        filePath: img,
        success: res => {
          wx.showModal({
            title: '温馨提示',
            content: A.information.SAVEIMGSUCESS,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  showCanvas: false
                })
              }
            }
          })


        },
        fail(res) {
          wx.getSetting({
            success(res) {

              if (!res.authSetting['scope.writePhotosAlbum']) {
                A.showTipModal(A.information.OPENIMGPERMISSION, () => {   //是否前往开启保存图片权限?
                  A.G("reLaunch:///pages/nearShopList/wsq/wsq");
                })
              }
            }
          })
        },
        complete() {
          wx.hideLoading()
        }
      })
    }
  })
}
// 触摸开始时间
function startTimeBtn(e) {
  return e.timeStamp

}
// 触摸结束时间
function endTimeBtn(e) {
  return e.timeStamp
}

module.exports = {
  lengS,
  drawCanvas,
  redShare,
  saveImgBtn, endTimeBtn, startTimeBtn,

}
