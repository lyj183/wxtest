// pages/apiTest/apiTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: {}

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

  },

  // 处理点击事件
  onClickBtn(e) {
    let that = this
    console.log(e.currentTarget.dataset.type)
    switch (e.currentTarget.dataset.type) {
      case "sys" :
        wx.getSystemInfo({
          success(res) {
            that.setData({
              text: res
            })
            console.log(that.data.text)
          },
          fail(err) {

          }
        })
        break;
    }
    
  }
})