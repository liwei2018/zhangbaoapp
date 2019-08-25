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
  },
  onLoad(option) {
    if (option.gid) {
      $request.get('/v1/user/guestInfo', {
        gid: option.gid
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            name: res.data.result.name,
            mobile: res.data.result.mobile,
            code: res.data.result.code,
            company: res.data.result.company,
            gid: res.data.result.gid,
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
      if (res.data.error == 0) {
        wx.navigateTo({
          url: `../guest-create-success/index?name=${this.data.name}&company=${this.data.company}&mobile=${this.data.mobile}&isReg=${res.data.result.isReg}`
        })
      }
    })
  }
})
