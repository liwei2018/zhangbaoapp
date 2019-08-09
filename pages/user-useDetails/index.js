const $request = require('../../utils/request')
Page({
  data: {
    "useDetails": [],
    pageNum: 1,
  },
  onShow(add) {
    this.getList();
  },
  getList(up) {
    $request.get('/v1/user/useDetails',{
      pageNum: this.data.pageNum,
      pageSize: 10,
    }).then((res) => {
      if (res.data.result) {
        if(up) {
          this.setData({
            useDetails: this.data.useDetails.concat(res.data.result)
          })
        } else {
          this.setData({
            useDetails: res.data.result
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
