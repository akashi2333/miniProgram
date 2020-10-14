var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    travelProductList:[
      {
        imgurl:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'],
        agence:'趣旅旅行',
        time:'6天5晚',
        trafficway:'动车往返',
        isfull:'有余位',
        way:'南昌 武汉 成都 重庆',
        introduction:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+美丽玉龙+春城昆明',
        mark:10.0,
        selfpaying:'无自费',
        shopping:'无购物',
        isdepart:'铁定出行',
        number:321,
        price:3200,
        starttime:'10-1',
        identifiction: 210041446,
        evaluations:[{
          headImg:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
          userName:'TY',
          releaseTime:'2020-04-08',
          content:'世界那么大！'
        },{
          headImg:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
          userName:'TY',
          releaseTime:'2020-04-08',
          content:'世界那么大！'
        },{
          headImg:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
          userName:'TY',
          releaseTime:'2020-04-08',
          content:'世界那么大！'
        },{
          headImg:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
          userName:'TY',
          releaseTime:'2020-04-08',
          content:'世界那么大！'
        }
      ]
      },
      {
        imgurl:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'],
        agence:'趣旅旅行',
        time:'6天5晚',
        trafficway:'动车往返',
        isfull:'有余位',
        way:'南昌 武汉 成都 重庆',
        introduction:'云南春节热售 豪品0自费 印象丽江+洱海大邮轮+美丽玉龙+春城昆明',
        mark:10.0,
        selfpaying:'无自费',
        shopping:'无购物',
        isdepart:'铁定出行',
        number:321,
        price:3200,
        starttime:'10-1',
        identifiction: 210041446
      },
      {
        imgurl:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'],
        agence:'趣旅旅行',
        time:'6天5晚',
        trafficway:'动车往返',
        isfull:'有余位',
        way:'南昌 武汉 成都 重庆',
        introduction:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+美丽玉龙+春城昆明',
        mark:10.0,
        selfpaying:'无自费',
        shopping:'无购物',
        isdepart:'铁定出行',
        number:321,
        price:3200,
        starttime:'10-1',
        identifiction: 210041446
      },
      {
        imgurl:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'],
        agence:'趣旅旅行',
        time:'6天5晚',
        trafficway:'动车往返',
        isfull:'有余位',
        way:'南昌 武汉 成都 重庆',
        introduction:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+美丽玉龙+春城昆明',
        mark:10.0,
        selfpaying:'无自费',
        shopping:'无购物',
        isdepart:'铁定出行',
        number:321,
        price:3200,
        starttime:'10-1',
        identifiction: 210041446
      },
      {
        imgurl:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'],
        agence:'趣旅旅行',
        time:'6天5晚',
        trafficway:'动车往返',
        isfull:'有余位',
        way:'南昌 武汉 成都 重庆',
        introduction:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+美丽玉龙+春城昆明',
        mark:10.0,
        selfpaying:'无自费',
        shopping:'无购物',
        isdepart:'铁定出行',
        number:321,
        price:3200,
        starttime:'10-1',
        identifiction: 210041446
      }
    ]
  },

  BackPage: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  toDetail: (e) => {
    let index = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/travelProduct/travelProduct?index='+index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})