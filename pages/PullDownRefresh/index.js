let meunData = require('./dataList')
/*
 scroll-view配置
    // 是否纵向滚动
    scrollY: true, 
    // 值应为某子元素id（id不能以数字开头）。
    // 设置哪个方向可滚动，则在哪个方向滚动到该元素
    scrollIntoView: '',
    // 设置竖向滚动条位置
    scrollTop: 0,
    // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
    enableBackToTop: true,
    // 设置自定义下拉刷新区域背景颜色
    refresherBackground: "#CCFFCC",
    // 开启自定义下拉刷新	
    refresherEnabled: true
    // 设置当前下拉刷新状态，
    // true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
    refresher-triggered: false
*/

Page({
  data: {
    // 纵向滚动
    verticalConfig: {
      scrollY: true, 
      scrollIntoView: '',
      scrollTop: 0,
      enableBackToTop: true,
      refresherBackground: "#CCFFCC",
      refresherEnabled: true,
      refresherTriggered: false
    },
    // 横向滚动
    horizontalConfig: {
      scrollY: false,
    },
    meunList: meunData.meunList,
    meunConten: meunData.meunConten,
  },
  // 滚动时触发
  eventClick: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    // this.setData({
    //   intoindex: "text" + e.currentTarget.dataset.id
    // })
  },
  scroll (e) {
    // console.log('滚动触发',e)
  },
  // 滚动到底部/右边时触发	
  scrollToLower (e) { 
    // console.log('滚动到底部时触发',e)
  },
  // 滚动到顶部/左边时触发
  scrollToupper (e) { 
    // console.log('滚动到顶部时触发',e)
  },
  // 自定义下拉刷新被触发
  pullDownRefresh (e) {
    console.log(e)
    setTimeout(()=>{
      // this.setData({
      //   verticalConfig: {
      //     refresherTriggered: false,
      //     enableBackToTop: true  
      //   }
      // })   
    },2000)
  },
  scrollToTop () {
    this.setAction({
      scrollTop: 0
    })
  },

  tap () {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove () {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})