const $request = require('../../utils/request')
Page({
  data: {
    content: '',
    imgs: [],
  },
  onShow() {
    $request.get('/v1/user/enterprise', {}).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          enterprise: res.data.result
        })
      }
    })
  },
  getcontent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  search(e) {
    $request.get('/v1/user/search', {
      searchValue: e.detail.value
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          enterprise: res.data.result
        })
      }
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
      count: (3 - this.data.imgs.length),
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
  submitForm() {
    let content = this.data.content.trim();
    if(content.length == 0) {
      wx.showToast({
        title: '内容未填写，请填写完整',//提示文字
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'none', //图标，支持"success"、"loading"  
     })
     return;
    }
    if(content.length > 200) {
      wx.showToast({
        title: '意见反馈只能填写200个字',//提示文字
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'none', //图标，支持"success"、"loading"  
     })
     return;
    }
    $request.post('/v1/user/feedback', {
      content,
      pictures: this.data.imgs.join(",")
    }).then((res) => {
      if (res.data.error == 0) {
        wx.showToast({
          title: '意见反馈提交成功',//提示文字
          duration:2000,//显示时长
          mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon:'none', //图标，支持"success"、"loading"  
       })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})
