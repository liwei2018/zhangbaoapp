const $request = require('../../utils/request')
Page({
  data: {
    authorize: [],
  },
  onShow() {
    $request.get('/v1/user/authorize', {
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          authorize: res.data.result
        })
      }
    })
  },
  create() {

  },
  
})
