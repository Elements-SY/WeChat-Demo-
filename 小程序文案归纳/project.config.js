/*
 project.config.json 工程配置
 project.config.json 工程配置文件是作为该项目配置的入口文件。以下是关于该项目配置文件的链接地址
 https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html

 miniprogramRoot字段：
 其中miniprogramRoot是指该项目所在的盘符文件的path路径。

packOptions字段：
packOptions 用以配置项目在打包过程中的选项。打包是预览、上传时对项目进行的必须步骤。
目前可以指定 packOptions.ignore 字段，用以配置打包时对符合指定规则的文件或文件夹进行忽略，
以跳过打包的过程，这些文件或文件夹将不会出现在预览或上传的结果内。packOptions.ignore 为一对象数组,
使用案列如下:

// packOptions 参数包 忽略 选项 该字段忽略项与项目中.gitignore.txt文件的忽略选项不同的是，
// “.gitignore.txt”文件是git工作流中的忽略配置文件，而这个字段是忽略哪些文件不需要被打包编译上传进行预览。
  "packOptions": {
    "ignore": [{
      "type": "file", // type 可以取的值为 folder、file、suffix、prefix，分别对应文件夹、文件、后缀、前缀。
      "value": "test/test.js" // value 路径或者取值
    }, {
      "type": "folder",
      "value": "test"
    }, {
      "type": "suffix",
      "value": ".webp"
    }, {
      "type": "prefix",
      "value": "test-"
    }]
  }

{
	"description": "项目配置文件", // 该字段是对project.config.json文件的描述
	"packOptions": { // 关于该字段的链接 https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html
		"ignore": []
  },
  setting字段：该字段与其他字段不同的是，通过该字段可以设置项目的开发配置项，
  在微信开发者工具中右上角的详情导航入口即可在本地设置导航中对project.config.json
  工程配置中的setting配置项做同步修改。
  提示：如果通过在配置文件中设置setting，那么将自动勾选启用微信开发者工具的配置项。

  "setting": {
    "urlCheck": true, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的第5行“不校验合法域名...”
    // urlCheck 字段 其实就是用来检测网络协议和域名是否符合规范，如果该项目使用的是https协议的，那么是否已经申请安全证书等。
    "es6": true, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的第1行“ES6 转 ES5”
    // es6 字段 是指是否允许在开发过程中将开发者使用ES6语法在编译的时候转换成ES5语法。
		"postcss": true, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的第7行“上传代码时样式自动补全”
		"minified": true, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的第8行“上传代码时自动压缩混淆”
		"newFeature": true, // 是否使用新特性
		"coverView": true,
    "nodeModules": true, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的第4行“自动运行体验评分”
    // nodeModules 字段是否使用npm模块
		"autoAudits": false, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的第3行“使用npm模块”
    "showShadowRootInWxmlPanel": true, // 对应微信开发者工具中右上角的详情导航入口即可在本地设置导航中的倒数第4行“以shadow-root形式...”

		"scopeDataCheck": false, // 不详，如果知道请给予补充谢谢
		"checkInvalidKey": true, // 不详，如果知道请给予补充谢谢
    "checkSiteMap": true, // 该字段是指是否需要开启使用sitemap.json文件配置项
    // 关于checkSiteMap字段详情进入如下链接页面的底部说明
    // https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html
		"uploadWithSourceMap": true, // 上传时是否带上 sourcemap（默认为true）
		"babelSetting": { // 增强编译下Babel的配置项
			"ignore": [],
			"disablePlugins": [],
			"outputPath": ""
    }
  },
	"compileType": "miniprogram", // 编译类型
	"libVersion": "2.11.0", // 基础库版本
	"appid": "wx67b959fbdf01f392", // 项目的 appid，只在新建项目时读取
	"projectname": "WeChat", // 项目名字，只在新建项目时读取
	"debugOptions": { // 调试配置选项
		"hidedInDevtools": []
	},
  "isGameTourist": false, // 微信游戏小程序开发
  // 在微信开发者工具中打开微信开发者工具进入编辑器首页左侧栏我们可以看到该微信开发者工具编辑器
  // 分为微信小程序和微信小游戏、代码片段以及微信公众号网页,其中微信小程序又分为小程序和插件开发
	"simulatorType": "wechat", // 模拟器类型
	"simulatorPluginLibVersion": {}, // 模拟器插件库版本
	"condition": {
		"search": {
			"current": -1,
			"list": []
		},
		"conversation": {
			"current": -1,
			"list": []
		},
		"game": {
			"currentL": -1,
			"list": []
		},
		"miniprogram": {
			"current": -1,
			"list": []
		}
	}
}

*/