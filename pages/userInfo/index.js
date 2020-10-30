// pages/authorize/index.js
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getToken: {
      grant_type: 'client_credential',
      client_id: 'wx5aa1501192480966',
      client_secret: '399458b47fe71b1a8bed47aa6863131a'
    },
    cocrCard: {
      type: 'photo',
      img_url: 'https://exp-picture.cdn.bcebos.com/562787cf02532f6398c01d85699147e832e05c99.jpg?x-bce-process=image%2Fresize%2Cm_lfit%2Cw_480%2Climit_1',
      img: {
        contentType: 'image/jpg',
        value: ''
      },
      access_token: '',
    },
    fileList: [],
  },

  onConfirmPic (e) {
    let baseType = 'data:image/png;base64,'
    const { fileList } = e.detail
    this.data.fileList = fileList.map(v => v.path)
    console.log('父组件', this.data.fileList)
    wx.getFileSystemManager().readFile({
      filePath: this.data.fileList[0],
      encoding: 'base64',
      success: res => {
        // 返回临时文件图片base64编码
        this.data.cocrCard.img_url = baseType + res.data
        this.data.cocrCard.img.value = res.data
        console.log('图片流', res.data)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  userLogin () {
    wx.login({
      success: (res) => {
        console.log(res)
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  getAccessToken () {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: this.data.getToken,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        if (res.statusCode == 200) {
          this.data.cocrCard.access_token = res.data.access_token
          console.log('getAccessToken', this.data.cocrCard.access_token)
          this.ocrCard()
        }
      }
    })
  },

  ocrCard () {
    const { type, img_url, img, access_token } = this.data.cocrCard
    wx.request({
      url: `https://api.weixin.qq.com/cv/ocr/idcard?type=${type}&img_url=${img_url}&access_token=${access_token}`,
      // url: `https://api.weixin.qq.com/cv/ocr/idcard?type=${type}&img_url=${img}&access_token=${access_token}`,
      method: 'POST',
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('ocrCard', res)
        }
      }
    })
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../userSetting/index'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
