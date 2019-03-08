const A =getApp();
function register(store_id){

  A.updata.registered(store_id).then(res => {
    if (res.status == A.STATE.STATUS.OK) {
      var version = 2;
      if (res.data.version != undefined && res.data.version != null) {
        version = res.data.version == 0 ? 2 : res.data.version
      }
      wx.navigateToMiniProgram({
        appId: "wx429f42a870cd65c0",
        path: '/pages/register/register?version=' + version + '&regcode=' + res.data.regcode + '&entry=1',
        extraData: {},
        envVersion: 'release',
        success: function (res) {
        }
      })
   
    } else {
      A.showTipModal(res.info || A.information.DATAFAIL)
    }
  }, err => {
    A.showTipModal(err.info || A.information.DATAFAIL)
  })
 }

module.exports = {
  register

}