const BASE = require('../../../pages/my/utils/base.js');
const user = require('../../../udb/DB/user.js');
import A from '../../../vwx/uset.js'

module.exports = {
  // 添加图片
  uploadPhoto(photo) {
    return A.upFile({ 
      url: A.config.host + '/WeChatAppsCs/StoreGoods/upload_goods_image',
      filePath: photo,
      name: 'file',
      formData: {
        folder: 'evaluate',
        type: 0,
        unionid: user.unid
      } 
    })
  },
  // 发布
  saveEvaluat(_that){
    const _d = _that.data;
     return this.getTData({ 
      url: '/WeChatAppsCs/MemberOrder/evaluate', 
      data: {
        order_id: _d.orderId,
        img_slide: _d.submitPhotos.join(","),
        content: _d.content, 
        score: _d.rate + 1,
        is_name: _d.isAnonymous ? 1 : 0
      }
    })
  }
}