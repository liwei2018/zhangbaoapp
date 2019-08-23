const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    company: {}
  },
  onLoad(option) {
    $request.get('/v1/user/companyInfo', {
      cid: option.cid
    }).then((res) => {
      if (res.data.result) {
        res.data.result.cid = option.cid
        this.setData({
          company: res.data.result
        })
      }
    })
  },
  switchChange(e) {
    console.log(e.detail.value)
    if(e.detail.value) {
      this.setData({
        'company.isDefault': 1
      })
    } else {
      this.setData({
        'company.isDefault': 0
      })
    }
  },
  getphone(e) {
    this.setData ({
      'company.phone': e.detail.value
    })
  },
  getaddress(e) {
    this.setData ({
      'company.address': e.detail.value
    })
  },
  submit(){
    $request.post('/v1/user/companyUpdate', {
      cid: this.data.company.cid,
      phone: this.data.company.phone,
      address: this.data.company.address,
      bank: this.data.company.bank,
      bankAccount: this.data.company.bankAccount,
      isDefault: this.data.company.isDefault,
      logo: this.data.company.logo
    }).then((res) => {
      if (res.data.error == 0) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: `${$request.config.protocol}://${$request.config.domain}/v1/common/imageUpload`, // 仅为示例，非真实的接口地址
            filePath: element,
            name: 'image',
            success(res) {
              let data = JSON.parse(res.data)
              that.setData({
                'company.logo': data.result.url
              })
            }
          })
        });

      }
    })
  },
})
