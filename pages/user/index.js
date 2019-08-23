const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    user: {},
    iscompany: 0,
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  onShow() {
    $request.get('/v1/user/info', {
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "user": res.data.result,
        })
      }
    })
    $request.get('/v1/user/info', {
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "user": res.data.result,
        })
      }
    })
  },
  
  clickTab(e) {
    this.setData({
      iscompany: e.currentTarget.dataset.iscompany
    })
  },
  
})
