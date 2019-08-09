const $request = require('../../utils/request')
Page({
  data: {
    enterprise: [],
  },
  onShow() {
    $request.get('/v1/user/enterprise', {
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          enterprise: res.data.result
        })
      }
    })
  },
  create() {

  },
  search(e) {
    $request.get('/v1/user/search', {
      searchValue: e.detail.value
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          enterprise: res.data.result
        })
      }
    })
  }
})
