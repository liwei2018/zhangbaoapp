
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
    console.log(123)
  },
  globalData: {
    userInfo: null
  },
  onShareAppMessage() {
    return {
      title: 'ECO',
      path: '/pages/index/index',
      imageUrl: '../../assets/images/share.png'
    }
  },
})