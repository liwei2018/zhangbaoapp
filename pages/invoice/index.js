const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    company: '',
    code: '',
    bank: '',
    bankAccount: '',
    money: '',
    name: '',
    mobile: '',
    address: '',
    money2: 0,
  },
  onShow() {
    $request.get('/v1/user/invoiceMoney',{
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          money2: res.data.result.money
        })
      }
    })
  },
  getcompany(e) {
    this.setData({
      company: e.detail.value
    })
  },
  getcode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getbank(e) {
    this.setData({
      bank: e.detail.value
    })
  },
  getbankAccount(e) {
    this.setData({
      bankAccount: e.detail.value
    })
  },
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getaddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  create() {
    $request.post('/v1/user/invoiceApply', {
      company: this.data.company,
      money: this.data.money,
      code: this.data.code,
      bank: this.data.bank,
      bankAccount: this.data.bankAccount,
      name: this.data.name,
      mobile: this.data.mobile,
      address: this.data.address,
    }).then((res) => {
      if (res.data.error == 0) {
        wx.showToast({
          title: '创建成功', //提示文字
          duration: 2000, //显示时长
          mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
        })
        wx.navigateTo({
          url: '../invoice-detail/index?recid=' + res.data.result.recid,
        })
      }
    })
  }
})
