/**
 * 用于给 游记/评论 点赞/取消点赞 收藏/取消收藏 评论等操作
 */
var net = require('./require')
var app = getApp()


//获取游记推荐
function getRecTravels(data) {
  return net.req_get('/travelTalk/tTList', data)
}

//获取游记详情
function getATravel(data) {
  return net.req_get('/travelTalk/tTList/tTPage', data)
}

//搜索游记
function searchTravel(content, pageIndex, is_login = false) {
  return net.req_get('/GET/searchTravel', {
    content: content,
    pageIndex: pageIndex
  }, is_login)
}

//发表游记
function new_travel(data) {
  return net.post('/travelTalk/addTT', data)
}

//给 游记 点赞
function like(data) {
  return net.post('/travelTalk/tTList/travelTalkLike', data)
}

//给 评论 点赞
function likeComment(data) {
  return net.post('/travelTalk/tTList/commentLike', data)
}

//收藏游记
function collect(data) {
  console.log("travelUtil: collect")
  console.log(collection)
  return net.post('/travelTalk/tTList/updateCollection', data)
}


//评论游记
function comment_travel(data) {
  return net.post('/travelTalk/tTList/addDownComment',data)
}


//获取浏览记录数目
function getViewCount(uid) {
  return net.req_get('/GET/myViews/num', {
    uid: uid
  })
}


module.exports = {
  getRecTravels: getRecTravels, //获取游记推荐
  searchTravel: searchTravel, //搜索游记
  getATravel: getATravel, //获取一篇游记详情
  new_travel: new_travel, //发表游记
  like: like, //点赞
  collect: collect, //收藏
  likeComment: likeComment,
  comment_travel: comment_travel, //评论游记
  getViewCount: getViewCount,//获取浏览记录数目
}