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
  paimaiStatus: {
    1: '待开始',
    2: '拍卖中',
    3: '已流拍',
    4: '待确认',
    5: '待支付',
    6: '待成交',
    7: '已成交',
    8: '已结束'
  },

  paimaiStatus2: {
    1: '待估价',
    '2': '已驳回',
    '3': '已报价',
    '4': '已寄出',
    '5': '已入库',
    '6': '已发布',
    '7': '拍卖中',
    '8': '未成交',
    '9': '待确认',
    '10': '已确认',
    '11': '已成交',
    '12': '已打款',
    '13': '已结束'
  },
  paimaiStatus3: {
    1: '您的商品正在估价，请耐心等待',
    '2': '',
    '3': '您的商品估价已完成，请确认到店回收或快递到店',
    '4': '您已选择商品邮寄到店，请等待验收',
    '5': '您的商品已通过验收',
    '6': '',
    '7': '您的商品正在帮卖中，请等待帮卖结束确认',
    '8': '',
    '9': '帮卖已结束，请确认成交价格',
    '10': '您已确认成交价格，买家付款后7天内结算',
    '11': '',
    '12': '',
    '13': ''
  },
  historytype: {
    "0": "创建：",
    "1": "签署方拒绝回复：",
    "2": "发起方修改回复：",
    "3": "签署方确认",
    "4": "发起方取消"
  },
  contractType: {
    "0": "采购合同",
    "1": "授权协议",
  },
  contractState: {
    "-1": "已取消",
    "0": "待确认",
    "1": "待修改",
    "2": "签署",
  },

}