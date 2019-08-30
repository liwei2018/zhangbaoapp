//index.js
//获取应用实例
const $request = require('../../utils/request')

Page({
  data: {
    name: '',
    identityCard: '',
    bizToken: '',
    inviteCode: '',
    image: '',
    loading: false,
    user: {}
  },
  onShow() {
    $request.get('/v1/user/info', {
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          "user": res.data.result,
        })
      }
    })
  },
  nextFun() {
    $request.get('/v1/user/authorizationList',{
      pageNum: this.data.pageNum,
      pageSize: 10,
    }).then((res) => {
      var auth = 0
      if (res.data.result.length > 0) {
        auth = 1
      }
      wx.switchTab({
        url: '../bill/index?auth=' + auth
      })
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getIdentityCard(e) {
    this.setData({
      identityCard: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      inviteCode: e.detail.value
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: 1,
      sourceType: [ 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image: 'data:image/png;base64,' + res.data
              })
            }
          })
         
        });

      }
    })
  },
})
