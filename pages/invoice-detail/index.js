const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    obj: {},
  },
  onLoad(option) {
    $request.get('/v1/user/invoiceInfo',{
      recid: option.recid
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          obj: res.data.result
        })
      }
    })
  },
 
})
