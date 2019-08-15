const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate,
  billState: {
    "-1":"已取消",
    "0":"待确认",
    "1":"待修改",
    "2":"已确认",
    "3":"核销中",
    "4":"已核销"
  },
  historytype: {
    "0":"创建：",
    "1":"签署方拒绝回复：",
    "2":"发起方修改回复：",
    "3":"签署方确认",
    "4":"发起方取消"
  },
  contractType: {
    "0":"采购合同",
    "1":"授权协议",
  }, contractState: {
    "-1": "已取消",
    "0": "待确认",
    "1": "待修改",
    "2": "签署",
  },

}
