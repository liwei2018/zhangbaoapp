const $auth = require('./auth.js')
const $md5 = require('./md5.js')

function get(url, data, header) {
  return all({
    url,
    data,
    header,
    method: 'GET'
  })
}

function post(url, data, header) {
  return all({
    url,
    data,
    header,
    method: 'POST'
  })
}

function all(opt) {
  // wx.showLoading({
  //   mask:true,
  //   title: '数据加载中...',
  // })
  let apiUrl = `${config.protocol}://${config.domain}${opt.url}`
  let header = opt.header || {}
  let token = $auth.getToken()
  if (token) apiUrl = apiUrl + '?token=' + token
  let nonce = Math.random().toString(36).substr(2);
  var timestamp = Date.parse(new Date()) / 1000;

  header.nonce = nonce;
  header.timestamp = timestamp;
  header.sign = $md5.hexMD5(nonce + timestamp + "7c6fe563abc91f43be71d5bc9072329f");
  header['content-type']='application/x-www-form-urlencoded'

  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      header: header,
      data: opt.data,
      method: opt.method,
      success: (res) => {
        if (res.header['Content-Type'] == 'image/jpeg') {
          resolve(res)
          return;
        }
        if (!res.data.data.errCode) {
          resolve(res)
        } else if (res.data.data.errCode === 20105) {
          reject(res)
         if(getCurrentPageUrl() == "pages/login/index") {
           return
         }
          wx.navigateTo({
            url: '../login/index?redirect=/' + getCurrentPageUrl(),
          })
        } else {
          reject(res)
          wx.showModal({
            title: '提示',
            content: res.data.data.errMsg,
            showCancel: false,
            success (res) {
              
            }
          })
        }
        wx.stopPullDownRefresh()
        // else (res && res.data.error > 1000) {
        //   wx.navigateTo({url: `/pages/login/login?msg=${res.msg}`})
        //   reject(res)
        // }
      },
      fail: (err) => reject(err)
    })
  })
}

function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}
let config = {
  domain: 'wechatapi.eco-recycle.cn',
  protocol: 'https',
}

function randomWord(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

// export
function request(opt) {
  return all(opt)
}
request.get = get
request.post = post
request.config = config

module.exports = request
