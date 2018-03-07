/*
* AndyPan
* 2016-7-7 03:33:37
* 更改目录结构详见 ##### 目录结构
* 2016-7-7 02:31:05
* 更新src/js/page下的js不合并，需手动引入
*/


# Generator-SimplePage

SimplePage 脚手架。

### 安装软件
- Node.js：v5.0+
- yoman

### 拷贝项目模板
```
$ git clone https://github.com/AndyPan2016/simple-page.git
```

### 安装依赖模块

``` bash
$ npm install
```

### 链接项目

```
$ npm link
```

###开始项目
在新项目文件下运行yo
选择 Simple Page
根据提示输入作者姓名，邮箱等

### 本地开发环境

- 启动

    ```
    npm run dev 或 gulp dev
    ```
    完成后打开浏览器输入http://localhost:8000/或http://127.0.0.1:8000/即可

    该命令支持参数`--rem`，当不传递参数值时，默认设计稿宽度为750px。传递参数值时，使用传递的值`--rem=1280`

### 业务开发

##### 目录结构

``` js
.
├── gulpfile.js                    # gulp任务配置 
├── package.json                   # 项目配置
├── README.md                      # 项目说明
├──	.gitignore                     # 忽略提交文件
├── node_modules                   # node依赖文件
└── src                            # 源码目录
    ├── index.html                 # 页面入口
    ├── css/                       # css资源
 	│	├── plugin.**.css          # 插件样式
    │   ├── page.**.css            # 页面样式
    │   └── **.css                 # 其他样式
    ├── images/                    # 图片资源
 	│	├── plugin.xxx.png         # 插件图
    │   ├── sprit.png         	   # 雪碧图
    │   └── **.**  				   # 其他图
    ├── js                         # js资源
    │   ├── vender/                # 如jQuery、Zepto、React等
    │   ├── pages/                 # 页面逻辑
    │   └── plugins/               # 第三方插件
    └── less/                      # less资源
		 ├── plugin.**.less        # 插件样式
         ├── page.**.less          # 页面样式
         └── **.less               # 其他样式
```

### 编译

默认编译：

```
npm run build 或 gulp build
```

tinypng图片压缩编译：

```
gulp build-min
```

### 提取汉字

```
gulp fonts --text=TEXT
```
TEXT指代你所需要提取的汉字。

### 参数

#### 仅build时生效：

`--178` : 添加178通导通底。

`--tgbus` : 添加tgbus通导通底。

`--ptbus` : 添加ptbus通导通底。

`--v` : 添加时间戳版本号。

#### build与dev时都生效：

`--rem` ：不传递参数时，默认设计稿为750px。传递参数形式为：`--rem=1280`。

### 命令说明
其他具体说明参阅脚手架模板的README.md
```
$ gulp help
```

### 插件说明
以下为脚手架所用插件功能说明，具体实践可以参考模板下的gulpfile.js文件。

- `gulp-rev`：该脚手架为资源添加md5版本号。
- `gulp-rev-collector`：该脚手架为资源添加md5版本号。
- `gulp-autoprefixer`：CSS兼容性前缀添加（未启用）。
- `gulp-less`：LESS文件编译。
- `gulp-uglify`：压缩JS文件。
- `gulp-concat`：合并JS文件。
- `gulp-clean-css`：CSS压缩。
- `gulp-clean`：文件/文件夹删除。
- `gulp-sequence`：GULP命令执行序列。
- `gulp-replace`：字符替换（其实就是正则的replace）。
- `gulp-htmlmin`：HTML压缩。
- `browser-sync`：建立本地WEB服务器，实时预览。
- `gulp-removelogs`：删除console相关代码。
- `gulp-babel`：ES6编译。
- `gulp-notify`：显示报错信息。
- `gulp-plumber`：防止错误中断GULP。
- `gulp-tinypng-plugin`：图片压缩
- `gulp-cheerio`：像JQ一样操作HTML文档
- `yargs`：获取用户传入的参数
- `gulp-px2rem-plugin`：px转rem。
- `fontmin`：中文文字提取。
- `gulp-rename`：修改名字


### 更新日志

#### v2.4.0
- 增加Swiper4选择
- 支持webp图片生成
- 其他修改

#### v2.3.4
- 增加loading及poll组件

#### v2.3.2
- 修复改变结构后通导通底无法添加的BUG
- 增加模块是否build的判断

#### v2.3.0
- 增加文件结构
- 增加组件

#### v2.2.0
- 修改部分正则
- 修改部分意外的BUG
- 增加M端微信分享代码
- 增加文档说明

#### v2.0.0
- 修改大部分Gulp插件
- 增加ES6支持
