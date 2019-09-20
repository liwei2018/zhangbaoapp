const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    pageNum: 1,
    userList: [],
    search: ''
  },
  onShow() {

    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  createbill(e){
    if(!e.currentTarget.dataset['cid']) {
      wx.navigateTo({
        url: "../bill-create/index?gid=" + e.currentTarget.dataset['gid'] + '&main=0'
      })
      return;
    }
    wx.navigateTo({
      url: "../select/index?gid=" + e.currentTarget.dataset['gid']
    })
  },
  search(e){
    this.setData({
      search: e.detail.value
    })
    this.onPullDownRefresh()
  },
  getList(up) {
    $request.get('/v1/user/guest',{
      pageNum: this.data.pageNum,
      pageSize: 10,
      search: this.data.search,
    }).then((res) => {
      if (res.data.result) {
        if(up) {
          this.setData({
            userList: this.data.userList.concat(res.data.result)
          })
        } else {
          this.setData({
            userList: res.data.result
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
  selected(e) {

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      buyer: this.data.userList[e.currentTarget.dataset.index],
    })
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  }
})
