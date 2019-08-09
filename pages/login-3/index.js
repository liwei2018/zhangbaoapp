//index.js
//获取应用实例
const $request = require('../../utils/request')

Page({
  data: {
    name: '',
    identityCard: '',
  },
  nextFun() {

    if (this.data.name.length == 0) {
      wx.showToast({
        title: "请输入真实姓名", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return false;
    }
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    console.log(this.data.identityCard)
    if (reg.test(this.data.identityCard) === false) {
      wx.showToast({
        title: "身份证输入不合法", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return false;
    }
    $request.get('/v1/user/detectAuth', {
      'name': this.data.name,
      'identityCard': this.data.identityCard,
    }).then((res) => {
      if (response2.data.result.token) {
        $auth.setAuthInfo(response2.data.result.token)
      }
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getIdentityCard(e) {
    this.setData({
      identityCard: e.detail.value
    })
  },
  getCode(e) {

  }
})
