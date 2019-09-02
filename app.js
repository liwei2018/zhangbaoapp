
//app.js
const $auth = require('./utils/auth.js')
App({
  onLaunch: function () {
    
  },
  onShow (options) {
    let token = $auth.getToken()
    if(!token) {
      wx.navigateTo({
        url: '../login/index',
      })
    }
  },
  globalData: {
    userInfo: null
  }
})