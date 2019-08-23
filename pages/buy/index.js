const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    packages: [],
    statusBarHeight: getApp().globalData.statusBarHeight,
    pid: ''
  },
  onShow() {
    $request.get('/v1/user/package', {
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "packages": res.data.result,
        })
      }
    })
    
  },
  selected(e) {
    this.setData({
      pid: e.currentTarget.dataset.pid
    })
  },
  submit() {
    $request.post('/v1/user/createOrder', {
      pid: this.data.pid
    }).then((res) => {
      if (res.data.error == 0) {
        wx.navigateTo({
          url: `../pay/index?orderNum=${res.data.result.orderNum}&packageInfo=${res.data.result.packageInfo}&price=${res.data.result.price}`
        })
      }
    })
  }
})
