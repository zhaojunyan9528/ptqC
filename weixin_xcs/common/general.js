/**
 * 通用函数
 */

/**
 * 一、数组函数
 */
let ArrFunc = {
  /**
   * 1、根据索引删除元素——将【index】开始的【len】个元素从数组【arr】删除。
   * arr：目标数组
   * index：目标元素索引
   * len（可选，默认为1）：删除元素个数
   * 注：
   * （1）index若为负数表示数组从后向前，例：arr=[0,1,2,3,4],index=-3,此时所指的元素为2
   * （2）若操作中出现当前索引值大于数组长度-1，则从头开始继续数，例：arr=[0,1,2,3,4,5],index=5,len=3,结果为[2,3,4]
   */
  RemoveByIndex: function (arr, index, len) {
    let remainder = -1,
      arrLen = arr.length,
      newArr = [];
    len = len || 1;
    if (index < 0) {
      remainder = index % arrLen + arrLen;
    } else {
      remainder = index % arrLen;
    }
    if (arrLen > len) {
      let newLen = arrLen - len;
      for (let i = 0; i < newLen; i++) {
        let r = Math.floor((remainder + len) / arrLen) > 0 ? (remainder + len) % arrLen : 0;
        if (i < remainder) {
          newArr[i] = arr[i + r];
        } else {
          newArr[i] = arr[i + len];
        }
      }
    }
    return newArr;
  },

  /**
   * 2、删除指定元素——将元素【ele】从数组【arr】删除。
   * arr：目标数组
   * ele：目标元素
   */
  RemoveByEle: function (arr, ele) {
    let idx = arr.indexOf(ele);
    if (idx != -1) arr = _arrFn._removeByIndex(arr, idx);
    return arr;
  },

  /**
   * 3、删除多个指定元素——将多个元素【eles】从数组【arr】删除。
   * arr：目标数组
   * ele：目标元素数组
   */
  RemoveByEles: function (arr, eles) {
    let arrLen = arr.length;
    for (let i = 0, len = eles.length; i < len; i++) {
      let idx = arr.indexOf(eles[i]);
      if (idx != -1) arr = _arrFn._removeByIndex(arr, idx);
    }
    return arr;
  }
};

/**
 * 二、字符串函数
 */
let StrFunc = {
  /**
   * 1、计算字符串长度——计算字符串【str】的长度。
   * str：目标字符串
   * 注：
   * （1）一个汉字等于两个字符
   */
  StrLen: function (str) {//字符串长度：中文相当于两个字符
    let len = str.replace(/[\u0391-\uFFE5]/g, "11").length;
    return len;
  }
}

/**
 * 三、时间函数
 */
let TimeFunc = {
  /**
   * 1、根据毫秒数获取小时
   * 
   */
  GetTimeArrByS: function (s) {
    let timeArr = [], minuteS = 60, hourS = 3600;
    timeArr.push(Math.floor(s / hourS));
    timeArr.push(Math.floor((s % hourS) / minuteS));
    timeArr.push(s % minuteS);
    for (let i = 0, len = timeArr.length; i < len; i++) {
      timeArr[i] = timeArr[i] < 10 ? '0' + timeArr[i] : timeArr[i];
    }
    return timeArr;
  },
}


module.exports = { ArrFunc, StrFunc, TimeFunc };