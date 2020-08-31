const $request = require('../../utils/request')
// pages/my-offer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabtype: 1,
    orders: [],
    pageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type) {
      this.setData({
        tabtype: options.type
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickTab(e) {
    this.setData({
      tabtype: e.currentTarget.dataset.tabtype,
      pageNum: 1
    })
    this.getList()
  },
  getList(up) {
    $request.get('/home/lots/buyerlistorder', {statusquery: this.data.tabtype, page: this.data.pageNum, size: 10}).then((res) => {
      if (res.data.data) {
        if(up) {
          this.setData({
            orders: this.data.goods.concat(res.data.data)
          })
        } else {
          this.setData({
            orders: res.data.data
          })
        }
      }
    })
  },
})