//index.js
//获取应用实例
const $request = require('../../utils/request')

Page({
  data: {
    name: '',
    identityCard: '',
    bizToken: '',
    inviteCode: '',
    image: '',
    company: '',
    code: '',
    loading: false,
    companypage: false
  },
  onLoad(option) {
    if (option.companypage) {
      this.setData({
        companypage: true
      })
    }

  },
  nextFun() {
    if (this.data.loading) {
      return;
    }
    if (this.data.name.length == 0) {
      wx.showToast({
        title: "请输入真实姓名", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return false;
    }
    if (this.data.company.length == 0) {
      wx.showToast({
        title: "请输入企业名称", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return false;
    }
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(this.data.identityCard) === false) {
      wx.showToast({
        title: "身份证输入不合法", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return false;
    }
    if (this.data.image == '') {
      wx.showToast({
        title: "请上传正脸照片", //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return false;
    }
    this.setData({
      loading: true
    })
    wx.showLoading({
      title: '加载中…'
    })
    $request.post('/v1/user/realName', {
      'name': this.data.name,
      'identityCard': this.data.identityCard,
      company: this.data.company,
      code: this.data.code,
      inviteCode: this.data.inviteCode,
      image: this.data.image.replace('data:image/png;base64,', "")
    }).then((res) => {
      this.setData({
        bizToken: res.data.result.bizToken,
        loading: false
      })

      wx.hideLoading()
      if (this.data.companypage) {
        wx.navigateBack({
          delta: 1
        })
      } else {

        wx.redirectTo({
          url: '../login-3-success/index'
        })
      }
    }).catch(() => {
      this.setData({
        loading: false
      })

      wx.hideLoading()
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getIdentityCard(e) {
    this.setData({
      identityCard: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      inviteCode: e.detail.value
    })
  },
  getcompany(e) {
    wx.navigateTo({
      url: "../guest-create-company/index"
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image: 'data:image/png;base64,' + res.data
              })
            }
          })

        });

      }
    })
  },
})
