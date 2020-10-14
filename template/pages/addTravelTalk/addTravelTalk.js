const app = getApp()
var travelUtil = require('../../utils/travelUtil')
var dateUtil = require('../../utils/date')
var user = getApp().globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userCity: null,
    title: '',
    story: '',
    imgUrl: [],
    content_fouce: false,
    user_address: ''
  },

  BackPage: function () {
    wx.navigateTo({
      url: '/pages/travelTalks/travelTalks',
    })
  },

    /**
   * 发表游记
   */
  submit: function(e) {
    var that = this
    const eventChannel = that.getOpenerEventChannel
    console.log("标题：" + this.data.title)
    console.log("内容：" + this.data.story)
    console.log("图片地址：" + this.data.imgUrl)
    console.log("城市：" + this.data.city)
    //先判断游记内容是否满足要求
    if (this.data.title.length < 3) {
      //标题长度不足
      wx.showToast({
        title: '标题长度不足！',
        icon: "none"
      })
    } else if (this.data.story.length < 1) {
      //内容不能为空
      wx.showToast({
        title: '内容不能为空！',
        icon: "none"
      })
    } else if (this.data.imgUrl.length < 1) {
      //图片数量不足
      wx.showToast({
        title: '至少要一张图片！',
        icon: "none"
      })
    } else if (this.data.imgUrl.length > 3) {
      //图片数量过多
      wx.showToast({
        title: '最多只能选择三张图片！',
        icon: "none"
      })
    }else {
      //满足要求要求，上传至服务器
      console.log("开始上传游记至服务器")
      var travelTalk = {
        city: that.data.userCity,
        releaseTime: dateUtil.getDate(),
        title: that.data.title,
        story: that.data.story,
        headImg: user.image,
        userName: user.userName,
        pinkHeart: 0,
        commentNumber: 0,
        commentList: [],
        view: 0
      }
      travelUtil.new_travel({
        travelTalk,imgUrl: that.data.imgUrl
      }, true).then(res => {
        console.log(res.data) // 服务器回包信息
        //获取新发表的游记，并返回给推荐游记页面，插入到游记列表的首个
        travelUtil.getATravel({
          identifiction: travelTalk.identifiction
        }).then(res => {
          if(res.code == 200){
            let newTravel = res.data
            //将相对url替换成绝对url，配置域名后可省去
            for (var i = 0; i < newTravel.imgUrl.length; i++) {
              newTravel.imgUrl[i] = "http://localhost:8080" + newTravel.imgUrl[i]
            }
            eventChannel.emit('acceptNewTravel', {
              data: newTravel
            })
          }
          wx.navigateBack({})
        })
      })
    }
  },

  	/**
	 * 游记输入框获取焦点
	 */
	contentFocus: function(){
		this.setData({
			content_focus: true
		})
  },
  
  /**
   * 标题修改
   */
  change_title: function(event) {
    console.log("标题修改： " + event.detail.value)
    this.data.title = event.detail.value
  },

  /**
   * 文本框输入改变
   */
  change_content: function(event) {
    console.log("内容修改： " + event.detail.value)
    this.setData({
      story: event.detail.value, //内容
    })
  },


  /**
   * 选择图片
   */
  choose_imgs: function() {
    var that = this
    var p_imgs = that.data.imgUrl
    wx.chooseImage({
      success: function(res) {
        that.setData({
          imgUrl: p_imgs.concat(res.tempFilePaths) //设置文件地址
        })
      },
    })
  },

  /**
   * 进入切换位置页面
   */
  change_position: function() {
    wx.navigateTo({
      url: '/pages/position/position',
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