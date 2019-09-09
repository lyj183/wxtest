// pages/delTest/delTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < 20; i++) {
      var msg = {};
      msg.msgText = '沪D086X' + i;
      msg.id = i;
      msg.status = true //true为正常显示，false为显示删除按钮
      this.data.list.push(msg);
    }
    this.setData({ 
      list: this.data.list,
    });

  },

  // 监听屏幕滚动 判断上下滚动  
  // https://blog.csdn.net/bright2017/article/details/82819028
  onPageScroll: function (ev) {
    var _this = this;
    //当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值   
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动   
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      console.log('向下滚动');
      console.log(ev.scrollTop);

    } else {
      console.log('向上滚动');

    }
    //给scrollTop重新赋值    
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
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

  },

  touchS(e) {
    // 获得起始坐标
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }, 

  touchM(e) {
    // 获得当前坐标
    this.currentX = e.touches[0].clientX;
    this.currentY = e.touches[0].clientY;
    const x = this.startX - this.currentX; //横向移动距离
    const y = Math.abs(this.startY - this.currentY); //纵向移动距离，若向左移动有点倾斜也可以接受
    if (x > 35 && y < 110) {
      //向左滑是显示删除
      for (var i = 0; i < this.data.list.length; i++) {
        if (i != e.currentTarget.id) {
          this.data.list[i].status = true;
        } else {
          this.data.list[i].status = false;
        }
      }
      this.setData({
        list: this.data.list
      })
    } else if (x < -35 && y < 110) {
      //向右滑
      this.data.list[e.currentTarget.id].status = true;
      this.setData({
        list: this.data.list
      })
    }
  },
  delete(e) {
    this.data.list.splice(e.currentTarget.id, 1)
    this.setData({
      list: this.data.list
    })
  }


})