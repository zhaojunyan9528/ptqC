//封装门店的函数
const A = getApp();
function  nearStoreFZ(sort_type, keyword, paging, seach,_funOk) {
  wx.getLocation({
    type: 'gcj02',
    success: (res) => {

      var latitude = Number(res.latitude);
      var longitude = Number(res.longitude);
      if (!latitude || !longitude) {
        A.showTipModal(A.information.OPENPHONEPOSITION, () => {  //为能检测到请您的定位信息，请先开启手机的定位服务！
          A.G("reLaunch:///pages/nearShopList/wsq/wsq");
        }); 
        return
      }
      A.updata.GetStrollInfo( longitude, latitude, sort_type, keyword, paging).then(res => {
        _funOk(res)
      }, err => {
        A.G("reLaunch:///pages/nearShopList/wsq/wsq");
       })
    },
    fail:(err)=>{
      wx.hideLoading()
      A.showTipModal(A.information.OPENPHONEPOSITION, () => {  //为能检测到请您的定位信息，请先开启手机的定位服务！
        A.G("reLaunch:///pages/nearShopList/wsq/wsq");
      });
    }
  })
}
//格式化时间函数
function forMat(second_mun) {
  //天数
  let day = Math.floor(second_mun / 3600 / 24);
  day < 10 ? day = "0" + day : day;
  //小时
  let hour = Math.floor((second_mun - (day * 3600 * 24)) / 3600);
  hour < 10 ? hour = "0" + hour : hour;
  //分钟
  let min = Math.floor((second_mun - (day * 3600 * 24 + hour * 3600)) / 60);
  min < 10 ? min = "0" + min : min;
  //秒
  let second = Math.floor(second_mun % 60);
  second < 10 ? second = "0" + second : second;
  var dTimeArr = [day, hour, min, second];
  if (second_mun <= 0) {
    dTimeArr = ["00", "00", "00", "00"];
  }
  return dTimeArr;
}
//封装了map列表
function nearStoreFZMap(paging, _funOk) {

  wx.getLocation({
    
    type: 'gcj02',
    success: (res) => {
      var latitude = Number(res.latitude);
      var longitude = Number(res.longitude);
 
      if (!latitude || !longitude) {
        A.showTipModal(A.information.OPENPHONEPOSITION, () => {  //为能检测到请您的定位信息，请先开启手机的定位服务！
          A.G("reLaunch:///pages/loading/loading");
        });
        return
      }
      A.updata.GetStrollStoreMapList(latitude, longitude,paging).then(res => {
        _funOk(res)
      }, err => {
        // wx.reLaunch({
        //    url: '/pages/nearShopList/nearShopList/wsq/wsq'
        // })
      })

    }
  })
}
module.exports = {
  nearStoreFZ, forMat,
  nearStoreFZMap

}