const $request = require('../../utils/request')
const $util = require('../../utils/util')
const $auth = require('../../utils/auth.js')
Page({
  data: {
    user: {},
    statusBarHeight: getApp().globalData.statusBarHeight,
    jujuedialog: false,
    second: 0,
    fun: null,
    code: '',
    code2: '',
    mobile: '',
    verify: '',
  },
  onLoad() {
    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result,
        })
      }
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {

        wx.showLoading({
          title: '加载中…'
        })
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: `${$request.config.protocol}://${$request.config.domain}/v1/common/imageUpload`, // 仅为示例，非真实的接口地址
            filePath: element,
            name: 'image',
            success(res) {
              let data = JSON.parse(res.data)
              $request.post('/v1/user/update', {
                avatar: data.result.url
              }).then((res) => {
                wx.hideLoading()
                that.setData({
                  'user.avatar': data.result.url
                })
              })

            }
          })
        });

      }
    })
  },
  logout() {
    $auth.clearInfo()
    wx.redirectTo({
      url: '../login/index',
    })
  },
  sendCode() {
    if (this.data.second > 0) {
      return;
    }
    this.setData({
      jujuedialog: true
    })
    $request.get('/v1/user/mobileUpdateSms', {}).then((res) => {

      this.setData({
        second: 60
      })
      setInterval(() => {
        if (this.data.second == 0) {
          clearInterval(this.data.fun)
          return;
        }
        this.setData({
          second: this.data.second - 1
        })
      }, 1000);
    })
  },
  getcode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getcode2(e) {
    this.setData({
      code2: e.detail.value
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  submit() {
    $request.post('/v1/user/mobileUpdateVerify', {
      code: this.data.code
    }).then((res) => {
      if (res.data.error == 0) {

        clearInterval(this.data.fun)
        this.setData({
          verify: res.data.result.verify,
          fun: null,
          second: 0
        })
      }
    })
  },
  sendCode2() {
    if (this.data.second > 0) {
      return;
    }
    this.setData({
      jujuedialog: true
    })
    $request.get('/v1/user/mobileUpdateNewSms', {
      verify: this.data.verify,
      mobile: this.data.mobile
    }).then((res) => {

      this.setData({
        second: 60
      })
      setInterval(() => {
        if (this.data.second == 0) {
          clearInterval(this.data.fun)
          return;
        }
        this.setData({
          second: this.data.second - 1
        })
      }, 1000);
    })
  },
  submit2() {
    $request.post('/v1/user/mobileUpdateNew', {
      code: this.data.code2,
      mobile: this.data.mobile
    }).then((res) => {
      if (res.data.error == 0) {
        wx.showToast({
          title: '修改成功', //提示文字
          duration: 2000, //显示时长
          mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
        })
        this.setData({
          jujuedialog: false
        })
        this.onLoad()
      }
    })
  },
  jujuedialogClose() {
    this.setData({
      jujuedialog: false,
      verify: ''
    })
  }
})
