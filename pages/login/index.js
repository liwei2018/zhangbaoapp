//index.js
//获取应用实例
const $request = require('../../utils/request')
const $auth = require('../../utils/auth')
const app = getApp()

Page({
  data: {
    bindToken: '',
    redirect: '',
    loginBtn: true,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    if (option.redirect) {
      this.setData({
        redirect: option.redirect
      })
    }
  },
  getUserInfo: function (e) {
    const that = this
    wx.login({
      success(res) {
        if (res.code) {
          $request.post('/v1/user/appletLogin', {
            'code': res.code,
          }).then((response) => {
            $request.post('/v1/user/wechatLogin', {
              'code': response.data.result.code,
              'encryptedData': e.detail.encryptedData,
              'iv': e.detail.iv
            }).then((response2) => {
              if(response2.data.result.bindToken) {
                that.setData({
                  bindToken: response2.data.result.bindToken,
                  loginBtn: false,
                })
              }
              if(response2.data.result.token) {
                $auth.setAuthInfo(response2.data.result.token)
                if (that.data.redirect) {
                  wx.navigateBack({
                    delta: 1
                  })
                } else {
                  wx.switchTab({
                    url: '../bill/index'
                  })
                }
              }
            })
          })
        } else {
          wx.showToast({
            title: "登录失败！", //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
          })
        }
      }
    })
  }
  ,getPhoneNumber(e) {
    $request.post('/v1/user/bindMobile', {
      'bindToken': this.data.bindToken,
      'encryptedData': e.detail.encryptedData,
      'iv': e.detail.iv
    }).then((res) => {
      if (res.data.result.token) {
        $auth.setAuthInfo(res.data.result.token)
        wx.redirectTo({
          url: '../login-1/index'
        })
      }
    })
  }
})
