//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    loading: false, // 是否在加载中
    downward: false, // 下拉方向
    upward: false, // 上拉方向
    pull: true, // 下拉刷新状态 false释放刷新状态  上拉加载更多状态  false释放加载更多状态
    refreshing_text: '下拉刷新',
    loading_text: '上拉加载更多',
    loadingHeight: 50, // 正在加载时高度
    refreshHeight: 0, // 刷新布局高度  
    loadMoreHeight: 0, // 加载更多布局高度
    scrolling: false, // 滚动中
    isUpper: true, // scroll-view 滚动条默认在最上
    isLower: false,
    currentSize: 0,
    words: [],
    downY: 0,//触摸时Y轴坐标
    pixel: 1
  },
  onLoad: function () {
    // 模拟首次进入page页请求渲染20条数据
    this.doLoadData(0, 20);
  },
  doLoadData (currendSize, PAGE_SIZE) {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    setTimeout(function () {
      var length = currendSize + PAGE_SIZE;
      for (var i = currendSize; i < length; i++) {
        that.data.words.push('内容' + i);
      }
      var words = that.data.words;
      that.data.currentSize += PAGE_SIZE;
      that.setData({
        words: words
      });
      wx.hideLoading();
      that.loadFinish();
    }, 2000);
  },
  scroll: function () {
    // console.log("scroll触发");
    this.data.scrolling = true;
    this.data.isLower = false;
    this.data.isUpper = false;
  },
  // 向下滚动至底部时触发
  lower: function () {
    // console.log("向下滚动至底部时触发")
    this.data.isLower = true;
    this.data.scrolling = false;
  },
  // 向上滚动至顶部时触发
  upper: function () {
    // console.log("向上滚动至顶部时触发");
    this.data.isUpper = true;
    this.data.scrolling = false;
  },
  start: function (e) {
    if (this.data.scrolling || this.data.loading) {
      return;
    }
    var startPoint = e.touches[0]
    var clientY = startPoint.clientY;
    this.setData({
      downY: clientY,
      refreshHeight: 0,
      loadMoreHeight: 0,
      pull: true,
      refreshing_text: '下拉刷新',
      loading_text: '上拉加载更多'
    });
  },
  end: function (e) {
    this.data.scrolling = false;
    if (this.data.refreshing) {
      return;
    }
    console.log('end');
    //释放开始刷新
    var height = this.data.loadingHeight;
    if (this.data.refreshHeight > this.data.loadingHeight) {
      this.setData({
        refreshHeight: height,
        loading: true,
        pull: false,
        refreshing_text: '正在刷新...'
      });
      this.refresh();
    } else if (this.data.loadMoreHeight > height) {
      this.setData({
        loadMoreHeight: height,
        loading: true,
        pull: false,
        loading_text: '正在加载更多...'
      });
      this.loadMore();
    } else {
      this.setData({
        refreshHeight: 0,
        loadMoreHeight: 0,
        loading: false,
        pull: true
      })
    }
  },
  //模拟刷新数据
  refresh: function () {
    this.setData({
      words: [],
      currentSize: 0
    });
    this.doLoadData(0, 20);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 20);
  },
  loadFinish: function () {
    var that = this;
    setTimeout(function () {
      //2s后刷新结束
      that.setData({
        refreshHeight: 0,
        loadMoreHeight: 0,
        loading: false
      })
    }, 1000);
  },
  move: function (e) {
    // 判断是否处在滚动事件中还是在加载中，如果不处于在滚动事件中
    // 并且不处在加载状态那么则走滑动事件的条件。
    if (this.data.scrolling || this.data.loading) {
      return;
    }
    // 获取滑动事件对象，获取滑动事件对象的坐标系 
    var movePoint = e.changedTouches[0]
    // 滑动的步数减去 开始滑动时，相距设备可视区的距离 等于实际滑动的， 乘以 0.6 就是
    var moveY = (movePoint.clientY - this.data.downY) * this.data.pixel;

    // 判断是向下滑动还是向下滑动的方向
    // 下拉刷新
    if (moveY > 0) {
      console.log('下拉')
      this.setData({
        refreshHeight: moveY,
        downward: true,
        upward: false
      })
      if (this.data.refreshHeight > this.data.loadingHeight) {
        this.setData({
          pull: false,
          refreshing_text: '释放立即刷新'
        })
      } else {
        this.setData({
          pull: true,
          refreshing_text: '下拉刷新'
        })
      }
    }
    // 上拉加载更多
    else {
      console.log('上拉') 
      this.setData({
        loadMoreHeight: Math.abs(moveY),
        downward: false,
        upward: true
      })
      if (this.data.loadMoreHeight > this.data.loadingHeight) {
        this.setData({
          pull: false,
          loading_text: '释放加载更多'
        })
      } else {
        this.setData({
          pull: true,
          refreshing_text: '上拉加载更多'
        })
      }
    }
  }
})

