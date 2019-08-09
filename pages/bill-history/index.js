const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    billState: $util.billState,
    historytype: $util.historytype,
    bill: {
    },
  },
  onLoad: function (option) {
    let that = this
    $request.get('/v1/bills/info', {
      bid: option.bid
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          "bill": res.data.result,
        })
      }
    })
    
  }
})
