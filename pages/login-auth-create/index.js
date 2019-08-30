const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    name: '',
    mobile: '',
    aid: '',
    company: ''
  },
  onLoad(option) {
    this.setData({
      name: option.name,
      mobile: option.mobile,
      aid: option.aid,
      company: option.company
    })
  },
  submit() {

    $request.post('/v1/user/authorization', {
      name: this.data.name,
      mobile: this.data.mobile,
      aid: this.data.aid,
      company: this.data.company
    }).then((res) => {

      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })

    })
  }
})
