const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    "orderNum": "",
    "packageInfo": "",
    "price": 0
  },
  onLoad(option) {
    if (option.orderNum) {
      this.setData({
        "orderNum": option.orderNum,
        "packageInfo": option.packageInfo,
        "price": option.price
      })
    }
  },
  submit() {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          $request.post('/v1/user/getOpenId', {
            'code': res.code,
          }).then((response) => {
            $request.post('/v1/user/recharge', {
              payType: 0,
              orderNum: that.data.orderNum,
              source: 1,
              openid: response.data.result.openid
            }).then((res) => {
              if (res.data.error == 0) {
                wx.requestPayment({
                  timeStamp: res.data.result.payParameters.timeStamp,
                  nonceStr: res.data.result.payParameters.nonceStr,
                  package: res.data.result.payParameters.package,
                  signType: res.data.result.payParameters.signType,
                  paySign: res.data.result.payParameters.paySign,
                  success(res) {
                    wx.showToast({
                      title: '充值成功', //提示文字
                      duration: 2000, //显示时长
                      mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
                      icon: 'none', //图标，支持"success"、"loading"  
                    })
                    wx.navigateBack({
                      delta: 1
                    })
                  },
                  fail(res) {}
                })
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
})
