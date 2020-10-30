//index.js

import meunData from './meunData'

Page({
  data: {
    tabs: {
      active: 0, // tab切换索引
      swipeable: true, // 是否开启滑动
      animate: true, // 是否开启动画切换效果
      navData: meunData
    },
  },
  // 路由跳转
  pageEnter (e) {
    let link = e.currentTarget.dataset.item.page_link
    wx.navigateTo({
      url: `../../${link}`
    })
    // console.log(e.currentTarget.dataset.item)
  },
  // 滚动事件
  scroll(){
    // console.log('scroll')
  },
  // 切换事件
  switch(e){
    // console.log('switch',e)
  }
})
