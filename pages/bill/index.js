const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    motto: 'Hello World',
    billList: [],
    hasUserInfo: false,
    jujuedialog: false,
    iscomplete: 0,
    bills: [],
    pageNum: 1,
    billState:$util.billState,
    unfinished: 0,
    complete: 1,
    search: '',
    bid: '',
    remark:''
  },
  onShow() {
    $request.get('/v1/bills/total', {
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "unfinished": res.data.result.unfinished,
          "complete": res.data.result.complete
        })
      }
    })
    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  getList(up) {
    $request.get('/v1/bills/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      search: this.data.search,
      isComplete: this.data.iscomplete
    }).then((res) => {
      if (res.data.result) {
        if(up) {
          this.setData({
            bills: this.data.bills.concat(res.data.result)
          })
        } else {
          this.setData({
            bills: res.data.result
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    this.setData({
      pageNum: 1
    })
    this.getList() 
  },
  onReachBottom() {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getList(true)
  },
  confrimBill(e) {
    const that = this
    this.setData({
      bid: e.currentTarget.dataset.bid
    })
    wx.showModal({
      title: '',
      content: '确认该笔账单代表您接受电子账单上的信息描述，是否确认？',
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
    $request.post('/v1/bills/confirm', {
      confirmType: 0,
      bid: this.data.bid
    }).then((res) => {
      if (res.data.error == 0) {
        this.onShow()
      }
    })
  },
  jujuedialogClose() {
    this.setData({
      jujuedialog: false,
      remark: ''
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
  search(e){
    this.setData({
      search: e.detail.value
    })
    this.onPullDownRefresh()
  },
  refuse() {
    $request.post('/v1/bills/refuse', {
      remark: this.data.remark,
      bid: this.data.bid
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          jujuedialog: false,
          remark: ''
        })
        this.onShow()
      }
    })
  },
  getremark(e) {
    this.setData({
      remark: e.detail.value
    })
  }
})
