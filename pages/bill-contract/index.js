const $request = require('../../utils/request')
Page({
  data: {
    num: null,
    contracts: [],
    pageNum: 1
  },
  onShow(add) {
    this.getList();
  },
  getList(add) {
    $request.get('/v1/contract/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      isComplete: 1,
      contractType: 0
    }).then((res) => {
      if (res.data.result) {
        if(add) {
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
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        contracts: [this.data.contracts[this.data.num]],
        cid: this.data.contracts[this.data.num].cid,
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
