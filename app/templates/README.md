# Generator-SimplePage
# 星游前端专题项目介绍

## 项目描述

专题项目，是用来搭建游戏平台的活动专题页面的一个简单项目，主要应用于178、PTBUS、TGBUS等三个平台。其中，项目内容主要包括相关游戏的活动介绍、活动展示等常用功能。

---------------------------------------------------------------------

## 项目架构

* 项目采用jQuery+原生JavaScript进行开发
* 项目采用CMD规范进行模块化
* 项目采用Node+gulp进行打包压缩

---------------------------------------------------------------------

## 目录结构

```
[Project Name]
	├── node_modules/                  # node依赖文件
	├── output/                        # 生产环境最终打包并压缩后的资源文件夹
	├── src/                           # 源码目录
	│	├── assets/                    # 开发环境资源打包文件夹
	│	├── css/                       # css资源
	│	│	├── plugin.**.css          # 插件样式
	│	│   ├── page.**.css            # 页面样式
	│	│   └── **.css                 # 其他样式
	│	├── images/                    # 图片资源
	│	│   ├── sprit.png              # 雪碧图
	│	│   └── **.**                  # 其他图
	│	├── js/                        # js资源
	│	│   ├── components/            # 组件
	│	│   │   ├── _commons/          # 公共组件
	│	│   │   │   ├── **/            # 公共组件包
	│	│   │   │   │   ├── index.js   # 组件业务逻辑
	│	│   │   │   │   ├── view.js    # 组件视图逻辑
	│	│   │   │   │   └── view.less  # 组件视图样式
	│	│   │   │   └── index.js       # 组件模块化CMD规范主文件
	│	│   │   └── **/                # 常规组件包
	│	│   │       ├── index.js       # 组件业务逻辑
	│	│   │       ├── view.js        # 组件视图逻辑
	│	│   │       └── view.less      # 组件视图样式
	│	│   ├── pages/                 # 页面逻辑
	│	│   ├── plugins/               # 第三方插件
	│	│   └── vender/                # 如jQuery、Zepto、React等
	│	├── less/                      # less资源
	│	│   ├── _commons/              # less公共样式资源文件夹
	│	│   │   ├── _variables.less    # less公共变量
	│	│   │   ├── animate.less       # less公共动画
	│	│   │   ├── common.less        # less公共样式
	│	│   │   └── reset.less         # less公共重置样式
	│	│   ├── _mixins/               # less公共函数资源文件夹
	│	│   │   └── **.less            # less公共函数资源文件
	│	│   ├── _mixins.less           # less公共函数引用文件
	│	│   ├── page.less              # 页面样式
	│	│   └── **.less                # 其他样式
	│	└── index.html                 # 页面入口
	├──	.gitignore                     # 忽略提交文件
	├── gulpfile.js                    # gulp任务配置 
	├── package.json                   # 项目配置
	└── README.md                      # 项目说明
```

---------------------------------------------------------------------

## 编码规范

* 所有编码中的命名，采用常用的驼峰命名法
* 所有编码中必须加入文件注释、必要的代码块注释、以及修改更新记录注释

---------------------------------------------------------------------

## 组件规范

* 组件命名
  组件以其功能来进行命名，比如弹出框，命名为popup。

* 组件结构

```
	[组件名]/              # 组件文件夹
	    ├── index.js       # 组件业务逻辑
	    ├── view.js        # 组件视图逻辑
	    └── view.less      # 组件视图样式
```

* 组件定义

```
	define('组件名', function(options){ /* do something */ });
```

* 引用组件

```
	// 引用单个组件，comp为当前组件返回对象
	var comp = require('组件名', /*如果组件需要参数，从这里传入*/);
	// 引用多个组件，comps为多个组件返回对象数组集合
	var comps = require(['组件1', '组件2', ...], [/*对应每个组件的参数数组集合，如果组件需要参数，从这里传入*/]);
```

---------------------------------------------------------------------

### 一个完整的通用组件逻辑代码结构(所有的组件逻辑都在这里面)

```
	/**
	 * test
	 * @authors AndyPan (pye-mail@163.com)
	 * @date    2017-10-19 11:37:38
	 */

	'use strict';

	define('test', function(options){

	    var self = this;
		
		//组件默认参数或组件内部全局变量
		var defaults = {};
		//默认参数与自定义参数合并后的参数对象
    	var setting = $.extend(true, {}, defaults, options || {});

	    //引用视图
	    var views = require('view-test');
		
		//组件初始化
	    var install = function(){
	        bindEvent();
	        //do something
	    };
		
		//组件事件绑定
	    var bindEvent = function(){};

		//提供外部访问的方法
	    self.[外部访问函数] = function(){};

	    install();
		
		//组件方法输出
	    module.exports = self;
	    
	});
```

---------------------------------------------------------------------

### 一个完整的通用组件视图代码结构(所有的DOM操作都在这里面)


```
	/**
	 * view-test
	 * @authors AndyPan (pye-mail@163.com)
	 * @date    2017-10-19 11:40:46
	 */

	'use strict';

	define('view-test', function(){

		//组件视图输出
	    module.exports = {
	    	//组件所需要的视图目标元素
	    	target: $('selector'),
	    	//组件所需要的视图类名集合对象
	    	className: {},
	    	//组件所需要的html字符串集合对象
	    	html: {},
	    	//组件所需要的html渲染函数
	    	render: function(){}
	    };
	    
	});
```

## 使用说明
### 开始

```
npm install || yarn install
```

开发（支持传递参数）：

```
gulp dev
```

生产（支持传递参数）：

```
gulp build
```

生产（支持传递参数，支持tinypng压缩方式）：

```
gulp build-min
```


提取文字：

```
gulp fonts --text=TEXT
```
TEXT是你需要提取的中文字符。

### 参数

#### 仅build时生效：

`--178` : 添加178通导通底。

`--tgbus` : 添加tgbus通导通底。

`--ptbus` : 添加ptbus通导通底。

`--v` : 添加时间戳版本号。

#### build与dev时都生效：

`--rem` ：不传递参数时，默认设计稿为750px。传递参数形式为：`--rem=1280`。

## 目录说明

./src: 开发目录
./output: 暂存目录
./dist：生产目录
./.gulp/tinypng：压缩图片缓存目录，只有使用`gulp build-min`时生成。


## CMS相关

### 178 相关后台

####【178】发布系统
链接：

```
fabu.178.com/index.jsp
```

HOST：

```
//178后台host
122.13.78.218 fabu.178.com
122.13.78.218 acg.178.com
122.13.78.218 www.178.com

//发布即可见hosts
122.13.78.218 news.178.com
122.13.78.218 xin.178.com
122.13.78.218 shouyou.178.com
122.13.78.218 chanye.178.com
122.13.78.218 img.178.com
122.13.78.218 bns.178.com
123.196.115.41 mxd2.178.com
```

账号：

```
//一层
账号：cms178
密码：a3bdfba4b1749ff5f0fd1ba3068a343a
//二层
账号：尚丁丁
密码：shang5094190
```

####【178】资源服务器

```
地址：fabu.178.com
端口：21
用户名：cimg_r
密码：cimg)(3&64
```

####【178】活动支持系统
链接：

```
http://hdsupport.178.com/console/activities
```

### PTBUS相关后台

#### 【PTBUS】织梦CMS

链接：

```
http://www.ptbus.com:17732/wonderful/index.php
```

HOST：

```
42.62.52.236  www.ptbus.com
```

账号：

```
//一层
账号: psvr
密码: pokemon

//二层
账号：huangchao
密码：chao14102
```

### TGBUS相关后台

#### 【TGBUS】pc&shouji

HOST：

```
61.152.242.26 shouji.tgbus.com
61.152.242.26 pc.tgbus.com
61.152.242.26 webftp.admin.tgbus.com
61.152.242.1 www.tgbus.com
61.152.242.26 mmm.tgbus.com 
```

链接：

```
//pc后台
http://pc.tgbus.com:10010/pcgame/
//PS4/XB1/3DS等
http://www.tgbus.com:10010/admin/Admin_Index.asp
```

账号：

```
//一层
账号：wangyichun 
密码：123456789

//二层
账号：yangmei 
密码：123456
```

链接：

```
//shouji后台
http://shouji.tgbus.com:10010/fly2013/
```

账号：

```
//一层
账号：zengfeng 
密码：285819zf

//二层
账号：huangchao 
密码：chao14102
```

#### 【TGBUS】动易后台


HOST：

```
61.152.242.26 webftp.admin.tgbus.com
61.152.242.26 zt.tgbus.com
```

链接：

```
//后台
http://zt.tgbus.com/Admin/Index.aspx
```

账号：

```
//一层
账号：shiyang
密码：sy646355008

//二层
账号：shiyang1
密码：61yongyuanaini
验证码：121
```

链接：

```
//FTP后台
http://webftp.admin.tgbus.com/show/
```

账号：

```
//一层
账号：shiyang
密码：sy646355008

//二层
账号: chenxi 
密码: pc@tgbus
```

#### 【TGBUS】织梦后台

链接：

```
//后台
http://mmo2.tgbus.com:10010/admin/
```

账号：

```
//一层
账号：jiangli
密码：memeda

//二层
账号：huangchao
密码：chao14102
```

### 星游CMS

#### 星游CMS1.0

HOST：

```
10.3.246.84 test-cms.stargame.com
10.3.246.84 v2-cms.stargame.com
10.3.246.84 www.a9vgtest.com
10.3.246.84 img.a9vgtest.com
10.3.246.84 admin-sso.stargame.com
```

链接：

```
http://cms.stargame.com/my_channel
```

账号：

```
账号：zhujiang@stargame.com
密码：ST!@#123456
```


#### 星游CMS2.0

HOST：

```
116.31.103.149 admin.stargame.com
```

链接：

```
admin.stargame.com
```

账号：

```
//一层
账号：admin
密码：Sw=p5pusaHu?

//二层
账号：xiangwanzhi@stargame.com
密码：z123456x789?Z
```


