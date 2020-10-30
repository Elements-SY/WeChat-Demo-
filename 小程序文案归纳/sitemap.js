// 微信小程序 sitemap.json文件说明

/*

由于微信搜索已经对微信小程序开放站内搜索，这句话就是说，
一个小程序的任何页面都可以通过微信搜索来查找从而被搜索引擎索引。
我们可以通过sitemap.json(网站导航配置文件)对该项目进行设置规则是否被微信搜索引擎检索。

linkUrl: https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html
sitemap.json 网站导航配置文件:

用于该项目或者该项目的某些页面是否对微信搜索开放。

如果仅作为个人私人平台，那么整个项目则对微信搜索不开放,

在上述我们linkUrl指定关于sitemap说明中，我们不难发现rules 配置项中允许配置跳转传参页开放与否的规则，

也就是意味着可能跳转传参中某些字段的值存在风险不想被劫持，我们就可以通过配置跳转传参页开放与否的规则；

或者是某些页面不需要跳转传参的就是不想对微信搜索开放亦可配置微信搜索开放规则;

微信“小程序搜索”功能服务使用须知链接如下：

linkUrl: https://mp.weixin.qq.com/wxopen/readtemplate?t=config/search_agreement_tmpl

*/