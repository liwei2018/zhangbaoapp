const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    motto: 'Hello World',
    statementList: [],
    hasUserInfo: false,
    jujuedialog: false,
    iscomplete: 0,
    statements: [],
    pageNum: 1,
    statementState:$util.statementState,
    unfinished: 0,
    complete: 1,
    search: '',
    sid: '',
    remark:''
  },
  onShow() {
    $request.get('/v1/statement/total', {
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
    $request.get('/v1/statement/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      search: this.data.search,
      isComplete: this.data.iscomplete
    }).then((res) => {
      if (res.data.result) {
        if(up) {
          this.setData({
            statements: this.data.statements.concat(res.data.result)
          })
        } else {
          this.setData({
            statements: res.data.result
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
  confrimstatement(e) {
    const that = this
    this.setData({
      sid: e.currentTarget.dataset.sid
    })
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
        this.onShow()
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
  search(e){
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
