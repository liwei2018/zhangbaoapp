//index.js
//获取应用实例
const $request = require('../../utils/request')
const $auth = require('../../utils/auth')
const app = getApp()

Page({
  data: {
    user: {},
  },
  onShow() {

    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.error == 0) {
        console.log(res.data.result)
        this.setData({
          user: res.data.result
        })
      }
    })
  },
})
