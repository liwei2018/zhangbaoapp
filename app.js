
//app.js
const $auth = require('./utils/auth.js')
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        this.globalData.statusBarHeight = res.statusBarHeight //状态栏高度
      },
      failure() {
        this.globalData.statusBarHeight = 20
        this.globalData.titleBarHeight = 44
      }
    })
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
  },
  onShareAppMessage() {
    return {
      title: '宝账管家',
      path: '/pages/bill/index',
      imageUrl: '../../assets/images/share.png'
    }
  },
})