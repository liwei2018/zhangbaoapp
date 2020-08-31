const $request = require('../../utils/request')
const $util = require('../../utils/util')
// pages/my-offer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabtype: 1,
    orders: [],
    pageNum: 1,
    paimaiStatus: $util.paimaiStatus2,
    paimaiStatusText: $util.paimaiStatus3,
    show: false,
    jujueid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
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
    $request.get('/home/items/sellerlistitem', {
      statusquery: this.data.tabtype,
      page: this.data.pageNum,
      size: 10
    }).then((res) => {
      if (res.data.data) {
        if (up) {
          this.setData({
            orders: this.data.orders.concat(res.data.data)
          })
        } else {
          this.setData({
            orders: res.data.data
          })
        }
      }
    })
  },
  jujue(e) {
    this.setData({
      show: true,
      jujueid: e.currentTarget.dataset.id,
    })
  },
  jujuesub() {

    $request.post('/home/items/rejectitemorder', {
      id: this.data.orders[this.data.jujueid].id
    }).then((res) => {
      if (response.data.status == 'success') {
        wx.navigateTo({
          url: '../success/index?type=3&text=您已确认拒绝本次最高出价&class=1&price=' + this.data.orders[this.data.jujueid].paidePrice
        })
      }
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  }
})