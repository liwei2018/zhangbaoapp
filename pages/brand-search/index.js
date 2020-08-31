const $request = require('../../utils/request')
// pages/brand/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    brandlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    $request.post('/home/items/listallbrand', {
    }).then((response) => {
      this.setData({
        brandlist: response.data.data
      })
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  oncancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  oninput(e) {
    this.setData({
      key: e.detail
    })
  }
})