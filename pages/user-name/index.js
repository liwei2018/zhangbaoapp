const $request = require('../../utils/request')
Page({
  data: {
    nickname: ''
  },
  onShow() {
    
    $request.get('/v1/user/info', {
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          nickname: res.data.result.nickname
        })
      }
    })
  },
  //事件处理函数
  getnickname: function(e) {
    console.log(e.detail.value)
    this.setData({
      nickname: e.detail.value
    })
  },
  changenickname: function () {
    $request.post('/v1/user/update', {
      nickname: this.data.nickname
    }).then((res) => {
      if (res.data.error == 0) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
})
