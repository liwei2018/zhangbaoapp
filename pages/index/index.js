const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    motto: 'Hello World',
    billList: [],
    hasUserInfo: false,
    jujuedialog: false,
    signed: 0,
    bills: [],
    pageNum: 1,
    billState:$util.billState,
    unfinished: 0,
    complete: 1,
    search: '',
    bid: '',
    remark:'',
    second: 0,
    fun: null,
    user: {},
    code: '',
    iscompany: 1,
    sort: '',
    banner: [
    ],
    brandlist: [],
    brand: null,
    imgheight: 0,
    goods:[],
    paimaiStatus: $util.paimaiStatus,
    url: '/home/lots/weekhuigu'
  },
  onLoad(option) {
    // if(option.auth == 1) {
    //   wx.redirectTo({
    //     url: '../login-auth-list/index'
    //   })
    // }
  },
  onShow() {
    this.setData({
      pageNum: 1
    })
    $request.get('/home/users/listbanner', {}).then((res) => {
      if (res.data.data) {
        this.setData({
          banner: res.data.data,
        })
      }
    })
    $request.post('/home/items/listfirstlevelfenlei', {
    }).then((response) => {
      this.setData({
        brandlist: response.data.data
      })
    })
    this.getList()
  },
  imageLoad: function(e) {
    var $width = e.detail.width; //获取图片真实宽度
    var $height = e.detail.height; //获取图片真实高度
    var height = (wx.getSystemInfoSync().windowWidth - 40) * $height / $width / 0.92
    this.setData({
      imgheight: height + 20,
    })
  },
  clickTab(e) {
    this.setData({
      iscompany: e.currentTarget.dataset.iscompany
    })
    var url= ''
    if(this.data.iscompany == 1) {
     
      url = '/home/lots/weekhuigu'
    }
    if(this.data.iscompany == 2) {
      url = '/home/lots/hothuigu'
    }
    if(this.data.iscompany == 3) {
      url = '/home/lots/doing'
    }
    this.setData({
      url
    })
    this.getList()
  },
  clickSort(e) {
    this.setData({
      sort: e.currentTarget.dataset.sort
    })
    this.getList()
  },

  getList(up) {
    $request.get(this.data.url, {firstFenleiId: this.data.sort, page: this.data.pageNum, size: 10}).then((res) => {
      if (res.data.data) {
        if(up) {
          this.setData({
            goods: this.data.goods.concat(res.data.data)
          })
        } else {
          this.setData({
            goods: res.data.data
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    this.setData({
      pageNum: 1
    })
    this.getList() 
  },
  onReachBottom() {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getList(true)
  },


  create() {

  },
  search(e){
    this.setData({
      search: e.detail.value
    })
    this.onPullDownRefresh()
  },
  refuse() {
    $request.post('/v1/bills/refuse', {
      remark: this.data.remark,
      bid: this.data.bid
    }).then((res) => {
      if (res.data.error == 0) {
        this.setData({
          jujuedialog: false,
          remark: ''
        })
        this.onShow()
      }
    })
  },
  getcode(e) {
    this.setData({
      code: e.detail.value
    })
  }
})
