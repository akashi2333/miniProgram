let net = require("./require.js")
let app = getApp()
let mapUtils = require("../utils/qqmap-wx-jssdk")

function wxLogin(){
  return net.post("wx_login")
}

function getUser(){
  return net.post("getUser")
}

function getStu(pageNum,pageSize){
  return net.req_get("rest/students",{pageNum:pageNum,pageSize:pageSize})
}

/**
 * 逆地址解析
 * @param {*} locationInfo 传入一个对象，有两个参数--经度与纬度
 * @returns 不返回值，而是将用户的位置存入缓存中
 */
function reverseGeocoder(locationInfo) {
  var map = new mapUtils({
    key: 'Y7SBZ-DLLWW-4NTRV-R7FXN-INQO5-SJBSE'
  })
  // var result;
  return new Promise((resolve, reject) => {
    map.reverseGeocoder({
      location: locationInfo,
      success: function (res) {
        // app.globalData.rec_location = res
        // console.log(app.globalData.rec_location)
        // result = res
        resolve(res)
        wx.setStorage({
          key: 'rec_location',
          data: res
        });

      },
      fail: function (e) {
        console.log(e)
      },
      complete: function () {
        // console.log(result)
      }
    })
  })
  // console.log(result) 
}

/**
 * 获取全部城市的列表
 */
function getCities(key) {
  return net.req_get("/travelTalk/addTT/getCityByld",{id:key});
}

module.exports = {
  wxLogin : wxLogin,
  getStu : getStu,
  getUser: getUser,
  getCities: getCities,
  reverseGeocoder: reverseGeocoder
}