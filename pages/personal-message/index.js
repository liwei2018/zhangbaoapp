const $request = require('../../utils/request')
Page({
  data: {
    user:{},
  },
  onShow: function () {
    $request.post('/home/users/get', {
    }).then((response) => {
      this.setData({
        user: response.data.data
      })
    })
  },
})