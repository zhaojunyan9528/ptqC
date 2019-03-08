/**
 * 正则表达式
 */
let CellPhone = function (str) {
  const reg = /^[1][0-9]{10}$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
let Email = function (str) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
let RealName = function (str) {
  const reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
let NickName = function (str) {
  // const reg = /^[\u4E00-\u9FA5A-Za-z][\w\u4E00-\u9FA5A-Za-z0-9_-]{3-15}$/; 
  const reg = /^[\u4e00-\u9fa5a-zA-Z][\w\u4e00-\u9fa5]{1,16}$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
let HasChines = function (str) {
  if (escape(str).indexOf("%u") < 0) {
    return false;
  } else {
    return true;
  }
}
module.exports = { CellPhone, Email, RealName, NickName, HasChines };