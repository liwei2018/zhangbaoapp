//index.js
//获取应用实例
const $request = require('../../utils/request')

Component({
  properties: {
    goback: {
      type: Boolean,
      value: false,

    },
    name: {
      type: String,
      value: '',

    },
  },
  data: {

    statusBarHeight: getApp().globalData.statusBarHeight + 10,
  },
  attached: function () {

  },
  moved: function () {},
  detached: function () {},
  methods: {
    gobackFun: function (val)  {
      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })
    }
  }
})
