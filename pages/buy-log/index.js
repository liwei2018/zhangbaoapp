const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    bills: [],
    pageNum: 1,
    cid: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  onShow() {
    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  getList(up) {
    $request.get('/v1/user/useDetails',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      cid: this.data.cid
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
  
})
