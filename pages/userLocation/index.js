//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    ldata: false
  },


  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开美团外卖的定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {
              res.authSetting = {
                "scope.userInfo": true,
                "scope.userLocation": true
              }
              console.log(res)
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  onShow: function () {
    wx.getSetting({
      success: (res) => {
        console.log(res)
      }
    })
  },
  onLoad: function () {
    // 获取位置
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          ldata: true,
          latitude: latitude,
          longitude: longitude
        })
      },
      fail: function (res) {
        console.log('拒绝授权')
        that.setData({
          ldata: false
        })
      }
    })


    // //判断是否获得了用户地理位置授权
    // wx.getSetting({
    //   success: (res) => {
    //     if (!res.authSetting['scope.userLocation'])
    //       that.openConfirm()
    //   }
    // })


  },
  getLocationHander (e) {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 28
    })
  },
  getAuthLocation: function (e) {
    var that = this;
    if (!e.detail.authSetting['scope.userLocation']) {
      that.setData({
        ldata: false
      })
    } else {
      that.setData({
        ldata: true,
      })
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude

          that.setData({
            latitude: latitude,
            longitude: longitude
          })
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
          })
        }
      })
    }
  }
})
