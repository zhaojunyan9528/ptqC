import BASE from '../../../pages/my/utils/base.js';
import A from '../../../vwx/uset.js'

module.exports = {
  //加载页面数据
  init() {
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/info' });
  },

  // 修改头像：上传图片
  editLogo(_that) {
    const _this = this, _d = _that.data;
    return new Promise(function(resolve, reject){
      A.chooseImage().then(res => {
        A.upFile({
          url: A.config.host + '/WeChatAppsCs/MemberMy/upload_image',
          header: { "token": A.DB.user.unid },
          name: "file",
          filePath: res[0],
          formData: {
            'folder': 'userLogo',
            'type': 4,
            'unionid': A.DB.user.unid,
          }
        }).then(res => { resolve(res) }, err => { reject(err) });
      }, err => { 
        
        // A.showTipModal(err.info  ||  "请选择有效图片") 
        });
    })
  },


  // 修改头像：保存头像
  saveLogo(logoUrl){
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/img_do', data: { wx_img: logoUrl } });
  },

  // 修改生日
  editBirth(e) {
     return this.getTData({ url: '/WeChatAppsCs/MemberMy/birth_do', data: { birth: e.detail.value } });
  }

}