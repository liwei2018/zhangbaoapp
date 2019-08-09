const $request = require('../../utils/request')
Page({
  data: {
    "surplus": "",
    "recharge": "",
    "useDetails": [],
    chongzhi: false,
    package: [],
    selectIndex: null,
  },
  onShow() {
    $request.get('/v1/user/wallet').then((res) => {
      if (res.data.result) {
        this.setData({
          surplus: res.data.result.surplus,
          recharge: res.data.result.recharge,
          useDetails: res.data.result.useDetails
        })
      }
    })
  },
  showchongzhi() {
    this.setData({
      chongzhi: true
    })
    $request.get('/v1/user/package').then((res) => {
      if (res.data.error == 0) {
        this.setData({
          package: res.data.result
        })
      }
    })
  },
  seletedpackage(e) {
    console.log(e)
    this.setData({
      selectIndex: e.currentTarget.dataset.index,

    })
  },
  packageConfirm() {
    const that = this;
    if (!this.data.selectIndex && this.data.selectIndex != 0) {
      wx.showToast({
        title: '请选择充值套餐', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    $request.post('/v1/user/recharge', {
      payType: 0,
      source: 1,
      pid: this.data.package[this.data.selectIndex].pid
    }).then((res) => {
      if (res.data.error == 0) {
        wx.requestPayment({
          timeStamp: res.data.result.payParameters.timeStamp,
          nonceStr: res.data.result.payParameters.nonceStr,
          package: res.data.result.payParameters.package,
          signType: res.data.result.payParameters.signType,
          paySign: res.data.result.payParameters.paySign,
          success(res) { 
            that.packageClose()
            that.show()
          },
          fail(res) { }
        })
      }
    })

  },
  packageClose() {
    this.setData({
      selectIndex: null,
      chongzhi: false
    })
  }
})
