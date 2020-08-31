const $request = require('../../utils/request')
// pages/evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopindex: 0,
    images: [
      {
        image:'https://media.vipkidstatic.com/mgt/online-mall/1594885911127/%E5%95%86%E5%9C%BAbanner.png?thumb,w_200,h_200;quality,80'
      },
      {
        image:'https://media.vipkidstatic.com/mgt/online-mall/1594885911127/%E5%95%86%E5%9C%BAbanner.png?thumb,w_200,h_200;quality,80'
      },
      {
        image:'https://media.vipkidstatic.com/mgt/online-mall/1594885911127/%E5%95%86%E5%9C%BAbanner.png?thumb,w_200,h_200;quality,80'
      }
    ],
    shops: [],
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
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
    
    $request.get('/home/shops/list', {
    }).then((response) => {
      this.setData({
        shops: response.data.data
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
  clickTab(e) {
    console.log(e)
    this.setData({
      shopindex: e.detail
    })
  },
})