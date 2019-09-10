const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    motto: 'Hello World',
    billList: [],
    hasUserInfo: false,
    jujuedialog: false,
    signed: 0,
    bills: [],
    pageNum: 1,
    billState:$util.billState,
    unfinished: 0,
    complete: 1,
    search: '',
    bid: '',
    remark:'',
    second: 0,
    fun: null,
    user: {},
    code: '',
    banner: [],
    imgheight: 0,
  },
  onLoad(option) {
    if(option.auth == 1) {
      wx.redirectTo({
        url: '../login-auth-list/index'
      })
    }
  },
  onShow() {
    this.setData({
      pageNum: 1
    })
    this.getList()
    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result,
        })
      }
    })
    $request.get('/v1/common/banner', {}).then((res) => {
      if (res.data.result) {
        this.setData({
          banner: res.data.result,
        })
        
        
      }
    })
  },
  imageLoad: function(e) {
    var $width = e.detail.width; //获取图片真实宽度
    var $height = e.detail.height; //获取图片真实高度
    var height = (wx.getSystemInfoSync().windowWidth - 40) * $height / $width
    this.setData({
      imgheight: height,
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
  getList(up) {
    $request.get('/v1/bills/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      search: this.data.search,
      signed: this.data.signed
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
    $request.get('/v1/bills/info', {
      bid: e.currentTarget.dataset.bid
    }).then((res) => {
      if (res.data.result.sign == 0) {
        this.setData({
          bid: e.currentTarget.dataset.bid,
          jujuedialog: true
        })
        this.sendCode()
      } else {
        wx.navigateTo({
          url: "../bill-detail/index?bid=" + e.currentTarget.dataset.bid
        })
      }
    })
    
  },
  confrimBill2() {
    const that = this
    $request.post('/v1/bills/confirm', {
      operation: 0,
      bid: this.data.bid
    }).then((res) => {
      if (res.data.error == 0) {
        this.jujuedialogClose()
        this.onShow()
      }
    })
  },
  jujuedialogClose() {
    this.setData({
      jujuedialog: false,
    })
  },
  clickTab(e) {
    this.setData({
      signed: e.currentTarget.dataset.signed
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
  getcode(e) {
    this.setData({
      code: e.detail.value
    })
  }
})
