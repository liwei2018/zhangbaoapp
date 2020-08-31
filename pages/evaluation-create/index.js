const $request = require('../../utils/request')
// pages/evaluation-create/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenleiname: '',
    fenleiId: '',
    brandId: '',
    brandname: '',
    pic1: {},
    pic2: {},
    pic3: {},
    memo: '',
    morePic: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fenleiname: options.fenleiname,
      fenleiId: options.fenleiId,
      brandId: options.brandId,
      brandname: options.brandname
    })
    console.log(options)
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
  sub() {
    if(!this.data.pic1.id) {
      wx.showToast({
        title: '请输上传正面图片', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if(!this.data.pic2.id) {
      wx.showToast({
        title: '请输上传侧面图片', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if(!this.data.pic3.id) {
      wx.showToast({
        title: '请输上传刻印图片', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    var morePicArr= ''
    this.data.morePic.forEach((item)=>{
      morePicArr = morePicArr + item.id + ','
    })

    $request.post('/home/items/createitem', {
      brandId: this.data.brandId,
      fenleiId: this.data.fenleiId,
      memo: this.data.memo,
      morePicArr,
      pic1Id: this.data.pic1.id,
      pic2Id: this.data.pic2.id,
      pic3Id: this.data.pic3.id,
    }).then((response) => {
      this.setData({
        list: response.data.data
      })
    })
  },
  getmemo(e) {
    this.setData({
      memo: e.detail.value,
    })
  },
  delimg(e) {
    var index = e.currentTarget.dataset['index'];
    if(index == 1) {
      this.setData({
        pic1: {}
      })
    }
    if(index ==2) {
      this.setData({
        pic2: {}
      })
    }
    if(index == 3) {
      this.setData({
        pic3: {}
      })
    }
  },
  delimg2(e) {
    var index = e.currentTarget.dataset['index'];
    this.data.morePic.splice(index, 1);
    this.setData({
      morePic: this.data.morePic
    })
  },
  submit() {

  },
  addimg(e) {
    const that = this
    var index = e.currentTarget.dataset['index'];
    var count = 9
    if(index) {
      count = 1
    }
    wx.chooseImage({
      count: count,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: `https://admin.eco-recycle.cn/admin/files/upload`,
            filePath: element,
            name: 'image',
            header: {  
              "Content-Type": "multipart/form-data"  
            }, 
            success(res) {
              let data = JSON.parse(res.data)
              if(index == 1) {
                that.setData({
                  pic1: data.data
                })
              } else if(index == 2) {
                that.setData({
                  pic2: data.data
                })
              } else if(index == 3) {
                that.setData({
                  pic3: data.data
                })
              } else {
                that.data.morePic.push(data.data)
                that.setData({
                  morePic: that.data.morePic
                })
              }
              
            }
          })
        });
      }
    })
  },
})