const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    bill: {},
    bid: ''
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
  },
  submit(e){
    // wx.showModal({
    //   title: '',
    //   content: '确认申请撤回单据？',
    //   cancelText: "取消",
    //   confirmText: '确认',
    //   success: (res) => {
    //     if (res.confirm) {
    //       $request.post('/v1/bills/cancel', {
    //         bid: this.data.bill.bid,
    //         operation: e.currentTarget.dataset.operation
    //       }).then((res) => {
    //         this.getbill()
    //       })
    //     } else {
    //     }
    //   }
    // })
    $request.post('/v1/bills/cancel', {
      bid: this.data.bill.bid,
      operation: e.currentTarget.dataset.operation
    }).then((res) => {
      this.getbill()
    })
  },
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
})
