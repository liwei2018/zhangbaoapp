const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    userList: [],
    statusBarHeight: getApp().globalData.statusBarHeight,
    buyer: null
  },
  search(e) {
    $request.get('/v1/user/guest', {
      search: e.detail.value,
      pageSize: 100,
      pageNum: 1
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "userList": res.data.result,
        })
      }
    })
  },

  selected(e) {
    this.setData({
      buyer: this.data.userList[e.currentTarget.dataset.index],
    })
    if(this.data.buyer.cid) {
      wx.showActionSheet({
        itemList: [this.data.buyer.name, this.data.buyer.company],
        success: (res)=> {
            this.selected2(res.tapIndex)
        },
        fail: (res)=> {
        }
      })
    } else {
      this.selected2(0)
    }
    
  },
  selected2(tapIndex) {
    console.log(tapIndex)
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      buyer: this.data.buyer,
      main: tapIndex
    })
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  }
})
