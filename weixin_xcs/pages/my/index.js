// pages/my/index.js
const BASE = require('utils/base.js');
const A = getApp();

Page(A.assignPage({
  data: { 
    tabItem: [{ id: "我关注的店铺", goPage: "/pages/aboutshop/aboutshop" }, { id: "我的收藏", goPage: "/pages/my/collection/index" }, { id: "收货地址", goPage: "/pages/my/address/index" }, { id: "我的评价", goPage: "/pages/my/evaluation/index" }, { id: "切换身份", goPage: "/pages/my/changeRole/index" }]
        
      
  },
  onLoad: function(opts){
   
  },
  onShow: function(opts){
   
   
  },
  
  
  
 
}));