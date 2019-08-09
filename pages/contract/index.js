const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    motto: 'Hello World',
    contractList: [],
    hasUserInfo: false,
    jujuedialog: false,
    iscomplete: 0,
    contracts: [],
    pageNum: 1,
    contractState:$util.contractState,
    unfinished: 0,
    complete: 1,
    search: '',
    createDialog: false,
    cid: '',
    remark: '',
  },
  onShow() {
    $request.get('/v1/contract/total', {
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
    $request.get('/v1/contract/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      search: this.data.search,
      isComplete: this.data.iscomplete
    }).then((res) => {
      if (res.data.result) {
        if(up) {
          this.setData({
            contracts: this.data.contracts.concat(res.data.result)
          })
        } else {
          this.setData({
            contracts: res.data.result
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
  search(e){
    this.setData({
      search: e.detail.value
    })
    this.onPullDownRefresh()
  },
  create() {
    this.setData({
      createDialog: true
    })
  },
  createDialogClose() {
    this.setData({
      createDialog: false
    })
  },
  confrimcontract(e) {
    const that = this
    this.setData({
      cid: e.currentTarget.dataset.cid,
    })
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
        this.onShow()
      }
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
