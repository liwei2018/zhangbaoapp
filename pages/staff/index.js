const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    bills: [],
    pageNum: 1,
    search: '',
  },
  onShow() {
    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  getList(up) {
    $request.get('/v1/user/staff',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      search: this.data.search
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
  
  search(e){
    this.setData({
      search: e.detail.value
    })
    this.onPullDownRefresh()
  },

})
