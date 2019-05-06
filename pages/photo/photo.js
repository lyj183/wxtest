// pages/photo.js
const { hexMD5 } = require('../../utils/md5')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: '',
    url: ''
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

  // 设置图片背景
  setCanvas() {
    let that = this;
    const ctx = wx.createCanvasContext('myCanvas')
    // Create linear gradient
    const grd = ctx.createLinearGradient(0, 0, 270, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'black')
    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 280, 180)
    ctx.draw(true, function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: res => {
          // 获得图片临时路径
          that.setData({
            pic: res.tempFilePath
          })
        }
      })
    });
  },
  
  // 拍照
  takePhoto() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          pic: res.tempFilePaths[0]
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  // 绘图
  drawCanvas() {
    let that = this
    if (that.data.pic) {
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.drawImage(that.data.pic, 0, 0, 300, 200);
      ctx.draw(true);
    } else {
      that.setCanvas()
    }
  },

  // 上传照片
  savePhoto() {
    let that = this
    wx.showLoading({
      title: '上传中',
    })
    const filePath = that.data.pic
    // 图片更名MD5
    const newName = hexMD5(filePath.substr(filePath.lastIndexOf('/') + 1));
    const cloudPath = `images/${newName}` + filePath.match(/\.[^.]+?$/)[0]
    // 上传图片
    wx.cloud.init();
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)
        that.setData({
          pic: res.fileID // fileID就可以设置图片了
        })
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // get temp file URL
            that.setData({
              url: res.fileList[0].tempFileURL
            })
            console.log(res.tempFileURL)
          },
          fail: err => {
            // handle error
          }
        })
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

})