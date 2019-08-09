const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    billState: $util.billState,
    historytype: $util.historytype,
    statement: {
    },
  },
  onLoad: function (option) {
    let that = this
    $request.get('/v1/statement/info', {
      sid: option.sid
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          "statement": res.data.result,
        })
      }
    })
    
  }
})
