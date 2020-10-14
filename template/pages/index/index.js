const app = getApp()
let api = require("../../utils/api.js")

Page({  
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      title: 'VR',
      name: 'surrounding'
    }, {
      icon: 'recordfill',
      color: 'orange',
      title: '录像',
      name: 'domestic'
    }, {
      icon: 'picfill',
      color: 'yellow',
      title: '图像',
      name: 'foreign'
    }, {
      icon: 'noticefill',
      color: 'olive',
      title: '通知',
      name: 'family'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      title: '特价游',
      name: 'cheapTravel'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      title: '旅游杂谈',
      name: 'travelTalks'
    }],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }],
  },

  onLoad: function () {
    // api.wxLogin().then(res => {
    //   api.getUser().then(res => {
    //     api.getStu(1,4).then(res => {

    //     })
    //   })
    // })
  }
})