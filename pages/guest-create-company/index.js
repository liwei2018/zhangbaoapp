const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    userList: [],
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  search(e) {
    $request.get('/v1/common/searchList', {
      name: e.detail.value,
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "userList": res.data.result,
        })
      }
    })
  },
  selected(e) {

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      company: this.data.userList[e.currentTarget.dataset.index].enterprise,
      code: this.data.userList[e.currentTarget.dataset.index].code,
    })
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  }
})
