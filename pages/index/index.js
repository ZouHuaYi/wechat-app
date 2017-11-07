//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    loadingHidden:false,
    addNum:5,
    addIndex:0,
    book:[]
  },
  tabBanner:function(e){
    //console.log(e.detail.current)
  },
  onReachBottom: function () {
    var ths=this;
    ths.setData({
      loadingHidden: false
    })
    wx.request({
      url: app.globalData.doubanBaseUrl + app.globalData.bookSearch + "?" + "q=红楼梦&" + "start=" + (10 + ths.data.addIndex * ths.data.addNum) + "&count=" +ths.data.addNum,
      method: 'GET',
      data: {},
      header: {
        'Content-Type': 'json'  //豆瓣的API的格式一定是要json
      },
      success: function (res) {
        var list = ths.data.book;
        for (let i = 0; i < res.data.books.length; i++) {
          list.push(res.data.books[i]);
        }
        ths.setData({
          books: list,
          loadingHidden: true
        })
        ths.data.addIndex++;
      }
    })
  },
  goto:function(ev){
    app.globalData.bookIdName = ev.currentTarget.id;
    wx.navigateTo({
      url: '../details/details',
    })
  },
  onLoad: function () {
    var that=this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
      method:'GET',
      data:{},
      header:{
        'Accept': 'application/json'
      },
      success: function(res){
        that.setData({
          images:res.data,
          loadingHidden: true
        })
      }
    })
    wx.request({
      url:app.globalData.doubanBaseUrl + app.globalData.bookSearch+"?"+"q=红楼梦&start=0&count=10",
      method: 'GET',
      data: {},
      header: {
        'Content-Type': 'json'  //豆瓣的API的格式一定是要json
      },
      success:function(res){
        console.log(res)
        var list=that.data.book;
        for (let i = 0; i < res.data.books.length;i++){
          list.push(res.data.books[i]);
        }
        that.setData({
          books: list
        })
      }
    })
   
  }
})
