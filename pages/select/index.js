const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    user: {},
    main: 0,
    back: false
  },
  onLoad(option) {
    this.setData({
      back: option.back
    })
    $request.get('/v1/user/guestInfo', {
      gid: option.gid
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result,
        })
      }
    })
  },
  check(e) {
    this.setData({
      main: e.currentTarget.dataset['main']
    })
  },
  create() {
    if(this.data.back) {
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 3];
      prevPage.setData({
        gid: this.data.user.gid,
        main: this.data.main
      })
      wx.navigateBack({
        delta: 2 // 返回上一级页面。
      })
    } else {

      wx.navigateTo({
        url: "../bill-create/index?gid=" + this.data.user.gid + '&main=' + this.data.main
      })
    }
  }
})
