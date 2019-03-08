// pages/Loading/Loading.js
const A = getApp();
Page(A.assignPage({
   data: {},
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(option) {
      if (A.user.unid) {
         // 判断是否是b类接口
         if (option.scene != undefined && option.scene != null) {
            let urlDataArr = option.scene;
            // 二维码路径解析
            urlDataArr = urlDataArr.replace(/-/g, '=');
            urlDataArr = urlDataArr.replace(/_/g, '&');
           let oldUrlDataArr = urlDataArr;
           urlDataArr = urlDataArr.replace(/(\w*)i(.*)g(.*)r(.*)/g, '$1is_group$2goods_id$3group_id$4');
           
            let arr = urlDataArr.split('&');
            let type = arr[0].split('=')[1];
           var urlAll = type == 1 ? '/goodsGroup/goodsGroup' : type == 3 ? '/goodsPeople/goodsPeople' : type == 4 ? '/goodsSale/goodsSale' : type == 6 ? '/goodsBargain/goodsBargain' :'/goodsGroup/goodsGroup';
            let urlNav = '/pages/goodsInfo' + urlAll + '?' + urlDataArr;
            if(type == 5){
              urlDataArr = oldUrlDataArr.replace(/(\w*)i(.*)g(.*)r(.*)/g, 'initiator_id$4');
              urlNav = "/packageFree/detailsFree/detailsFree?" + urlDataArr
            }
           A.G( "redirectTo://" + urlNav)
            return
         } else if (option.store_id != undefined && option.store_id != null) {
            setTimeout(() => {
              A.G('reLaunch:///pages/myStore/index?store_id=' + option.store_id)
            }, 300)
         } else {
            A.showTipModal(A.information.CODEDATAERR, () => {
               A.G('reLaunch:///pages/index')
            })

         }
      }
   }
}))