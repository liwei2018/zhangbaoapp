const $request = require('../../utils/request')
// pages/order-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    accounts: [],
    bankindex: -1,
    id:'',
    priceobj: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 1) { //卖家
      $request.get('/home/items/sellergetitem', {
        id: options.id
      }).then((res) => {
        if (res.data.data) {
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
      $request.get('/home/users/listplatformaccount', {
      }).then((response) => {
        this.setData({
          accounts: response.data.data,
          id: options.id
        })
        
      })
      wx.setNavigationBarTitle({
        title: '接受出价' 
      })
    } else { //买家
      $request.get('/home/users/listuseraccount', {
      }).then((response) => {
        this.setData({
          accounts: response.data.data,
          id: options.id
        })
        
      })
      wx.setNavigationBarTitle({
        title: '上传凭证' 
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
  seletbank(e) {
    this.setData({
      bankindex: e.currentTarget.dataset.index
    })
  },
  jieshou() {
    if(this.data.bankindex < 0) {
      wx.showToast({
        title: '请选择收款账户', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    $request.post('/home/items/agreeitemorder', {
      id: this.data.id,
      sellerAccountId: this.data.accounts[this.data.bankindex].id
    }).then((response) => {
      if(response.data.status == 'success') {
        wx.redirectTo({
          url: '../success/index?type=1&text=您已接受此次拍卖的拍得价格我们将在买家付款后7天内结算'
        })
      }
      
    })
  }
})