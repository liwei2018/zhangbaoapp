//index.js
//获取应用实例
const $request = require('../../utils/request')

Page({
  data: {
    signature: ''
  },
  onShow() {
    $request.get('/v1/user/info', {
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          signature: res.data.result.signature
        })
      }
    })
  },
  sign() {
    $request.post('/v1/user/signature', {
    }).then((res) => {
      if (res.data.error == 0) {
        this.onShow()
      }
    })
  }
})
