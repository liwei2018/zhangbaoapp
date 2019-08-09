const $request = require('../../utils/request')
Page({
  data: {
    message: [],
    pageNum: 1,
  },
  onShow(add) {
    this.setData({
      pageNum: 1
    })
    this.getList();
  },
  getList(add) {
    $request.get('/v1/message/list',{
      pageNum: this.data.pageNum,
      pageSize: 10,
    }).then((res) => {
      if (res.data.result) {
        if(add) {
          this.setData({
            message: this.data.useDetails.concat(res.data.result)
          })
        } else {
          this.setData({
            message: res.data.result
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
  goto(e) {
    let type = {
      0: '../bill-detail/index',
      1: '../contract-detail/index',
      2: '../statement-detail/index',
    }
    let url = `${type[e.currentTarget.dataset.type]}?id=${e.currentTarget.dataset.operatorid}`
    if (Number(e.currentTarget.dataset.type) <3) {
      wx.navigateTo({
        url: url,
      })
    } else {
      this.data.message[e.currentTarget.dataset.index].isRead = 1
      this.setData({
        message: this.data.message
      })
    }
    $request.post('/v1/message/read', {
      mid: e.currentTarget.dataset.mid,
    }).then((res) => {
    })
  }
})
