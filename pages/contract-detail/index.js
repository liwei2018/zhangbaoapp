const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    contractState: $util.contractState,
    historytype: $util.historytype,
    contract: {
    },
    cid: '',
    remark: '',
    jujuedialog: false
  },
  onLoad: function(option) {
    let that = this
    $request.get('/v1/contract/info', {
      cid: option.id
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          "contract": res.data.result,
          cid: option.id
        })
      }
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
  cancelcontract(e) {
    const that = this
    wx.showModal({
      title: '',
      content: '是否确认将该合同取消？',
      cancelText: "否",
      confirmText: '是',
      success: (res) => {
        if (res.confirm) {

          $request.post('/v1/contract/cancel', {
            cid: this.data.cid
          }).then((res) => {
            if (res.data.error == 0) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
        }
      }
    })
  },
  confrimcontract(e) {
    const that = this
    wx.showModal({
      title: '',
      content: '签署该合同代表您接受电子合同上的信息描述，是否确认？',
      cancelText: "拒绝",
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          $request.get('/v1/user/info', {
          }).then((res) => {
            if (res.data.error == 0) {
              if (res.data.result.signature) {
                this.confrimBill2()
              } else {
                this.userSignatur()
              }
            }
          })
        } else {
          this.setData({
            jujuedialog: true
          })
        }
      }
    })
  },
  userSignatur() {
    wx.showModal({
      title: '',
      content: '您尚未录入个人电子签名，无法确认账单',
      cancelText: "取消",
      confirmText: '马上录入',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '../user-signature/index',
          })
        } else {
        }
      }
    })
  },
  confrimBill2() {
    const that = this
    $request.post('/v1/contract/confirm', {
      confirmType: 0,
      cid: this.data.cid
    }).then((res) => {
      if (res.data.error == 0) {
        wx.navigateBack({
            delta: 1
          })
      }
    })
  }, 
  jujuedialogClose() {
    this.setData({
      jujuedialog: false,
      remark: ''
    })
  },
  refuse() {
    $request.post('/v1/contract/refuse', {
      remark: this.data.remark,
      cid: this.data.cid
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          jujuedialog: false,
          remark: ''
        })
        wx.navigateBack({
            delta: 1
          })
      }
    })
  },
  getremark(e) {
    this.setData({
      remark: e.detail.value
    })
  }
})
