const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    user: {},
    buyer: '',
    cid:'',
    gid: '',
    main: '0',
    money: '',
    status: '0',
    billType: '0',
    shopType: '',
    money: '',
    refundTime: $util.formatDate(new Date()),
    payType: '0',
    imgs: [],
    remark: '',
    billTime: $util.formatDate(new Date()),
    statusBarHeight: getApp().globalData.statusBarHeight,
    company: {},
    companyObj: [],
    companyArr: [],
    iscompany: 0,
    mainOpt: [
      '个人',
      '公司',
    ],
    statusOpt: [
      '未结算',
      '已结算'
    ],
    billTypeOpt: [
      '销售确认书',
      '财务对账单',
      '收款单',
    ],
    payTypeOpt: [
      '现金', '微信', '支付宝', '折让单', '银行汇款', '其他'
    ]
  },
  onLoad(option) {
    if(option.gid) {
      this.setData({
        gid:option.gid
      })
      
      $request.get('/v1/user/guestInfo', {
        gid: option.gid
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            buyer: res.data.result,
          })
        }
      })
    }
    $request.get('/v1/user/info',{
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result
        })
      }
    })
  },
  onShow() {
    $request.get('/v1/bills/select', {}).then((res) => {
      if (res.data.error == 0) {
        var arr = []
        res.data.result.forEach(element => {
          arr.push(element.name)
        });
        this.setData({
          companyObj: res.data.result,
          companyArr: arr
        })
      }
    })
  },
  clickTab(e) {
    this.setData({
      iscompany: e.currentTarget.dataset['iscompany']
    })
  },
  getcompany(e) {
    this.setData({
      company: this.data.companyObj[e.detail.value],
    })
  },
  getbillType(e) {
    this.setData({
      billType: e.detail.value,
    })
  },
  getpayType(e) {
    this.setData({
      payType: e.detail.value,
    })
  },
  getshopType(e) {
    this.setData({
      shopType: e.detail.value,
    })
  },
  delimg(e) {
    var index = e.currentTarget.dataset['index'];
    this.data.imgs.splice(index, 1);
    this.setData({
      imgs: this.data.imgs
    })
  },
  getrefundTime(e) {
    this.setData({
      refundTime: e.detail.value,
    })
  },
  getbillTime(e) {
    this.setData({
      billTime: e.detail.value,
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
            url: `${$request.config.protocol}://${$request.config.domain}/v1/common/imageUpload`,
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
  back() {
    wx.navigateBack({
      delta: 1
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
    if (this.data.update) {
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
        gid: this.data.buyer.gid,
        cid: this.data.buyer.cid,
        main: this.data.main,
        money: this.data.money,
        status: this.data.status,
        billType: this.data.billType,
        shopType: this.data.shopType,
        money: this.data.money,
        refundTime: this.data.refundTime,
        payType: this.data.payType,
        billTime: this.data.billTime,
        pictures: this.data.imgs.join(','),
        remark: this.data.remark,
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
