module.exports = {
  sysInfo: {}, // 系统信息
  system: 0, // 0-IOS, 1-Android
  // 获取系统信息
  getSysInfo: function(){
   
    wx.getSystemInfo({ 
      success: function (res) { 
        this.sysInfo = res;
        let sys = res.system.toLowerCase();
        if(sys.indexOf('ios') > -1){ this.system = 0 }
        else if(sys.indexOf('android') > -1){ this.system = 1 }
        else { this.system = 1 }
      } 
    })
  }
}