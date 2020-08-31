const $request = require('../../utils/request')
// pages/personal-nickname/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ''
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
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  save() {
    if(this.data.name.length >6 || this.data.name.length == 0) {
      wx.showToast({
        title: '姓名只能输入0-6个字符', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    $request.post('/home/users/updateuser', {
      nickName: this.data.name
    }).then((response) => {
      if(response.data.status == 'success') {
        wx.navigateBack({
          delta: 1
        })
      }
      
    })
  }
})