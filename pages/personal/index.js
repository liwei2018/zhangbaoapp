const $request = require('../../utils/request')
Page({
  data: {
    tabsList: [{
        src: '../../assets/images/personal/wode_ic_baozhang@2x.png',
        text: '用户保障'
      },
      {
        src: '../../assets/images/personal/wode_ic_kefu@2x.png',
        text: '联系客服'
      },
      {
        src: '../../assets/images/personal/wode_ic_zhanneixin @2x.png',
        text: '站内信'
      },
      {
        src: '../../assets/images/personal/wode_ic_yijianfankui @2x.png',
        text: '意见反馈'
      }
    ],
    user:{},
    seller:{},
    buyer: {}
  },
  onShow: function () {
    $request.post('/home/users/get', {
    }).then((response) => {
      this.setData({
        user: response.data.data
      })
    })
    $request.post('/home/items/sellerlistitemcount', {
    }).then((response) => {
      this.setData({
        seller: response.data.data
      })
    })
    $request.post('/home/lots/buyerlistordercount', {
    }).then((response) => {
      this.setData({
        buyer: response.data.data
      })
    })
  },
})