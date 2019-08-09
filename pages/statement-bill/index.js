const $request = require('../../utils/request')
Page({
  data: {
    num: null,
    bills: [],
    pageNum: 1
  },
  onShow(add) {
    this.getList();
  },
  getList(add) {
    $request.get('/v1/bills/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      isComplete: 1,
      source: 1,
    }).then((res) => {
      if (res.data.result) {
        if(add) {
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
    this.onShow() 
  },
  onReachBottom() {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.onShow(true)
  },
  selected(e) {

    if (this.data.num) {
      let bills = []
      let allmoney = 0;
      let bid = ''
      this.data.num.forEach(item=>{
        bills.push(this.data.bills[item])
        allmoney += this.data.bills[item].money
        bid += this.data.bills[item].bid + ','
      })
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        bills,
        bid,
        allmoney,
        debts: allmoney
      })
    }
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  },
  radioChange(e) {
    this.setData({
      num: e.detail.value
    })

  }
})
