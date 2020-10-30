// components/upload/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    afterRead(event) {
     
      const { file } = event.detail;
      const fileList = this.data.fileList
      this.setData({
        fileList: fileList.concat(file)
      })
      this.triggerEvent('confirm', {
        fileList: this.data.fileList
      }, {})
    },
    submit(e){
      console.log(e)
    },
  }
})
