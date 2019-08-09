const $request = require('../../utils/request')
Page({
  data: {
    firstParty: '',
    firstPartyType: '',
    firstPartyIndex: '',
    firstPartySearch: [],
    secondParty: '',
    secondPartyType: '',
    secondPartyIndex: '',
    month: '',
    pictures: '',
    remark: '',
    cid: '',
    mobile: '',
    secondPartyObj: [],
    secondPartyArr: [],
    contracts: [],
    id: '',
    bill: {},
    imgs: [],
    searchShow: false,
    searchtext: '',
    endTime:'',
    startTime: ''
  },
  onShow() {
    $request.get('/v1/user/search', {}).then((res) => {
      if (res.data.error == 0) {
        var arr = []
        res.data.result.forEach(element => {
          arr.push(element.name)
        });
        this.setData({
          secondPartyObj: res.data.result,
          secondPartyArr: arr
        })
      }
    })
  },
  getsecondParty(e) {
    this.setData({
      secondParty: this.data.secondPartyObj[e.detail.value].id,
      secondPartyType: this.data.secondPartyObj[e.detail.value].type,
      secondPartyIndex: e.detail.value
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
    if (!this.data.firstParty) {
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
  getfirstParty(e) {
    $request.get('/v1/user/search', {
      searchValue: e.detail.value
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          firstPartySearch: res.data.result,
          searchShow: true,
        })
      }
    })
  },
  boxclick() {
    this.setData({
      searchShow: false,
    })
  },
  selectfirstParty(e) {
    this.setData({
      searchShow: false,
      firstParty: this.data.firstPartySearch[e.currentTarget.dataset.index].id,
      firstPartyType: this.data.firstPartySearch[e.currentTarget.dataset.index].type,
      searchtext: this.data.firstPartySearch[e.currentTarget.dataset.index].name,
    })
  },
  getmonth(e) {
    this.setData({
      month: e.detail.value,
    })
  },
  getRemark(e) {
    this.setData({
      remark: e.detail.value,
    })
  },
  submitForm() {
    $request.post('/v1/contract/create', {
      firstParty: this.data.firstParty,
      firstPartyType: this.data.firstPartyType,
      secondParty: this.data.secondParty,
      secondPartyType: this.data.secondPartyType,
      month: this.data.month,
      pictures: this.data.imgs.join(','),
      remark: this.data.remark,
      cid: this.data.cid,
      contractType: 1,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
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
  },
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value,
    })
  },
  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value,
    })
  }
})
