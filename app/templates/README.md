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
	├── dist/                          # 最终打包并压缩后的资源文件夹
	├── node_modules/                  # node依赖文件
	├── output/                        # 生产环境最终打包并压缩后的资源文件夹
	├── src/                           # 源码目录
	│	├── assets/                    # 开发环境资源打包文件夹
	│	├── css/                       # css资源
	│	│	├── plugin.**.css          # 插件样式
	│	│   ├── page.**.css            # 页面样式
	│	│   └── **.css                 # 其他样式
	│	├── html/                      # html资源
	│	│   └── **.html                # html文件
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
	│	├── sass/                      # sass资源
	│	│   ├── _commons/              # sass公共样式资源文件夹
	│	│   │   ├── _variables.scss    # sass公共变量
	│	│   │   ├── animate.scss       # sass公共动画
	│	│   │   ├── common.scss        # sass公共样式
	│	│   │   └── reset.scss         # sass公共重置样式
	│	│   ├── _mixins/               # sass公共函数资源文件夹
	│	│   │   └── **.scss            # sass公共函数资源文件
	│	│   ├── _mixins.scss           # sass公共函数引用文件
	│	│   ├── page.scss              # 页面样式
	│	│   └── **.scss                # 其他样式
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

`--v` : 添加时间戳版本号。

#### build与dev时都生效：

`--rem` ：不传递参数时，默认设计稿为750px。传递参数形式为：`--rem=1280`。

## 目录说明

./src: 开发目录
./output: 暂存目录
./dist：生产目录
./.gulp/tinypng：压缩图片缓存目录，只有使用`gulp build-min`时生成。



