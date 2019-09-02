//index.js
//获取应用实例
const $request = require('../../utils/request')

Page({
  data: {
    name: '',
    mobile: '',
    code: '',
    company: '',
    gid: '',
    user: {},
    success: false
  },
  onShareAppMessage() {
    return {
      title: '宝账管家',
      path: '/pages/bill/index',
      imageUrl: '../../assets/images/login/logo.png'
    }
  },
  onLoad(option) {
    if (option.gid) {
      wx.setNavigationBarTitle({
        title: '修改客户'
      })
      this.setData({
        gid: option.gid
      })
      $request.get('/v1/user/guestInfo', {
        gid: option.gid
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            name: res.data.result.name,
            mobile: res.data.result.mobile,
            code: res.data.result.code,
            company: res.data.result.company,
            user: res.data.result
          })
        }
      })
    }
  },
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getcompany(e) {

    wx.navigateTo({
      url: "../guest-create-company/index"
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  submit() {
    
    $request.post('/v1/user/guestUpdate', {

      name: this.data.name,
      mobile: this.data.mobile,
      code: this.data.code,
      company: this.data.company,
      gid: this.data.gid,
    }).then((res) => {
      
      if(this.data.gid) {
        wx.navigateBack({
          delta: 1 // 返回上一级页面。
        })
      } else {
        if (res.data.error == 0) {
          this.setData({
            success: true
          })
        }
      }
    })
  }
})
