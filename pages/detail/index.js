const $request = require('../../utils/request')
const $util = require('../../utils/util')
const $auth = require('../../utils/auth')
Page({
  data: {
    show: false,
    tabtype: 0,
    sort: 0,
    banner: [{
        image: 'https://imgx.vipkidstatic.com/media/mgt/online-mall/1576555545388/VIPKID%E7%BB%98%E6%9C%AC%E9%A6%86%E6%8B%B7%E8%B4%9D.jpg'
      },
      {
        image: 'https://imgx.vipkidstatic.com/media/mgt/online-mall/1576555545388/VIPKID%E7%BB%98%E6%9C%AC%E9%A6%86%E6%8B%B7%E8%B4%9D.jpg'
      }
    ],
    imgheight: 0,
    id: '',
    goods: {},
    type: 1,
    orders: [],
    paimaiStatus: $util.paimaiStatus,
    priceText: {
      1: '最高出价',
      2: '成交价',
      3: '我的出价',
    },
    time: 0,
    price: 0,
    priceobj: {},
    code: '',
    codeimg: '',
  },
  onLoad(option) {
    if (option.id) {
      this.setData({
        id: option.id,
        type: option.type,
      })
    }
  },
  onShow() {
    $request.get('/home/lots/getbytype', {
      id: this.data.id,
      type: this.data.type
    }).then((res) => {
      if (res.data.data) {
        res.data.data.itemDisplayVO.params = JSON.parse(res.data.data.itemDisplayVO.params)
        var time = new Date(res.data.data.endTime).getTime() - new Date().getTime() + 24 * 60 * 60 * 1000
        this.setData({
          goods: res.data.data,
          time: time
        })
      }
    })
    $request.get('/home/lots/listorderbylot', {
      lotId: this.data.id
    }).then((res) => {
      if (res.data.data) {
        this.setData({
          orders: res.data.data,
        })
      }
    })

  },
  onClose() {
    this.setData({
      show: false
    });
  },
  imageLoad: function (e) {
    var $width = e.detail.width; //获取图片真实宽度
    var $height = e.detail.height; //获取图片真实高度
    var height = (wx.getSystemInfoSync().windowWidth) * $height / $width * 0.8
    this.setData({
      imgheight: height,
    })
  },
  clickTab(e) {
    this.setData({
      tabtype: e.currentTarget.dataset.tabtype
    })
  },
  chujia() {
    this.setData({
      show: true
    })
    this.getcodeimg()
  },
  caculateprice(e) {
    this.setData({
      price: e.detail.value
    })
    $request.get('/home/lots/caculateprice', {
      price: e.detail.value
    }).then((res) => {
      if (res.data.data) {
        this.setData({
          priceobj: res.data.data,
        })
      }
    })
  },
  getcodeimg() {
    this.setData({
      codeimg: `${$request.config.protocol}://${$request.config.domain}/home/lots/getcode?token=${$auth.getToken()}&v=${new Date().getTime()}`
    })
  },
  getcode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  sub() {
    if(!this.data.price) {
      wx.showToast({
        title: '请输入价格', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if(!this.data.code) {
      wx.showToast({
        title: '请输入验证码', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    $request.post('/home/lots/createorder', {
      code: this.data.code,
      lotId: this.data.id,
      price: this.data.price
    }).then((response) => {
      if(response.data.status == 'success') {
        wx.showToast({
          title: '出价成功', //提示文字
          duration: 2000, //显示时长
          mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
        })
        this.setData({
          show:false
        })
      }
      
    })
  }
})