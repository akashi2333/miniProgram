const app = getApp();
var user = getApp().globalData.userInfo
var travelUtil = require('../../utils/travelUtil')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    uhide: 0,
    sendLike: false,
    sendCollection: false,
    if_like_travelTalk: -1,
    if_like: -1,
    if_like_downComment: -1,
    if_collected: -1
  },

  ShowReplay: function (event) {
    let show = this.data.uhide;
    let id = event.currentTarget.id;
    if(show == id){
      this.setData({
        uhide: 0
      })
    }else{
      this.setData({
        uhide: id
      })
    }
  },


  BackPage: function () {
    wx.navigateTo({
      url: '/pages/travelTalks/travelTalks',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    if (options.haveViewd == "true") {
      //曾经访问过，直接用已有的数据
      console.log("直接用")
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2];
      that.setData({
        travelTalk: prevPage.data.travelTalkList[options.index],
        index: options.index
      })
      wx.hideToast()
      //改变上一个页面对应的游记信息
      that.changePrePage(that.data.travelTalk)
    } else {
      //发送请求，获取该游记的详情
      console.log("访问")
      travelUtil.getATravel({
       identifiction: options.identifiction
      }).then(res => {
        that.setData({
          travelTalk: res.data.travelTalk,
          index: options.index
        })
        wx.hideToast()
        //改变上一个页面对应的游记信息
        that.changePrePage(that.data.travelTalk)
      })
    }
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
    var that = this
    return {
      title: "这篇" + that.data.travel.city + "游记真精彩，快来看看~",
      imageUrl: that.data.travel.imgUrl[0],
      path: "/pages/travelTalk/travelTalk?id=" + that.data.travel.identifiction
    }

  },

  /**
   * 给一篇游记点赞或者取消赞
   */
  zan: function(event) {
    if (!app.globalData.isLogin) {
      this.setData({
        showMask: true
      })
    } else if (this.data.sendLike) {} //已经在发送请求，防止连续多次点赞，啥也不干
    else {
      var that = this
      that.setData({
        sendLike: true
      })
      var travelTalk = that.data.travelTalk
      var id = travelTalk.identifiction
      var i = null
      for(i = 0; i < user.likeList.length;i++){
        if(user.likeList[i].travelTalkId == id){
          //取消赞
          travelUtil.like(
            {identifiction: travelTalk.identifiction,
            pinkHeart: travelTalk.pinkHeart}).then(res => {
            console.log(res)
            //成功取消点赞
            if (res.code = 200) {
              that.if_like_travelTalk = -1
              travelTalk.pinkHeart -= 1 //点赞数减1
              if (travelTalk.pinkHeart < 3) {
                //删去该用户的头像
                let my_avatar = travelTalk.like_avatars.indexOf(user.image)
                travelTalk.like_avatars.splice(my_avatar, 1)
              }
              that.setData({
                travelTalk: travelTalk, //重新渲染页面
                sendLike: false
              })
              //改变上一个页面对应的游记信息
              that.changePrePage(that.data.travelTalk)
            }
          })
        }
        break
      }
      if(i == user.likeList.length){
        travelUtil.like({
          identifiction: travelTalk.identifiction,
          pinkHeart: travelTalk.pinkHeart
        }).then(res => {
          console.log(res)
          if (res.code = 200) {
            that.if_like_travelTalk = id
            travelTalk.pinkHeart += 1
            if (travelTalk.pinkHeart <= 3) {
              //加上该用户的头像
              travelTalk.like_avatars[travelTalk.pinkHeart - 1] = user.image
            }
            that.setData({
              travelTalk: travelTalk,
              sendLike: false
            })
            //改变上一个页面对应的游记信息
            that.changePrePage(that.data.travelTalk)
          }
        })
      }
    }
  },

  /**
   * 给一个评论 点赞 / 取消赞
   */
  like_comment: function(event) {
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else if (this.data.sendLike) {} //已经在发送请求，放在连续多次点赞，啥也不干
    else {
      console.log(event)
      var that = this
      that.setData({
        sendLike: true
      })
      var index = event.currentTarget.id
      var travelTalk = that.data.travelTalk
      var comment = travelTalk.commentList[index]
      var id = comment.identifiction
      for(i = 0; i < user.commentlikeList.length;i++){
        if(user.commentlikeList[i].commentId == id) {
          //取消赞
          travelUtil.likeComment({
            identifiction: comment.identifiction,
            pinkHeart: comment.pinkHeart
          }).then(res => {
            console.log(res)
            //成功取消点赞
            if (res.code = 200) {
              that.if_like = -1 //将该游记的if_like设置为false
              travelTalk.commentList[index].pinkHeart -= 1 //点赞数减1
              that.setData({
                travelTalk: travelTalk, //重新渲染页面
                sendLike: false
              })
              //改变上一个页面对应的游记信息
              that.changePrePage(that.data.travelTalk)
            }
          })
        }
        break
      }
      if(i == user.commentlikeList.length){
        //点赞
        travelUtil.likeComment({
          identifiction: comment.identifiction,
          pinkHeart: comment.pinkHeart
         }).then(res => {
           console.log(res)
           if (res.code = 200) {
             that.if_like = index
             travelTalk.commentList[index].pinkHeart += 1
             that.setData({
               travelTalk: travelTalk,
               sendLike: false
             })
             //改变上一个页面对应的游记信息
             that.changePrePage(that.data.travelTalk)
           }
         })
      }
    }
  },

  /**
   * 给一个回复的评论 点赞 / 取消赞
   */
  like_down_comment: function(event) {
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else if (this.data.sendLike) {} //已经在发送请求，放在连续多次点赞，啥也不干
    else {
      console.log(event)
      var that = this
      that.setData({
        sendLike: true
      })
      var index = event.currentTarget.id
      var Cindex = event.currentTarget.dataset.key
      var travelTalk = that.data.travelTalk
      var comment = travelTalk.commentList[Cindex]
      var downComment = comment.downCommentList[index]
      var id = downComment.identifiction
      for(i = 0; i < user.downcommentlikeList.length;i++){
        if(user.downcommentlikeList[i].downcommentId == id) {
          //取消赞
          travelUtil.likeComment({
            identifiction: downComment.identifiction,
            pinkHeart: downComment.pinkHeart
          }).then(res => {
            console.log(res)
            //成功取消点赞
            if (res.code = 200) {
              that.if_like_downComment = -1 //将该游记的if_like设置为false
              travelTalk.commentList[Cindex].downCommentList[index].pinkHeart -= 1 //点赞数减1
              that.setData({
                travelTalk: travelTalk, //重新渲染页面
                sendLike: false
              })
              //改变上一个页面对应的游记信息
              that.changePrePage(that.data.travelTalk)
            }
          })
        }
        break
      }
      if(i == user.downcommentlikeList.length){
        //点赞
        travelUtil.likeComment({
          identifiction: downComment.identifiction,
          pinkHeart: downComment.pinkHeart
         }).then(res => {
           console.log(res)
           if (res.code = 200) {
            that.if_like = index
             travelTalk.commentList[Cindex].downCommentList[index].pinkHeart += 1
             that.setData({
               travelTalk: travelTalk,
               sendLike: false
             })
             //改变上一个页面对应的游记信息
             that.changePrePage(that.data.travelTalk)
           }
         })
      }
    }
  },

  /**
   * 收藏/取消收藏 游记
   */
  collect: function() {
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else if (this.data.sendCollection) {} //已经在发送请求，防止连续多次收藏，啥也不干
    else {
      var that = this
      that.setData({
        sendCollection: true
      })
      var travelTalk = that.data.travelTalk
      var id = travelTalk.identifiction
      var i
      for(i =0; i < user.collection.length;i++){
        if(user.collection[i].collectId == id){
          //取消收藏
          travelUtil.collect({
            collection: travelTalk.identifiction,
            userName: user.userName
          }).then(res => {
            console.log(res)
            if (res.code = 200) {
              //成功取消收藏
              that.if_collected = -1 //将该游记的if_collected设置为false
              that.setData({
                travelTalk: travelTalk, //重新渲染页面
                sendCollection: false
              })
              wx.showToast({
                title: '取消收藏成功',
                icon: 'success',
                duration: 1000
              })
              //改变上一个页面对应的游记信息
              that.changePrePage(that.data.travelTalk)
            }
          })
        }
        break
      }
      if(i == user.collection.length){
        //收藏
        travelUtil.collect({
          identifiction:travelTalk.identifiction
        }).then(res => {
          console.log(res)
          if (res.code = 200) {
            that.if_collected = id //设置该游记的if_collected
            that.setData({
              travelTalk: travelTalk,
              sendCollection: false
            })
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })
            //改变上一个页面对应的游记信息
            that.changePrePage(that.data.travelTalk)
          }
        })
      } 
    }
  },

  /**
   * 输入框内容改变
   */
  change_comment: function(event) {
    var content = event.detail.value
    this.setData({
      comment_content: content
    })
  },

  /**
   * 发表评论
   */
  post_comment: function() {
    if (!app.globalData.isLogin) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else {
      var that = this
      var travelTalk = that.data.travelTalk
      if (that.data.comment_content != null && that.data.comment_content != "") {
        travelUtil.comment_travel({
          userName: user.userName,
          comment: comment_content,
          headImg: user.image,
          pinkHeart: 0,
          downComment: null,
          downCommentList: null,
          time: dateUtil.getDate()
        }).then(res => {
          if (res.code == 200) {
            travelTalk.commentList.splice(travelTalk.commentList.length, 0, res.data)
            travelTalk.commentNumber += 1
            that.setData({
              travelTalk: travelTalk
            })
            console.log(travelTalk.commentList)
            //改变上一个页面对应的游记信息
            that.changePrePage(that.data.travelTalk)
          }
        })
        that.setData({
          comment_content: ""
        })
      }
    }
  },

  
  /**
   * 改变上一个页面的游记列表中，对应的那个游记的信息
   */
  changePrePage: function(travelTalk) {
    //改变上一个页面对应的游记信息
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2];
    if (prevPage.route != "../../pages/travelTalks/travelTalks" && prevPage.route.indexOf('collect') == -1) {
      let travelTalkList = prevPage.data.travelTalkList
      let haveViewds = prevPage.data.haveViewds
      let index = this.data.index

      travelTalkList[index] = travelTalk
      haveViewds[index] = true

      prevPage.setData({
        travelTalkList: travelTalkList,
        haveViewds: haveViewds
      })
    }
  }
})