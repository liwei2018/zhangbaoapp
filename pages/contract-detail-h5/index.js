const $request = require('../../utils/request')
Page({
  data: {
    url: ''
  },
  onLoad(option) {
    if (option.url) {
      this.setData({
        url: option.url,
      })
    }
    
  },
  
})
