const $request = require('../../utils/request')
Page({
  data: {
    buyer: '',
    buyerType: '',
    buyerIndex: '',
    buyerSearch: [],
    seller: '',
    sellerType: '',
    sellerIndex: '',
    money: '',
    pictures: '',
    remark: '',
    bid: '',
    mobile: '',
    sellerObj: [],
    sellerArr: [],
    bills: [],
    sid: '',
    bill: {},
    imgs: [],
    searchShow: false,
    searchtext: '',
    update: false,
    "buyerName": "",
    "sellerName": "",
    allmoney: '',
    historymoney: '',
    thismoney: '',
    debts: '',
    buyerName: '',
    sellerName: '',
    createTime: '',
  },
  onLoad(option) {
    if(option.sid){
      wx.setNavigationBarTitle({
        title: '修改账单'
      })
      this.setData({
        update: true,
        sid: option.sid
      })
      $request.get('/v1/statement/info', {
        sid: option.sid
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            buyerName: res.data.result.buyerName,
            sellerName: res.data.result.sellerName,
            createTime: res.data.result.createTime,
            money: res.data.result.money,
            imgs: res.data.result.pictures,
            remark: res.data.result.remark,
            bills: res.data.result.billsList,
            thismoney: res.data.result.thisSurplus,
            allmoney: res.data.result.total,
            historymoney: res.data.result.surplus,
            debts: res.data.result.debts
          })
        }
      })
    }
  },
  onShow() {
    $request.get('/v1/user/search', {}).then((res) => {
      if (res.data.error == 0) {
        var arr = []
        res.data.result.forEach(element => {
          arr.push(element.name)
        });
        this.setData({
          sellerObj: res.data.result,
          sellerArr: arr,
          sellerIndex: 0
        })
      }
    })
  },
  getseller(e) {
    this.setData({
      seller: this.data.sellerObj[e.detail.value].id,
      sellerType: this.data.sellerObj[e.detail.value].type,
      sellerIndex: e.detail.value
    })
    this.getsurplus()
  },
  delimg(e) {
    var index = e.currentTarget.dataset['index'];
    this.data.imgs.splice(index, 1);
    this.setData({
      imgs: this.data.imgs
    })
  },
  addimg() {
    const that = this
    wx.chooseImage({
      count: (9 - this.data.imgs.length),
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: 'https://api.ublog.top/v1/common/imageUpload', // 仅为示例，非真实的接口地址
            filePath: element,
            name: 'image',
            success(res) {
              let data = JSON.parse(res.data)
              that.data.imgs.push(data.result.url)
              that.setData({
                imgs: that.data.imgs
              })
            }
          })
        });

      }
    })
  },
  billFun() {
    if (!this.data.buyer && !this.data.update && !this.data.searchtext) {
      wx.showToast({
        title: '尚未填写买方信息，不能关联账单', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    wx.navigateTo({
      url: "../statement-bill/index"
    })

  },
  getbuyer(e) {
    $request.get('/v1/user/search', {
      searchValue: e.detail.value
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          buyerSearch: res.data.result,
          searchShow: true,
          searchtext: e.detail.value,
        })
      }
    })
  },
  boxclick() {
    this.setData({
      searchShow: false,
    })
  },
  selectbuyer(e) {
    this.setData({
      searchShow: false,
      buyer: this.data.buyerSearch[e.currentTarget.dataset.index].id,
      buyerType: this.data.buyerSearch[e.currentTarget.dataset.index].type,
      searchtext: this.data.buyerSearch[e.currentTarget.dataset.index].name,
    })
    this.getsurplus()
  },
  getsurplus() {
    if (this.data.buyer && this.data.seller) {
      $request.get('/v1/statement/surplus', {
        buyer: this.data.buyer,
        buyerType: this.data.buyerType,
        seller: this.data.seller,
        sellerType: this.data.sellerType,
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            historymoney: res.data.result.surplus,
          })
        }
      })
    }
  },
  getmoney(e) {
    this.setData({
      money: e.detail.value,
      thismoney: Number(e.detail.value)-Number(this.data.debts)
    })
  },
  getdebts(e) {
    this.setData({
      debts: e.detail.value,
      thismoney: Number(this.data.money) - Number(e.detail.value)
    })
  },
  getRemark(e) {
    this.setData({
      remark: e.detail.value,
    })
  },
  submitForm() {
    if (this.data.imgs.length == 0) {
      wx.showToast({
        title: '至少要上传一张凭证', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if (!this.data.money) {
      wx.showToast({
        title: '请填写收款金额', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if (!this.data.debts) {
      wx.showToast({
        title: '请填写欠款金额', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if(this.data.update) {
      $request.post('/v1/statement/update', {
        money: this.data.money,
        pictures: this.data.imgs.join(','),
        remark: this.data.remark,
        sid: this.data.sid,
        bid: this.data.bid,
        debts: this.data.debts,
      }).then((res) => {
        if (res.data.error == 0) {
          wx.showToast({
            title: '账单修改成功', //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else {
      $request.post('/v1/statement/create', {
        buyer: this.data.buyer,
        buyerType: this.data.buyerType,
        seller: this.data.seller,
        sellerType: this.data.sellerType,
        money: this.data.money,
        debts: this.data.debts,
        pictures: this.data.imgs.join(','),
        remark: this.data.remark,
        bid: this.data.bid,
        mobile: this.data.searchtext,
      }).then((res) => {
        if (res.data.error == 0) {
          wx.showToast({
            title: '账单创建成功', //提示文字
            duration: 2000, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
    
  }
})
