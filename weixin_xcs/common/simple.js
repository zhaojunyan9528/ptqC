// 剩余时间对象，天、小时、分钟、秒
const rtime = function(_t) {

   return {
     d: parseInt(_t / 86400) < 10 ? '0' + parseInt(_t / 86400) : parseInt(_t / 86400) ,
     h: parseInt(_t % 86400 / 3600) < 10 ? '0' + parseInt(_t % 86400 / 3600) : parseInt(_t % 86400 / 3600),
     m: parseInt(_t % 86400 % 3600 / 60) < 10 ? '0' + parseInt(_t % 86400 % 3600 / 60) : parseInt(_t % 86400 % 3600 / 60),
     s: parseInt(_t % 86400 % 3600 % 60) < 10 ? '0' + parseInt(_t % 86400 % 3600 % 60) : parseInt(_t % 86400 % 3600 % 60)
   };
}
// 定时器,id唯一标识，字符串类型
const ids = {};
const _setInterval = function(_id, _fun, _time) {
   let time = _time || 1000;
   let count = 0;
   if (ids[_id]) {
      clearInterval(ids[_id].id);
      delete ids[_id];
   }
   let sid = {
      name: _id,
      callback: _fun,
      id: setInterval(function() {
         try {
            count++;
            sid.callback({
               count
            })
         } catch (error) {

            clearInterval(sid.id);
         }
      }, time)
   }
   ids[_id] = sid;
}
const _clearInterval = function(_id) {
   if (ids[_id].id) {
      clearInterval(ids[_id].id);
      delete ids[_id];
   }
}

//字符串版本号整数化，子版本号不超两位，修正版本号不超三位
const vsnum = function(_val) {
   if (typeof _val == 'string') {
      let _sArr = [0, 0, 0];
      let _sArr2 = _val.split(".");
      for (let k in _sArr2) {
         _sArr[k] = _sArr2[k];
      }
      var _v = parseInt(_sArr[0]) * 100000 + parseInt(_sArr[1]) * 1000 + parseInt(_sArr[2]);
      return _v;
   }
}

const getParentPage = _index => {
   _index = (_index || _index == 0) ? _index : 1;
   let pages = getCurrentPages();
   if (pages.length > 1) {
      return pages[pages.length - _index - 1];
   } else {
      return pages[0];
   }
}
const urlParams = function(val) {
   let str = "";
   for (let key in val) {
      str += "&" + key + "=" + val[key];
   }
   return str.slice(1);
}

var unprower = true;
const goPrower = function() {
   if (unprower) {
      unprower = false;
      let page = getParentPage(0);
      let purl = "";
      if (typeof page != 'undefined') {
         purl = encodeURIComponent("/" + page.route + "?" + urlParams(page.options));
         wx.redirectTo({
            url: "/pages/my/login/login?page=" + purl
         });
      } else {
         // 用户初次进入后的跳转
         setTimeout(() => {
           page = getParentPage(0);
           purl = page ? encodeURIComponent("/" + page.route + "?" + urlParams(page.options)) : encodeURIComponent("/pages/index" );
            wx.redirectTo({
               url: "/pages/my/login/login?page=" + purl
            });
         }, 800)
      }
   }
}
const isPrower = function(_val) {
   unprower = _val || false;
}
module.exports = {
   urlParams,
   isPrower,
   goPrower,
   vsnum,
   rtime,
   setInterval: _setInterval,
   clearInterval: _clearInterval
}