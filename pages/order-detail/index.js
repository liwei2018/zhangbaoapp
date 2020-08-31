const $request = require('../../utils/request')
const $util = require('../../utils/util')
// pages/order-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paimaiStatus: $util.paimaiStatus2,
    paimaiStatusText: $util.paimaiStatus3,
    order: {},
    id: '',
    priceobj: {
      yingfuPrice: '暂无出价'
    },
    show: false,
    goods: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
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
    $request.get('/home/items/sellergetitem', {
      id: this.data.id
    }).then((res) => {
      if (res.data.data) {
        this.setData({
          order: res.data.data
        })
        if (res.data.data.status > 6) {
          $request.get('/home/lots/getbytype', {
            id: this.data.id,
            type: 5
          }).then((res) => {
            if (res.data.data) {
              this.setData({
                goods: res.data.data,
              })
            }
          })
        }
        if (res.data.data.paidePrice != '0.00') {
          $request.get('/home/lots/caculateprice', {
            price: res.data.data.paidePrice
          }).then((res) => {
            if (res.data.data) {
              this.setData({
                priceobj: res.data.data,
              })
            }
          })
        }
      }
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
  jieshou() {

  },
  jujue() {
    this.setData({
      show: true
    })
  },
  jujuesub() {
    $request.post('/home/items/rejectitemorder', {
      id: this.data.order.id
    }).then((res) => {
      if(response.data.status == 'success') {
        wx.redirectTo({
          url: '../success/index?type=3&text=您已确认拒绝本次最高出价&class=1&price=' +  this.data.order.paidePrice
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