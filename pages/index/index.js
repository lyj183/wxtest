//index.js
//获取应用实例
const app = getApp()
const router = require("../../utils/router.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 跳转到绘图页
  gotoPhotoPage() {
    wx.navigateTo({
      url: router.Photo
    })
  },
  // 跳转到倒计时页
  gotoCountDownPage() {
    wx.navigateTo({
      url: router.CountDown
    })
  },
  // 跳转到组件页
  gotoComponentPage() {
    wx.navigateTo({
      url: router.Component
    })
  },
  // 跳转到Api测试页
  gotoApiTestPage() {
    wx.navigateTo({
      url: router.ApiPage
    })
  },
  // 跳转地图
  gotoMapPage() {
    wx.navigateTo({
      url: router.Map
    })
  },
  // 滑动删除
  gotoDelCell() {
    wx.navigateTo({
      url: router.DelPage
    })
  },
  // 滑动
  gotoSlide() {
    wx.navigateTo({
      url: router.SlidePage
    })
  }
})
