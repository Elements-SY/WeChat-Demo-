/**
  * 图片转换
  * @param filePath 小程序上传的临时文件路径
  * @return 图片流或base64
*/
export function buffer (filePath) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success: res => {
        // 返回临时文件图片base64编码
        // console.log(res.data)
        resolve(res.data)
      },
      fail: err => {
        reject()
      }
    })
  })
}

let parmas = {
  url: 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
  data: {
    "auth": {
      "identity": {
        "methods": [
          "password"
        ],
        "password": {
          "user": {
            "domain": {
              "name": "z15800363357"
            },
            "name": "z15800363357",
            "password": "zyb123!!"
          }
        }
      },
      "scope": {
        "project": {
          "name": "cn-north-4"
        }
      }
    }
  }
}
/**
  * 获取华为用户token
*/
export function requestAuthToken () {
  return new Promise((resolve, reject) => {
    wx.request({
      url: parmas.url,
      data: parmas.data,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode == 201) {
          const result = {
            auth_token: res.header['X-Subject-Token']
          }
          // 设置auth_token的过期时间，提前5分钟获取
          result.expires_at = new Date(res.data.token.expires_at).getTime() - 5 * 60 * 1000
          resolve(result)
        }
      },
      fail: err => {
        wx.showToast({
          title: '获取token失败，请重试',
          icon: 'none'
        })
        reject('requestAuthToken方法出了问题：' + err)
      }
    })
  })
}