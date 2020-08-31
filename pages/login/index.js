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
    loginBtn: true,
    bindToken: '',
    type: 1,
    show: false
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
  
  login() {
    $request.post('/v1/user/login', {
      mobile: this.data.mobile,
      code: this.data.code
    }).then((res) => {
      if (res.data.result.token) {
        $auth.setAuthInfo(res.data.result.token)

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
    })
  },
  getUserInfo: function (e) {
    const that = this
    wx.login({
      success(res) {
        if (res.code) {
          $request.post('/home/users/getwechatlogincode', {
            'code': res.code,
          }).then((response) => {
            $request.post('/home/users/loginbywechat', {
              'loginCode': response.data.data.code,
              'rawData': e.detail.rawData
            }).then((response2) => {
              if(!response2.data.data.userInfoDO.telphone) {
                that.setData({
                  show: true
                })
              } else {
                if (that.data.redirect) {
                  wx.navigateBack({
                    delta: 1
                  })
                } else {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
              }
              if(response2.data.data.token) {
                $auth.setAuthInfo(response2.data.data.token)
                
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
    $request.post('/home/users/bindtelphone', {
      'encryptedData': e.detail.encryptedData,
      'iv': e.detail.iv
    }).then((res) => {
      if (res.data.data.token) {
        $auth.setAuthInfo(res.data.data.token)
        wx.switchTab({
          url: '../index/index'
        })
      }
    })
  },
  logintype(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  }
})
