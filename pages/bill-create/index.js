const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    companyNumber: 0,
    billType: '0',
    companyArr: [],
    companylist: [],
    guest: {},
    guestList: [],
    guestArr: [],
    guestNumber: 0,
    refundTime: $util.formatDate(new Date()),
    money: '',
    shouldMoney: '',
    statusNumber: 0,
    remark: '',
    imgs: [],
    lock: false,
    statusOpt: [
      '未结算',
      '已结算'
    ],
    statusBarHeight: getApp().globalData.statusBarHeight,
    billTime: $util.formatDate(new Date()),
    success: true,
    payType: 0,
    payTypelist: [
      '现金',
      '微信',
      '支付宝',
      '折让单',
      '银行汇款',
      '其他'
    ]
  },
  onShareAppMessage() {
    return {
      title: '宝账管家',
      path: '/pages/bill/index',
      imageUrl: '../../assets/images/share.png'
    }
  },
  onShow() {
    this.searchcompany();
  },
  //获取公司列表
  searchcompany() {
    $request.get('/v1/user/company', {
      pageSize: 100,
      pageNum: 1,
      job: 0
    }).then((res) => {
      if (res.data.result) {
        var arr = []
        res.data.result.forEach(element => {
          arr.push(element.company)
        });
        arr.push('创建企业')
        this.setData({
          companylist: res.data.result,
          companyArr: arr,
        })
      }
    })
  },
  //调取客户列表
  searchguest() {
    $request.get('/v1/user/guest', {
      pageSize: 100,
      pageNum: 1,
      search: '',
      cid: this.data.companylist[this.data.companyNumber].cid
    }).then((res) => {
      if (res.data.error == 0) {
        var arr = []
        res.data.result.forEach(element => {
          arr.push(element.company || element.name)
        });
        this.setData({
          guestList: res.data.result,
          guestArr: arr
        })
      }
    })
  },
  //点击获得我的企业的index
  getcompanyindex(e) {
    if (Number(e.detail.value) == this.data.companylist.length) {
      wx.navigateTo({
        url: '../certificateorjoin-company/index'
      })
      return;
    }
    this.setData({
      companyNumber: Number(e.detail.value)
    })
  },
  //获得点击的账单类型
  getbillType(e) {
    this.setData({
      billType: e.currentTarget.dataset['type']
    })
  },
  //点击获得客户的index
  getguestindex(e) {
    this.setData({
      guestNumber: Number(e.detail.value)
    })
  },
  getpayType(e) {
    this.setData({
      payType: Number(e.detail.value)
    })
  },
  getmoney(e) {
    this.setData({
      money: e.detail.value
    })
  },
  getshouldMoney(e) {
    this.setData({
      shouldMoney: e.detail.value
    })
  },
  getstatus(e) {
    this.setData({
      statusNumber: e.detail.value
    })
  },
  getremark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  delimg(e) {
    var index = e.currentTarget.dataset['index'];
    this.data.imgs.splice(index, 1);
    this.setData({
      imgs: this.data.imgs
    })
  },
  getbillTime(e) {
    this.setData({
      billTime: e.detail.value,
    })
  },
  add() {
    wx.navigateTo({
      url: '../guest-create/index?cid=' + this.data.companylist[this.data.companyNumber].cid
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: (9 - this.data.imgs.length),
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: `${$request.config.protocol}://${$request.config.domain}/v1/common/imageUpload`,
            filePath: element,
            name: 'image',
            success(res) {
              let data = JSON.parse(res.data)
              that.data.imgs.push(data.result.url)
              that.setData({
                imgs: that.data.imgs
              })
            }
          })
        });
      }
    })
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  submitForm() {
    if (this.data.lock) {
      return;
    }
    if (!this.data.money) {
      wx.showToast({
        title: '请填写金额', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    this.setData({
      lock: true
    })
    if (this.data.billType == 1) {
      wx.showModal({
        title: '',
        content: '客户签署对账单后，应收款金额将以此单为准，请再次核对此客户欠款金额是否准确',
        cancelText: "取消",
        confirmText: '确定',
        success: (res) => {
          if (res.confirm) {
            $request.post('/v1/bills/create', {
              cid: this.data.companylist[this.data.companyNumber].cid,
              gid: this.data.guest.gid,
              main: this.data.main,
              shouldMoney: this.data.shouldMoney,
              money: this.data.money,
              status: this.data.status,
              billType: this.data.billType,
              payType: this.data.payType,
              billTime: this.data.billTime,
              pictures: this.data.imgs.join(','),
              remark: this.data.remark,
            }).then((res) => {
              if (res.data.error == 0) {
                wx.redirectTo({
                  url: `../bill-create-success/index?bid=${res.data.result.bid}`
                })
              }
            }).catch((res) => {

            })
          }
        }
      })
    } else {
      $request.post('/v1/bills/create', {
        cid: this.data.companylist[this.data.companyNumber].cid,
        gid: this.data.guest.gid,
        main: this.data.main,
        shouldMoney: this.data.shouldMoney,
        money: this.data.money,
        status: this.data.status,
        billType: this.data.billType,
        payType: this.data.payType,
        billTime: this.data.billTime,
        pictures: this.data.imgs.join(','),
        remark: this.data.remark,
      }).then((res) => {
        if (res.data.error == 0) {
          wx.redirectTo({
            url: `../bill-create-success/index?bid=${res.data.result.bid}`
          })
        }
      }).catch((res) => {

      })
    }
  }
})