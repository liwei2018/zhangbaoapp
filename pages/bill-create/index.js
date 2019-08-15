const $request = require('../../utils/request')
const $util = require('../../utils/util')
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
    cid: '',
    mobile: '',
    sellerObj: [],
    sellerArr: [],
    contracts: [],
    bid: '',
    bill: {},
    imgs: [],
    searchShow: false,
    searchtext: '',
    update: false,
    "buyerName": "",
    "sellerName": "",
    textareaShow: false,
    focus: false,
    billTime: $util.formatDate(new Date()),
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  onLoad(option) {
    if(option.bid){
      wx.setNavigationBarTitle({
        title: '修改账单'
      })
      this.setData({
        update: true,
        bid: option.bid
      })
      $request.get('/v1/bills/info', {
        bid: option.bid
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            buyerName: res.data.result.buyerName,
            sellerName: res.data.result.sellerName,
            createTime: res.data.result.createTime,
            money: res.data.result.money,
            imgs: res.data.result.pictures,
            remark: res.data.result.remark,
          })
        }
      })

      $request.get('/v1/bills/contract', {
        bid: option.bid
      }).then((res) => {
        if (res.data.error == 0 && res.data.result[0]) {
          this.setData({
            contracts: res.data.result,
            cid: res.data.result[0].cid
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
          sellerArr: arr
        })
        this.setData({
          seller: this.data.sellerObj[0].id,
          sellerType: this.data.sellerObj[0].type,
          sellerIndex: 0
        })
      }
    })
  },
  getbillTime(e) {

    this.setData({
      billTime: e.detail.value,
    })
  },
  getseller(e) {
    this.setData({
      seller: this.data.sellerObj[e.detail.value].id,
      sellerType: this.data.sellerObj[e.detail.value].type,
      sellerIndex: e.detail.value
    })
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
  contractFun() {
    if (!this.data.buyer && !this.data.update && !this.data.searchtext) {
      wx.showToast({
        title: '尚未填写买方信息，不能关联合同', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    wx.navigateTo({
      url: "../bill-contract/index"
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
          searchtext: e.detail.value
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
  },
  getmoney(e) {
    this.setData({
      money: e.detail.value,
    })
  },
  getRemark(e) {
    this.setData({
      remark: e.detail.value,
    })
  },
  submitForm() {
    if (!this.data.money) {
      wx.showToast({
        title: '请填写金额', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if (this.data.imgs.length == 0) {
      wx.showToast({
        title: '至少要上传一张单据', //提示文字
        duration: 2000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'none', //图标，支持"success"、"loading"  
      })
      return;
    }
    if(this.data.update) {
      $request.post('/v1/bills/update', {
        money: this.data.money,
        pictures: this.data.imgs.join(','),
        remark: this.data.remark,
        bid: this.data.bid,
        cid: this.data.cid
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

      $request.post('/v1/bills/create', {
        buyer: this.data.buyer,
        buyerType: this.data.buyerType,
        seller: this.data.seller,
        sellerType: this.data.sellerType,
        money: this.data.money,
        pictures: this.data.imgs.join(','),
        remark: this.data.remark,
        cid: this.data.cid,
        mobile: this.data.searchtext
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
    
  },
  textareafun() {
    this.setData({
      textareaShow: true,
      focus: true
    })
  },
  textareafun2() {
    this.setData({
      textareaShow: false
    })
  }
})
