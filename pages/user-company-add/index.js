const $request = require('../../utils/request')
Page({
  data: {
    enterprise: [],
    searched: false,
    enterpriseObj: {},
    login: false
  },
  onLoad(option) {
    if (option.login) {
      this.setData({
        login: option.login
      })
    }
    
  },
  selected(e) {
    var index = e.currentTarget.dataset['index'];
    this.setData({
      enterpriseObj: this.data.enterprise[index],
      enterprise: [],
      searched: false
    })
  },
  create() {
 
    $request.post('/v1/user/enterpriseCreate', {
      enterprise: this.data.enterpriseObj.enterprise,
      code: this.data.enterpriseObj.code
    }).then((res) => {
      
      if (res.data.error == 0) {
        if(this.data.login) {
          wx.switchTab({
            url: '../bill/index',
          })
        }else {

          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
       
    this.setData({
      enterpriseObj: {},
    })
  },
  search(e) {
    $request.get('/v1/common/searchList', {
      name: e.detail.value
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          enterprise: res.data.result,
          searched: true
        })
      }
    })
  }
})
