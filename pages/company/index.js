const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    companys: [],
    pageNum: 1,
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  onShow() {
    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  getList(up) {
    $request.get('/v1/user/company',{
      pageNum: this.data.pageNum,
      pageSize: 10,
    }).then((res) => {
      if (res.data.result) {
        if(up) {
          this.setData({
            companys: this.data.companys.concat(res.data.result)
          })
        } else {
          this.setData({
            companys: res.data.result
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
