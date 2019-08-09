const $request = require('../../utils/request')

Page({
  data: {
    image: ''
  },
  onShow() {
    $request.get('/v1/user/info', {
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          image: res.data.result.avatar
        })
      }
    })
  },
  changeheader: function(e) {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://api.ublog.top/v1/common/imageUpload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          success(res) {
            let data = JSON.parse(res.data)
            $request.post('/v1/user/update', {
              avatar: data.result.url
            }).then((res) => {
              if (res.data.error == 0) {
                that.setData({
                  image: data.result.url
                })
              }
            })
            // do something
          }
        })
      }
    })
  }
})
