Page({
  data: {
    url: '',
  },
  onLoad: function (option) {
    if (option.type) {
      this.setData({
        url: `${option.url}?type=${option.type}`
      })
    } else {
      this.setData({
        url: option.url
      })
    }
  },

})