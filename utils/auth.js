
const $cache = {
  auth: wx.getStorageSync('Authorization') || null,
  parentId: wx.getStorageSync('parentid') || null,
  openId: wx.getStorageSync('mbopenid') || null,
  token: wx.getStorageSync('token') || "41e7dd9aa5be8667189c881d05cacf2d",
}

// 设置登录态与鉴权信息 API
function setAuthInfo (token = '') {
  wx.setStorage({ key: 'token', data: token})
}
function templateFunc(str, data) {
  let computed = str.replace(/\{\{(\w+)\}\}/g, function (match, key) {
    return data[key];
  })
  return computed;
}
// 设置微信信息
function setWxInfo(openId = '', activityCode = '') {
  $cache.openId = openId
  $cache.activityCode = activityCode
  wx.setStorage({ key: 'mbopenid', data: openId })
  wx.setStorage({ key: 'activityCode', data: activityCode})
}

  // 清空鉴权信息
function clearInfo () {
  $cache.auth = ''
  $cache.openId = ''
  $cache.parentId = ''
  wx.clearStorage()
}
// 跳转登录
function httpLoginByForm() {
  var activityCode = $cache.activityCode
  wx.navigateTo({
    url: "/pages/login/index"
  });
}

module.exports = {
  setAuthInfo: setAuthInfo,
  setWxInfo: setWxInfo,
  httpLoginByForm: httpLoginByForm,
  clearInfo: clearInfo,
  getAuth: () => $cache.auth,
  getOpenId: () => $cache.openId,
  getActivityId: () => $cache.activityCode,
  getParentId: () => $cache.parentId,
  getStudentId: () => $cache.studentId,
  getToken: () => (wx.getStorageSync('token') || ''),
  isLogin: () => !!($cache.auth && $cache.parentId),
  templateFunc: templateFunc
}
