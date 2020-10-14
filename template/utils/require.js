const api_base_url = 'http://localhost:8080/';

function json2Form(json) {
  if (!json) {
    return ''
  }
  var str = [];
  for (var p in json) {
    if (json[p] != null)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    data = data || {}
    wx.request({
      url: api_base_url + url,
      data: json2Form(data),
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookieKey')
      },
      success: function (res) {
        if (res && res.header && res.header['Set-Cookie']) {
          wx.setStorageSync('cookieKey', res.header['Set-Cookie']);
        }
        resolve(res.data)
      },
      fail: function () {
        reject("服务异常")
      }
    })
  })
}

function req_get(url, data) {
  return new Promise((resolve, reject) => {
    let full_url = api_base_url + url
    if (data)
      full_url += '?' + json2Form(data)
    wx.request({
      url: full_url,
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookieKey')
      },
      success: function (res) {
        if (res && res.header && res.header['Set-Cookie']) {
          wx.setStorageSync('cookieKey', res.header['Set-Cookie']);
        }
        resolve(res.data)
      },
      fail: function (e) {
        reject("请求失败")
      }
    })
  })
}

module.exports = {
  api_base_url: api_base_url,
  post : post,
  req_get : req_get
}