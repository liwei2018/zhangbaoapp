const $request = require('../../utils/request')
const $util = require('../../utils/util')
Page({
  data: {
    number: 0,
    payment: 0,
    collection: 0,
    statistics: 0,
    type: 0,
    startTime: $util.formatDate(new Date()),
    endTime: $util.formatDate(new Date()),
    statusBarHeight: getApp().globalData.statusBarHeight,
    company: {},
    collectionType: 1,
    statisticsList: [],
    user: {}
  },
  onShow() {
    $request.get('/v1/user/statistics', {
      type: this.data.type,
      cid: this.data.company.cid,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
    }).then((res) => {
      if (res.data.result) {
        this.setData({
          number: res.data.result.number,
          payment: res.data.result.payment,
          collection: res.data.result.collection,
          statistics: res.data.result.statistics,
        })
      }
    })
    $request.get('/v1/user/info', {}).then((res) => {
      if (res.data.result) {
        this.setData({
          user: res.data.result,
        })
      }
    })
    this.setData({
      pageNum: 1
    })
    this.getList()
  },
  getstartTime(e) {
    this.setData({
      startTime: e.detail.value,
    })
    this.onShow()
  },
  getendTime(e) {
    this.setData({
      endTime: e.detail.value,
    })
    this.onShow()
  },
  getList(up) {
    $request.get('/v1/user/statisticsDetail', {
      pageNum: this.data.pageNum,
      pageSize: 10,
      type: this.data.type,
      startTime: this.data.startTime,
      endTime: this.data.endTime + ' 23:59:59',
      collection: this.data.collectionType,
    }).then((res) => {
      if (res.data.result) {
        if (up) {
          this.setData({
            statisticsList: this.data.statisticsList.concat(res.data.result)
          })
        } else {
          this.setData({
            statisticsList: res.data.result
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    this.setData({
      statisticsList: []
    })
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
 
  clickTab(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.onShow()
  },
  clickTabtype(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.onPullDownRefresh()
  },
  clickTabcollectionType(e) {
    this.setData({
      collectionType: e.currentTarget.dataset.collectiontype
    })
    this.onPullDownRefresh()
  },
})
