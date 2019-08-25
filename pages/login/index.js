//index.js
//获取应用实例
const $request = require('../../utils/request')
const $auth = require('../../utils/auth')
const app = getApp()

Page({
  data: {
    code: '',
    redirect: '',
    mobile: '',
    second: 0,
    fun: null,
  },
  onLoad: function (option) {
    if (option.redirect) {
      this.setData({
        redirect: option.redirect
      })
    }
  },
  getcode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  sendCode() {
    if(this.data.second > 0) {
      return;
    }
    $request.get('/v1/user/sendCode', {
      mobile: this.data.mobile,
      operate: 0
    }).then((res) => {
      
      this.setData({
        second: 60
      })
      setInterval(()=>{
        if(this.data.second == 0) {
          clearInterval(this.data.fun)
          return;
        }
        this.setData({
          second: this.data.second-1
        })
      },1000);
    })
  },
  login() {
    $request.post('/v1/user/login', {
      mobile: this.data.mobile,
      code: this.data.code
    }).then((res) => {
      if (res.data.result.token) {
        $auth.setAuthInfo(res.data.result.token)
        if(res.data.result.isRealName == 0) {
          wx.redirectTo({
            url: '../login-1/index'
          })
        } else {
          if (this.data.redirect) {
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.switchTab({
              url: '../bill/index'
            })
          }
        }
        
      }
    })
  }
})
