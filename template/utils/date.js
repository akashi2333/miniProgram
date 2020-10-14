/**
 * 日期处理
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 用于生成当日的xxxx-xx-xx格式的日期字符串
 */
const getDate = function () {
	var today = new Date();
	var year = today.getFullYear()
	var month = today.getMonth() + 1  //不知道为什么getMonth()取到的值比真实值小1，可能是因为从0开始的
	var day = today.getDate()
	month = month > 9 ? month : "0" + month
	day = day > 9 ? day : "0" + day

	return (year + "-" + month + "-" + day)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
	getDate: getDate
}
