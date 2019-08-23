const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    user: {},
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  onLoad() {
    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result,
        })
      }
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {

        wx.showLoading({
          title: '加载中…'
        })
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: `${$request.config.protocol}://${$request.config.domain}/v1/common/imageUpload`, // 仅为示例，非真实的接口地址
            filePath: element,
            name: 'image',
            success(res) {
              let data = JSON.parse(res.data)
              $request.post('/v1/user/update', {
                avatar: data.result.url
              }).then((res) => {
                wx.hideLoading()
                that.setData({
                  'user.avatar': data.result.url
                })
              })

            }
          })
        });

      }
    })
  }
})
