const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    bills: [],
    pageNum: 1,
    money2: 0
  },
  onShow() {
    $request.get('/v1/user/invoiceMoney',{
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          money2: res.data.result.money
        })
      }
    })
    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  getList(up) {
    $request.get('/v1/user/invoice',{
      pageNum: this.data.pageNum,
      pageSize: 10,
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
