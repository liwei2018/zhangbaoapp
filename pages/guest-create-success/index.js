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
    isReg: 0,
  },
  onLoad(option) {
    if (option.isReg) {
      this.setData({
        name: option.name,
        mobile: option.mobile,
        company: option.company,
        isReg: option.isReg
      })
    }
  },
})
