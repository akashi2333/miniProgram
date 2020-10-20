const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    current: 0,
    TabCur: 0,
    flag: true,
    flag1: true,
    options:['产品特色','行程安排','费用说明','注意事项','违约责任','特别提示']
  },

  priceDetail: function() {
    this.setData({
      flag: false
    })
  },
  hideview: function() {
    this.setData({
      flag: true
    })
  },

  showMore: function() {
    this.setData({
      flag1: false
    })
  },
  hideMore: function() {
    this.setData({
      flag1: true
    })
  },

  tabSelect(e) {
    if(this.data.TabCur === e.target.dataset.current) {
      return false;
    }else{
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
    }
  },

  swiperChange: function (e) {
    var that = this;
      that.setData({
        current: e.detail.current
      })
  }, 

  BackPage: function () {
    wx.navigateTo({
      url: '/pages/cheapTravel/cheapTravel',
    })
  },

  travelTime: function () {
    wx.navigateTo({
      url: '/pages/travelTime/travelTime',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2];
    that.setData({
      travelProduct: prevPage.data.travelProductList[options.index],
      index: options.index
     })
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