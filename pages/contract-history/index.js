const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    contractState: $util.contractState,
    historytype: $util.historytype,
    contract: {
    },
  },
  onLoad: function (option) {
    let that = this
    $request.get('/v1/contract/history', {
      cid: option.cid
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          "contract": res.data.result,
        })
      }
    })
    
  }
})
