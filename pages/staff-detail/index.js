const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    guest: {},
    billType: 0,
    bills: [],
    op: 0,
    gid: '',
    sid: ''
  },
  onLoad(option) {
    this.setData({
      op: option.op,
      gid: option.gid,
      sid: option.sid,
    })
    if (option.op == 0) {
      wx.setNavigationBarTitle({
        title: '员工详情'
      })
    }
    
    
  },
  onShow() {
    if(this.data.op == 1){
      $request.get('/v1/user/guestInfo', {
        gid: this.data.gid
      }).then((res) => {
        if (res.data.result) {
          this.setData({
            guest: res.data.result,
          })
          this.setData({
            pageNum: 1
          })
          this.getList()
        }
      })
    } else {
      $request.get('/v1/user/staffInfo', {
        sid: this.data.sid
      }).then((res) => {
        if (res.data.result) {
          this.setData({
            guest: res.data.result,
          })
          this.setData({
            pageNum: 1
          })
          this.getList()
        }
      })
    }
  },
  getList(up) {
    $request.get('/v1/user/billsList',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      mobile: this.data.guest.mobile,
      billType: this.data.billType,
      op: this.data.op,
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
  
  clickTab(e) {
    console.log(e)
    this.setData({
      billType: e.currentTarget.dataset.billtype
    })
    this.onPullDownRefresh()
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.guest.mobile
    })
  },
  createbill(e){
    if(!e.currentTarget.dataset['cid']) {
      wx.navigateTo({
        url: "../bill-create/index?gid=" + e.currentTarget.dataset['gid'] + '&main=0'
      })
    }
    wx.navigateTo({
      url: "../select/index?gid=" + e.currentTarget.dataset['gid']
    })
  },
})
