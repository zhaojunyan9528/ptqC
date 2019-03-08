var exampleShop = [{ examplePhone: 18368881025, keFansNumber: 417, storeSaleNum: 220 }, { examplePhone: 15558121953, keFansNumber: 368, storeSaleNum: 121 },
{ examplePhone: 13587036376, keFansNumber: 273, storeSaleNum: 100 }, { examplePhone: 18368881069, keFansNumber: 326, storeSaleNum: 169 }, {
  examplePhone: 18758017816, keFansNumber: 583, storeSaleNum: 110}, { examplePhone: 18758015879, keFansNumber: 478 }, { examplePhone: 13237511232, keFansNumber: 537 }, { examplePhone: 13545268673, keFansNumber: 671 }]
//修改示例店铺的数据
function reviseExampleShop(storeInfo) {
  for (var j = 0, len = exampleShop.length; j < len; j++) {
    if (exampleShop[j].examplePhone == storeInfo.telephone) {
      if (exampleShop[j].storeSaleNum) {
        storeInfo.customer_fans = exampleShop[j].keFansNumber;
        storeInfo.order_num = exampleShop[j].storeSaleNum
      } else {
        storeInfo.customer_fans = exampleShop[j].keFansNumber;
        storeInfo.order_num = storeInfo.order_num
      }

    }
  }
  return storeInfo;
}
module.exports = {

  reviseExampleShop
}