//index.js
//获取应用实例
const $request = require('../../utils/request')

Page({
  data: {
    mobile: '',
    isSuccess: false
  },
  onLoad(option) {
    if (option.issuccess) {
      wx.setNavigationBarTitle({
        title: '邀请注册'
      })

      this.setData({
        isSuccess: option.issuccess,
        mobile: option.mobile
      })
    }
  },
  nextFun() {

    $request.post('/v1/common/inviteSms', {
      'mobile': this.data.mobile,
    }).then((res) => {
      wx.showToast({
        title: '发送成功', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
})
