const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    statementState: $util.statementState,
    historytype: $util.historytype,
    statement: {
    },
    bills: [],
    jujuedialog: false,
    sid: '',
    remark: ''
  },
  onLoad: function(option) {
    let that = this
    $request.get('/v1/statement/info', {
      sid: option.id
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          "statement": res.data.result,
          sid: option.id
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
  confrimstatement(e) {
    const that = this
    wx.showModal({
      title: '',
      content: '确认该笔对账单代表您接受对账单上的信息描述，是否确认？',
      cancelText: "拒绝",
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {

          $request.get('/v1/user/info', {
          }).then((res) => {
            if (res.data.error == 0) {
              if (res.data.result.signature) {
                this.confrimstatement2()
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
  confrimstatement2() {
    const that = this
    $request.post('/v1/statement/confirm', {
      confirmType: 0,
      sid: this.data.sid
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
      jujuedialog: false
    })
  },
  clickTab(e) {
    this.setData({
      iscomplete: e.currentTarget.dataset.iscomplete
    })
    this.onPullDownRefresh()
  },
  create() {

  },
  search(e) {
    this.setData({
      search: e.detail.value
    })
    this.onPullDownRefresh()
  },
  refuse() {
    $request.post('/v1/statement/refuse', {
      remark: this.data.remark,
      sid: this.data.sid
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
  },
  cancelstatement(e) {
    const that = this
    wx.showModal({
      title: '',
      content: '是否确认将该对账单取消？',
      cancelText: "否",
      confirmText: '是',
      success: (res) => {
        if (res.confirm) {

          $request.post('/v1/statement/cancel', {
            sid: this.data.sid
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
})
