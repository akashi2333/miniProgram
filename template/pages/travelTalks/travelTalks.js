var app = getApp()
var user = getApp().globalData.userInfo
var travelUtil = require('../../utils/travelUtil')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userCity: null,
    oldCity: null,
    showTip: null,
    sendLike: false,
    haveViewds: [],
    travelTalkList: [],
    if_like: -1,
    loadMoreType: 0,
    showLoadTip: false
  },

  BackPage: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  toDetail: (e) => {
    let index = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/travelTalk/travelTalk?index='+index+'&identifiction='+this.data.travelTalkList[index].identifiction+'&haveViewd='+this.data.haveViewds[index],
    })
  },

  zan: function (event) {
    if(!app.globalData.isLogin) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else if(this.data.sendLike) {

    } else {
      var that = this
      that.setData({
        sendLike: true
      })
      var index = event.currentTarget.id
      var travelTalkList = that.data.travelTalkList
      var travelTalk = travelTalkList[index]
      var id = travelTalk.identifiction
      var i = null
      for(i = 0;i < user.likeList.length;i++) {
        if (user.likeList[i].travelTalkId == id){
          //取消赞
          travelUtil.like({
            identifiction: id,
            pinkHeart: travelTalk.pinkHeart
          }).then(res => {
            console.log(res)
            if (res.code = 200) {
              //成功取消点赞
              that.if_like = -1 //将该游记的if_like设置为false
              travelTalk.pinkHeart -= 1 //点赞数减1
              if (travelTalk.pinkHeart < 3) {
                //删去该用户的头像
                let my_avatar = travel.like_avatars.indexOf(user.image)
                travelTalk.like_avatars.splice(my_avatar, 1)
              }
              travelTalkList[index] = travelTalk
              that.setData({
                travelTalkList: travelTalkList, //重新渲染页面
                sendLike: false
              })
            }
          })
        }
        break
      }
      if(i == user.likeList.length){
        travelUtil.like({
          identifiction: id,
          pinkHeart: travelTalk.pinkHeart
        }).then(res => {
          console.log(res)
          if (res.code = 200) {
            that.if_like = index
            travelTalk.pinkHeart += 1
            let pinkHeart = travelTalk.pinkHeart
            if (pinkHeart <= 3) {
              //加上该用户的头像
              travel.like_avatars[pinkHeart - 1] = user.image
            }
            travelTalkList[index] = travelTalk
            that.setData({
              travelTalkList: travelTalkList,
              sendLike: false
            })
          }
        })
      }
    }
  },

  addTalking: function (e) {
    var that = this
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/addTravelTalk/addTravelTalk',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptNewTravel: function(res) {
            console.log(res)
            var travelTalkList = that.data.travelTalkList
            travelTalkList.splice(0, 0, res.data)
            that.setData({
              travelTalkList: travelTalkList
            })
          }
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var recCity
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    console.log("进入页面前，个人信息：")
    console.log(user)

    that.setData({
      userCity: wx.getStorageSync('recCity')
    })
    if (that.data.userCity == null || that.data.userCity == "") {
      that.setData({ //如果没有推荐城市的缓存，则使用个人资料里的city_id，再没有就直接用北京市
        userCity: user.userCity != null ? user.userCity : '北京'
      })
    }
    recCity = that.data.userCity
    travelUtil.getRecTravels({
      city: recCity,
    }).then(res => {
      that.setData({
				travelTalkList: res.data,
        oldCity: recCity,
      })
      wx.hideToast()
			console.log("加载结束")
      console.log(that.data)
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
    if (this.data.userCity != this.data.oldCity) {
      //选择的城市改变
      //修改缓存
      wx.setStorage({
        key: 'recCity',
        data: this.data.userCity,
      })
      var that = this
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
      travelUtil.getRecTravels({
        city_id: that.data.userCity,
      }).then(res => {
        that.setData({
					travelTalkList: res.data,
          oldCity: that.data.userCity,
          showTip: false,
          sendLike: false,
        })
        wx.hideToast()
      })
    }
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
    console.log("开始刷新")
    var that = this
    travelUtil.getRecTravels({
      city: that.data.userCity,
    }).then(res => {
      that.setData({
				travelTalkList: res.data,
        oldCity: user.userCity,
        userCity: user.userCity,
        showTip: false,
        sendLike: false,
      })
      console.log("刷新完毕")
      console.log(that.data)
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this

		if (that.data.loadMoreType != 2) { //还没到底的话，则发送请求
			that.setData({
				loadMoreType: 1
			})
      travelUtil.getRecTravels({
        city: that.data.userCity,
      }).then(res => {
				console.log("上拉加载结果：")
				console.log(res.data)
        let travelTalkList = res.data
        that.setData({
					loadMoreType: travelTalkList.length < 10 ? 2 : 0,
					travelTalkList: travelTalkList,
					showLoadTip: false
        })
        console.log(that.data)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //根据点击转发的位置不同，设置不同的信息
    var that = this
    if (e.from == "menu") {
      return {
        title: that.data.userCity  + "超全景点美食线路攻略，实用度MAX!",
        imageUrl: that.data.travelTalkList[0].imgUrl[0],
        path: "/pages/travelTalks/travelTalks"
      }
    } else if (e.from == "button") {
      var i = e.target.id
      return {
        title: "这篇" + that.data.userCity + "游记真精彩，快来看看~",
        imageUrl: that.data.travelTalkList[i].imgUrl[0],
        path: "/pages/travelTalk/travelTalk?identifiction=" + that.data.travelTalkList[i].identifiction
      }
    }
  }
})