// pages/authInfo/auth-info.js
import { buffer } from '../../utils/util'
import { ocrIDCard, ocrDriverCard, ocrVehicleCard, topics } from '../../http/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: 'data:image/jpg;base64,',
    id_card: {
      name: '',
      number: '',
      address: '',
      image: {
        front_url: '',
        back_url: ''
      }
    },
    driver_card: { // 如果无驾照认证driver_card传一个null
      type_value: '',
      url: '',
    },
    cWidth: 0,
    cHeight: 0
  },

  // 身份证(正）
  compress: function (res) {// 图片压缩
    var that = this;
    console.log(res);
    if (res.size >= 63000) {// 当图片大于64K，压缩，这里我限制写得比较小
      wx.compressImage({// 图片压缩
        src: res.path,
        quality: 1,
        success (res) {
          that.SizeImg(res);
        }
      })
    } else {
      that.base(res.path); // 当图片小于64K，开base64
    }
  },

  SizeImg: function (res) {// 查询图片大小
    let that = this;
    wx.getFileInfo({  //查询压缩后的图片大小
      filePath: res.tempFilePaths[0],
      success (r) {
        console.log('压缩后的文件大小：' + r.size);
        console.log('压缩后的临时路径：' + res.tempFilePaths[0]);
        that.base(res.tempFilePaths[0]);
        if (r.size >= 63000) {
        } else {

        }
      }
    })
  },

  base: function (img) {
    let that = this;
    wx.getFileSystemManager(img).readFile({
      filePath: img, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        console.log(res)
      }
    })
  },

  urlTobase64 (url) {//接下来，把临时路径作为一个请求的url，把数据返回格式设置成arraybuffer
    wx.request({
      url: url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        //把arraybuffer转成base64
        let base64 = wx.arrayBufferToBase64(res.data);
        //不加上这串字符，在页面无法显示的哦
        base64 = 'data:image/jpeg;base64,' + base64
        //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
        console.log(base64)
      }
    })
  },


  // 身份证(反）
  chooseBackImage (e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res)
        this.SizeImg(res)
        // const data = await buffer(res.tempFilePaths[0])
        // this.setData({
        //   id_card: {
        //     name: this.data.id_card.name,
        //     number: this.data.id_card.number,
        //     address: this.data.id_card.address,
        //     image: {
        //       front_url: this.data.id_card.image.front_url,
        //       back_url: this.data.baseUrl + data,
        //     }
        //   }
        // })
        // const list = await ocrIDCard({ image: data, side: "back" })
        // console.log('身份证反面', list.data.result)
      }
    })
  },

  // 驾驶证
  chooseDriverImage (e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: async res => {
        const data = await buffer(res.tempFilePaths[0])
        const list = await ocrDriverCard({ image: data, side: "front" })
        console.log('驾驶证正面', list)
        this.setData({
          driver_card: {
            type_value: list.data.result.class,
            url: this.data.baseUrl + data
          }
        })
      }
    })
  },

  // 主题
  async getTopics () {
    let parmas = {
      page: 1, // Number 页数
      tab: 'good', // String 主题分类。目前有 ask share job good
      limit: 5 // Number 每一页的主题数量
    }
    let data = await topics(parmas)
    console.log(data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getTopics()
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