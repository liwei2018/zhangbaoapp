const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    name: '',
    mobile: '',
    job: '',
    cid: [],
    sid: '',
    companys: []
  },
  onLoad(option) {
    if (option.sid) {
      wx.setNavigationBarTitle({
        title: '修改员工'
      })
      this.setData({
        sid: option.sid
      })
      $request.get('/v1/user/staffInfo', {
        sid: option.sid
      }).then((res) => {
        if (res.data.error == 0) {
          this.setData({
            name: res.data.result.name,
            mobile: res.data.result.mobile,

            job: res.data.result.job,
            cid: res.data.result.cid,
            sid: res.data.result.sid,
          })
        }
      })
    }
    $request.get('/v1/user/company', {}).then((res) => {
      if (res.data.error == 0) {
        res.data.result.forEach(element => {
          if(this.data.cid.indexOf(element.cid)>-1 ){
            element.select = true
          }
        });
        this.setData({
          companys: res.data.result
        })
      }
    })
  },
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getjob(e) {
    this.setData({
      job: e.detail.value
    })
  },
  getcompany(e) {

    wx.navigateTo({
      url: "../guest-create-company/index"
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  selectfun(e) {
    var index = this.data.cid.indexOf(e.currentTarget.dataset['cid']);
    var select = false;
    if (index > -1) {
      this.data.cid.splice(index, 1)
      select = false
    } else {
      this.data.cid.push(e.currentTarget.dataset['cid'])
      select = true
    }
    this.setData({
      cid: this.data.cid,
      [`companys[${e.currentTarget.dataset['index']}].select`]: select
    })
  },
  submit() {

    $request.post('/v1/user/staffUpdate', {

      name: this.data.name,
      mobile: this.data.mobile,
      job: this.data.job,
      cid: this.data.cid.join(','),
      sid: this.data.sid,
    }).then((res) => {

      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })

    })
  },
  del() {
    wx.showModal({
      title: '',
      content: '确认删除？',
      cancelText: "取消",
      confirmText: '确认',
      success: (res) => {
        $request.get('/v1/user/staffDelete', {
          sid: this.data.sid,
        }).then((res) => {
    
          wx.navigateBack({
            delta: 2 // 返回上一级页面。
          })
    
        })
      }
    })
  }
})
