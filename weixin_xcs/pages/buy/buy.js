// pages/buy/buy.js
const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        subtractionFlag: true, //判断是否可以点击数量的减法按钮
        maxNums: 0, //最大数量
        patternFlage: 1, //收获方式，默认到店自取
        imgUrl: A.config.uApi.imgUrl, //地址前缀
        is_genre: 0,
        genre: 0, //
        nums: 1, //订单数量
        member_info: null, //收货人信息
        staffFlag: [], //推荐员工
        userShowF: false,
        payway: true, //默认微信支付
        params: null, //参数对象
        postage: 0, //邮费
        isbuy: false,
        recommendD: {},
        buy_status: 0
    },
    // 3.0新增事件
    // 是否出现员工可选
    userShowBtn() {
        this.setData({
            userShowF: !this.data.userShowF
        })
    },
    // 点击选中员工
    staffChangeBtn(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let staffFlag = this.data.staffFlag;
        let arrNow = []
        arrNow[index] = staffFlag[index] ? '' : id;
        this.setData({
            staffFlag: arrNow
        })
    },
    // 数量改变时触发的事件
    // 数量改变时触发的事件
    blurNumsBtn(e) {
        var that = this
        var nums = Number(e.detail.value);
        var maxNums = this.data.maxNums

        if (nums < 1) {
            A.showTipModal("最少需要购买一件", () => {
                that.setData({
                    nums: 1
                })
            })
            that.addOffNumFn(this.data.nums)
        } else if (nums > maxNums) {
            A.showTipModal("最多只能购买" + maxNums + "件", () => {
                that.setData({
                    nums: maxNums
                })
            })
            that.addOffNumFn(nums)
        } else {
            that.addOffNumFn(nums)
        }

    },
    // 增加修改数量方法的封装
    addOffNumFn(nums) {
        var _this = this;
        var address_info = _this.data.address_info
        var goods_info = _this.data.goods_info;
        var than = {};
        than.goodsNum = nums;
        than.goodsInfo = goods_info;
        than.addressInfo = address_info;
        A.updata.getFare(than).then(res => {
            if (res.status == A.STATE.STATUS.OK) {

                if (_this.data.is_genre == 0) {
                    _this.setData({
                        all_price: (((Number(_this.data.goods_info.bottom_price)) * nums) + Number(res.postage)).toFixed(2),
                        nums: nums
                    })
                } else {
                    _this.setData({
                        all_price: (((Number(_this.data.goods_info.bottom_price)) * nums)).toFixed(2),
                        nums: nums
                    })
                }
            }
        })
    },

    foodAddBtn1(e) {

        var that = this;
        var nums = that.data.nums;
        var maxNums = that.data.maxNums
        nums = Number(nums) + 1;
        if (maxNums >= nums) {
            this.addOffNumFn(nums)
        } else {
            this.setData({
                subtractionFlag: false
            })
        }
        this.setData({
            subtractionFlag: true
        })
    },
    foodAddBtn2(e) {
        var that = this;
        var nums = that.data.nums;
        nums = Number(nums) - 1;
        if (nums >= 1) {
            this.addOffNumFn(nums)
        } else {
            this.setData({
                subtractionFlag: false
            })
        }
        this.setData({
            subtractionFlag: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function(options) {
        var rec_datas ;
        if (options.recData && options.recData != 'undefined') {
            console.log(options.recData)
            rec_datas = JSON.parse(options.recData)
        }else{
            rec_datas = A.store.goods.recmendData || {}
        }
        console.log(rec_datas)
        var recommend_id = options.recommend_id; //推荐人id
        var bargin_id = options.bargin_id || 0; // 砍价id
        var goods_id = options.goods_id || 0;
        var group_id = options.group_id || 0;
        var address_id = options.address_id;
        var type = options.type || 1;
        var param = {};
        param.rec_datas = rec_datas
        // param.sharer_id = recommend_id;
        console.log(param.share_id)
        param.share_id = recommend_id;
        param.barginId = bargin_id;
        param.goodsId = goods_id;
        param.orderNum = 1;
        param.groupId = group_id;
        param.addressId = address_id || 0;
        this.getInitData(param)
        this.setData({
            type: type,
            params: param
        })

    },
    //获取初始数据
    getInitData: function(param) {
        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })
        A.updata.getOrderData(param).then(res => {
            var is_genre = 0;
            var postage = 0;
            wx.hideLoading()
            if (res.status == A.STATE.STATUS.OK) {
                // 如果赚红包分享，判断对象是否为空，进行页面渲染
                if (this.data.params.rec_datas) {
                    console.log(this.data.params.rec_datas)
                    if (Object.keys(this.data.params.rec_datas).length != 0) {
                        _this.setData({
                            recommendD: this.data.params.rec_datas,
                            buy_status: 1
                        })
                    }
                }else{
                    _this.setData({
                        recommendD: 0
                    })
                }
                // 是否开启员工提成&&是否是店家员工
                if (Object.keys(this.data.params.rec_datas).length != 0) {
                    if (res.goods_info.is_unit == 1 && this.data.params.rec_datas.is_account) {
                        _this.setData({
                            recommendD: this.data.params.rec_datas,
                            buy_status: 1
                        })
                    }
                } else{
                    _this.setData({
                        recommendD: 0
                    })
                }
                var all_price;
                if (res.goods_info.genre == 0) {
                    all_price = (((Number(res.goods_info.bottom_price)) * this.data.nums) + Number(res.goods_info.postage)).toFixed(2)
                    _this.setData({
                        patternFlage: 0,
                        is_genre: 0
                    })
                } else {
                    all_price = (((Number(res.goods_info.bottom_price)) * _this.data.nums)).toFixed(2)
                    _this.setData({
                        patternFlage: 1,
                        is_genre: 1
                    })
                }
                //根据库存和现购数和已经购买的数量来判断最大可以购买的数量
                if (res.goods_info.restriction == 0) {
                    this.setData({
                        maxNums: Number(res.goods_info.inventory)
                    })
                } else {
                    let buy_num = 0;
                    if (res.goods_info.buy_num) {
                        buy_num = res.goods_info.buy_num;
                    }
                    if (Number(res.goods_info.restriction) - Number(buy_num) <= 0) {
                        A.showTipModal("您已达最大限购数!", () => {
                            _this.setData({
                                nums: 0
                            })
                        })
                        //初始价格
                        all_price = "0.00";
                    } else {
                        _this.setData({
                            maxNums: Number(res.goods_info.restriction) - Number(buy_num) >= Number(res.goods_info.inventory) ? Number(res.goods_info.inventory) : Number(res.goods_info.restriction) - Number(buy_num)
                        })
                    }
                }
                _this.setData({
                    goods_info: res.goods_info,
                    address_info: res.address_info || '',
                    genre: res.goods_info.genre,
                    store_info: res.store_info,
                    member_info: res.user_info,
                    staff_list: res.staff_list || '',
                    type: _this.data.type,
                    postage: res.goods_info.postage,
                    all_price: all_price,
                    data: res
                })

            } else if (res.status == 600) {
                A.G('reLaunch:///pages/userPower/userPower')
            } else {
                A.showTipModal(res.info || A.information.DATAFAIL)
            }

        }, err => {
            wx.hideLoading()
        })

    },
    onShareAppMessage: function() {},
    //到店自取点击事件
    patternBtn1(e) {
        var patternFlage = e.currentTarget.dataset.patternflage
        this.setData({
            patternFlage: patternFlage,
            is_genre: patternFlage,
            all_price: (((Number(this.data.goods_info.bottom_price)) * this.data.nums)).toFixed(2)
        })
    },
    //上门取货点击事件
    patternBtn(e) {
        var patternFlage = e.currentTarget.dataset.patternflage
        this.setData({
            patternFlage: patternFlage,
            is_genre: patternFlage,
            all_price: (((Number(this.data.goods_info.bottom_price)) * this.data.nums) + Number(this.data.postage)).toFixed(2)
        })

    },
    //前往设置收货地址
    addressbut(e) {
        var goods_id = e.currentTarget.dataset.goodsid;
        var group_id = e.currentTarget.dataset.groupid || 0;
        var type = e.currentTarget.dataset.type;
        A.G('redirectTo:///pages/my/address/index?goods_id=' + goods_id + '&type=' + type + '&group_id=' + group_id + '&select_address=1')
    },
    // 选中微信支付
    paybut1() {
        this.setData({
            payway: true,
            pay_type: 2,
        })
    },
    // 选中余额支付
    paybut() {
        this.setData({
            payway: false,
            pay_type: 1,
        })
    },
    //前往店铺
    storeNavBtn: function(e) {
        var store_id = e.currentTarget.dataset.storeid;

        A.G("reLaunch:///pages/myStore/index?store_id=" + store_id)
    },
    //获取到店自取的联系人姓名和手机号
    messageBtn(e) {
        var that = this;
        var value = e.detail.value;
        var member_info = that.data.member_info;
        member_info.hx_name = value
        that.setData({
            member_info: member_info
        })
    },
    messageBtn1(e) {
        var that = this;
        var value = e.detail.value;
        var member_info = that.data.member_info;
        member_info.hx_tel = value
        that.setData({
            member_info: member_info
        })
    },

    //获取给卖家的留言信息
    remark(e) {
        var that = this;
        var remark = e.detail.value;
        that.setData({
            remark: remark,
        })
    },

    //去支付
    makeorder: function(e) {
        if (this.data.nums == 0) {
            A.showTipModal("您已达最大限购数!");
            return
        }
        if (this.data.isbuy) return;
        //支付方式
        var that = this;
        var is_genre = that.data.is_genre;
        var user_info = that.data.member_info;
        var payway = !that.data.payway ? 1 : 2;
        var all_price = that.data.all_price;
        var genre = that.data.is_genre;
        var address_id = 0;
        var remark = that.data.remark || '';
        var nums = that.data.nums;
        var goods_info = that.data.goods_info;
        // 员工信息
        var staffInfo = that.data.staff_list
        // 员工的id
        let staffFlag = this.data.staffFlag;
        let account_id = 0;
        staffFlag.find(item => {
            item ? account_id = item : ''
        })
        if (is_genre == 0) {
            if (that.data.address_info.id) {
                address_id = that.data.address_info.id;
            } else {
                A.showTipModal(A.information.NULLADDRESS)
                return
            }
        } else {
            if (!user_info.hx_name) {
                A.showTipModal(A.information.INPUTNAME)
                return
            }
            var reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
            if (!reg.test(user_info.hx_tel)) {
                A.showTipModal(A.information.WRONGPHONE)
                return
            }
        }

        var data = {} //封装了submitOrderInfo()的参数
        data.goodsId = this.data.params.goodsId;
        data.userInfo = user_info;
        data.addressId = address_id;
        data.payType = payway;
        data.remark = remark;
        data.orderNum = nums;
        data.groupId = this.data.params.groupId;
        data.genre = genre;
        data.now_number = Number(this.data.goods_info.now_number) + 1;
        data.is_group = this.data.goods_info.is_group;
        data.id = this.data.params.barginId;
        // data.sharer_id = this.data.params.sharer_id
        data.staffInfo = staffInfo;
        data.accountId = data.staffInfo.account_id;
        data.share_id = A.DB.user.uid;
        

        //余额支付
        if (payway == 1) {
            A.showBaseModal(A.information.BALANCEPAY, () => {
                wx.showLoading({
                    title: '提交订单',
                })
                this.setData({
                    isbuy: true
                });
                A.updata.submitOrderInfo(data).then(res => {
                    wx.hideLoading();
                    this.setData({
                        isbuy: false
                    });
                    var order_id = res.order_id;
                    if (res.status == A.STATE.STATUS.OK) {
                        A.showTipModal(res.info, () => {
                            A.G('redirectTo:///pages/my/inSharingActs/share/share?order_id=' + order_id)
                        })
                    } else if (res.status == 600) {
                        //  this.unlock();
                        A.G("redirectTo:///pages/userPower/userPower")
                    } else {
                        //  this.unlock();
                        A.showTipModal(res.info || A.information.DATAFAIL)
                    }
                }, err => {
                    wx.hideLoading();
                    this.setData({
                        isbuy: false
                    });
                })
            }, () => {})
            //微信支付
        } else if (payway == 2) {
            wx.showLoading({
                title: '提交订单',
            })
            this.setData({
                isbuy: true
            });
            A.updata.submitOrderInfo(data).then(res => {
                wx.hideLoading();
                this.setData({
                    isbuy: false
                });
                var order_id = res.order_id;
                if (res.status == 2) {
                    var that = this;
                    wx.requestPayment({
                        'timeStamp': res.jsApiParameters.timeStamp,
                        'nonceStr': res.jsApiParameters.nonceStr,
                        'package': res.jsApiParameters.package,
                        'signType': 'MD5',
                        'paySign': res.jsApiParameters.paySign,
                        'success': function(res) {

                            A.G('redirectTo:///pages/my/inSharingActs/share/share?order_id=' + order_id);
                        },
                        'fail': function(res) {

                        }
                    }, err => {
                        //  this.unlock();
                        A.showTipModal(err.info || A.information.DATAFAIL)
                    })
                } else if (res.status == 600) {
                    //  this.unlock();
                    A.G("redirectTo:///pages/userPower/userPower")
                } else {
                    //  this.unlock();
                    A.showTipModal(res.info || A.information.DATAFAIL)
                }
            }, err => {
                wx.hideLoading();
                this.setData({
                    isbuy: false
                });
                //  this.unlock();
                A.showTipModal(err.info || A.information.DATAFAIL)
            })
        }

    },
    //     // 解锁
    //   unlock() {
    //   if (this.data.group_id > 0) {
    //     var unionid = wx.getStorageSync('thisCode');
    //     wx.request({
    //       url: http.http + '/WeChatAppsCs/WeChatPay/clear_lock',
    //       header: { 'content-type': 'application/x-www-form-urlencoded' },
    //       method: 'POST',
    //       data: { unionid: unionid, group_id: this.data.group_id },
    //       success(res) { },
    //       fail(res) { }
    //     });
    //   }
    // }
}))