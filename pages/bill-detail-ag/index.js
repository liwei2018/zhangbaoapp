const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    bill: {},
    bid: '',
    second: 0,
    fun: null,
    user: {},
    code: '',
    operation: '',
    jujuedialog: false,
  },
  onLoad(option) {
    this.setData({
      bid: option.bid
    })
    this.getbill()
  },
  getbill() {
    $request.get('/v1/bills/info', {
      bid: this.data.bid
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          bill: res.data.result
        })
        wx.setNavigationBarTitle({
          title: res.data.result.billTypeText
        })
      }
    })
    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result,
        })
      }
    })
  },
  confrimBill(e) {
    const that = this
    console.log(123)
    this.setData({
      operation: e.currentTarget.dataset.operation,

      jujuedialog: true
    })
    this.setData({
    })
    this.sendCode()
  },

  confrimBill2() {
    const that = this
    $request.post('/v1/bills/confirm', {
      operation: that.data.operation,
      bid: this.data.bid
    }).then((res) => {
      if (res.data.error == 0) {
        this.jujuedialogClose()
        this.getbill()
      }
    })
  },
  sendCode() {
    if (this.data.second > 0) {
      return;
    }
    $request.get('/v1/bills/confirmSms', {
      bid: this.data.bid,
    }).then((res) => {

      this.setData({
        second: 60
      })
      setInterval(() => {
        if (this.data.second == 0) {
          clearInterval(this.data.fun)
          return;
        }
        this.setData({
          second: this.data.second - 1
        })
      }, 1000);
    })
  },
})
