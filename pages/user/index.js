const $request = require('../../utils/request')

Page({
  data: {
    user: {}
  },
  onShow() {

    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.error == 0) {
        console.log(res.data.result)
        this.setData({
          user: res.data.result
        })
      }
    })
  },
  //事件处理函数
  birthdayChange: function (e) {
    var user = this.data.user
    user.birthday = e.detail.value
    this.setData({
      user
    })

    $request.post('/v1/user/update', {
      birthday: e.detail.value
    }).then((res) => {

    })

  },
  onLoad: function () {

  },
  getUserInfo: function (e) {

  }
})
