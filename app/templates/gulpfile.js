
const fs = require('fs');
// 引入 gulp及组件
const gulp = require('gulp');
//静态资源缓存解决
const rev = require('gulp-rev');
//资源文件加时间戳
const revCollector  = require('gulp-rev-collector');
//const autoprefixer = require('gulp-autoprefixer');
//less编译
const less = require('gulp-less');
//压缩JS文件
const uglify = require('gulp-uglify');
//合并JS文件
const concat = require('gulp-concat');
//CSS压缩
const cleanCSS = require('gulp-clean-css');
//文件删除
const clean = require('gulp-clean');
//命令执行序列
const gulpSequence = require('gulp-sequence');
//字符替换
const replace = require('gulp-replace');
//HTML压缩
const htmlmin = require('gulp-htmlmin');
//开启服务器，实时预览
const browserSync = require('browser-sync').create();
//自动刷新
const reload = browserSync.reload;
//删除控制台日志
const removeLogs = require('gulp-removelogs');
//ES6编辑
const babel = require("gulp-babel");
//增加less编译异常提醒
const notify = require('gulp-notify');
//防止错误中断GULP
const plumber = require('gulp-plumber');
//图片压缩
const imageMin = require('gulp-tinypng-plugin');
//像JQ一样操作HTML文档
const cheerio = require('gulp-cheerio');
//获取命令
const argv = require('yargs').argv;
//px转rem
const px2rem = require('gulp-px2rem-plugin');
//文字提取
const fontmin = require('fontmin');
//修改名字
const rename = require('gulp-rename');
//图片WEBP转换
const webp = require('gulp-webp');
//CSS添加webp地址
const webpcss = require("gulp-webpcss");


const path = {
    src   : "src/",
    css   : "src/css/",
    js    : "src/js/",
    img   : "src/images/",
    fonts : 'src/fonts',
    source: 'src/source/',
    build : "build",
    less  : 'src/less'
};


//全平台通导通底
const _currency = {
    '178': {
        nav: 'http://www.178.com/s/js/nav.js',
        footer: 'http://www.178.com/s/js/footer.js'
    },

    'tgbus': {
        style: 'http://ol.tgbus.com/css/201705/css/header.css',
        footer: 'http://www.tgbus.com/assets/tgbus/v1/js/tgbus_hf.js'
    },

    'ptbus': {
        nav: 'http://static.ptbus.com/newhome/head/ptbus_header.js?style=white&width=1200',
        footer: 'http://www.ptbus.com/static/common/footer.js'
    }
};
//可视化编辑
const fileEdit = '\n<script src="http://www.stargame.com/js/FileEdit.js?v2.4.2" type="text/javascript"></script>\n';


//文字提取，单独调用
gulp.task('fonts', () => {
    let text = argv.text;

function getFonts(text) {
    let font = new fontmin();
    font.src(path.source + '*.ttf') // 字体路径
        .use(fontmin.glyph({           // 字型提取插件
            text: text              // 所需文字
        }))
        .use(rename('fonts.ttf'))
        .use(fontmin.ttf2eot())
        .use(fontmin.ttf2woff())
        .use(fontmin.ttf2svg())
        .use(fontmin.css())
        .dest(path.fonts);

    // 执行
    font.run((err, files, stream) => {
        if (err) {
            console.error("字体提取失败，错误信息：" + err);
        } else {
            let css = fs.readFileSync(path.fonts + "/fonts.css","utf-8");
    css = css.replace(/url\(("||')/g, 'url("../fonts/');

    fs.writeFile(path.src + '/less/fonts.less', css, {flag: 'w'}, function (err) {
        if(err) {
            console.error(err);
        } else {
            //删除CSS源文件
            gulp.src([path.fonts + '/*.css'], {read: false})
                .pipe(clean());
        }
    });

    //复制Font位置
    gulp.src(['src/fonts/**.ttf',
        'src/fonts/**.eot',
        'src/fonts/**.svg',
        'src/fonts/**.woff'])
        .pipe(gulp.dest('src/assets/fonts'));

    console.log('- 字体提取成功!，字体放在文件放在' + path.fonts + '下，样式放在src/less目录下。');
}
});
}

if (text && text.length > 0) {
    getFonts(text);
} else {
    console.log("完整命令：gulp fonts --text=这里输入需要提取的文字")
}
});

//添加信息戳及通导通底
gulp.task('addInfo', () => {
    return gulp.src(['dist/*.html'])
        .pipe(cheerio({
            run: ($) => {
            let date = new Date();
let time = date.getFullYear() + '年'
    + parseInt(date.getMonth() + 1) + '月'
    + date.getDate() + '日';
let dev = argv.dev || "**";  //页面制作
let des = argv.des || "**";  //页面设计

//数据暂存
let platform = null;

//页面结构
let $head = $('head');
let $body = $('body');

//需要添加到页面的结构
let $style = $('<link rel="stylesheet" type="text/css">');
let $nav = $('<script></script>');
let $footer = $('<script></script>');
let $info = '\n<!-- 设计：' + des + ' 制作：' + dev + ' 时间：' + time + '-->\n';

if (argv['178']) {
    platform = _currency['178'];
} else if (argv['tgbus']) {
    platform = _currency['tgbus'];
} else if (argv['ptbus']) {
    platform = _currency['ptbus'];
}

if (platform) {
    if (platform.style) {
        $style.attr("href", platform.style);
        $head.append('\n' + $style + '\n');
    }
    $nav.attr('src', platform.nav);
    $footer.attr('src', platform.footer);

    $body.prepend('\n' + $nav + '\n');
    $body.append('\n' + $footer + '\n');
}

if (argv['v']) {
    let $link = $("link"),
        $script = $("script"),
        _src = null,
        $item = null;

    time = '?t=' + date.getTime();

    $link.each(function (index, item) {
        $item = $(item);
        _src = $item.attr("href");
        if (!_src || /^http/i.test(_src)) return true;
        _src = _src.replace(/(\?.*)/, '') + time;
        $item.attr("href", _src);
    });

    $script.each(function (index, item) {
        $item = $(item);
        _src = $item.attr("src");
        if (!_src || /^http/i.test(_src)) return true;
        _src = _src.replace(/(\?.*)/, '') + time;
        $item.attr("src", _src);
    })
}

//添加信息戳
$head.append($info);

//添加可视化编辑代码
$body.append(fileEdit);
},
parserOptions: {
    decodeEntities: false
}
}))
.pipe(gulp.dest('dist/'));
});

//图片压缩
gulp.task('imgMin', () => {
    return gulp.src(path.img + "*.*")
        .pipe(imageMin({
            key : ['cOt4elp-3gn4b0P1t7RCqokIjk6MBL5z', 'kmtaulr7PAPnfxI4mf-SiLhybxjRtqwL'],
            cache : true
        }))
        .pipe(gulp.dest('dist/assets/images/'))
});

//文件夹清除
gulp.task('clean', () => {
    return gulp.src(['dist/','output/'])
        .pipe(clean());
});

//JS合并
gulp.task('jsconcat',() => {
    return gulp.src(['src/js/plugins/*.js'])
    //合并后的文件名
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('output/'));
});

gulp.task('jsconcat-plugin',() => {
    return gulp.src([
        'src/js/vendor/jquery-2.2.4.js',
        'src/js/vendor/swiper-3.3.1.jquery.min.js',
        'src/js/vendor/rely-*.js',
        'src/js/vendor/plug-*.js',
        'src/js/vendor/*.js'
    ])
    //合并后的文件名
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('output/'));
});

gulp.task('jsconcat-dev',() => {
    return gulp.src([
        'src/js/plugins/*.js',
        'src/js/core/*.js'
    ])
    //合并后的文件名
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('src/assets/js'));
});

gulp.task('jsconcat-plugin-dev',() => {
    return gulp.src([
        'src/js/vendor/jquery-2.2.4.js',
        'src/js/vendor/swiper-3.3.1.jquery.min.js',
        'src/js/vendor/rely-*.js',
        'src/js/vendor/plug-*.js',
        'src/js/vendor/*.js'
    ])
    //合并后的文件名
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('src/assets/js'));
});

//module模块组件js合并
gulp.task('jsconcat-components',() => {
    let data = '';
let list = fs.readdirSync(path.src);

list.forEach(function (item) {
    if(/.+\.html/i.test(item)) {
        data += fs.readFileSync(path.src + item).toString().match(/<script.+<\/script>/ig).join();
    }
});

if(/assets\/js\/components.js/i.test(data.toString())) {
    return gulp.src([
        'src/js/components/_commons/index.js',
        'src/js/components/_commons/delegates/*.js',
        'src/js/components/_commons/**/*.js',
        'src/js/components/**/*.js'
    ])
    //合并后的文件名
        .pipe(concat('components.js'))
        .pipe(gulp.dest('output/'));
}
});

gulp.task('jsconcat-components-dev', () => {
    return gulp.src([
        'src/js/components/_commons/index.js',
        'src/js/components/_commons/delegates/*.js',
        'src/js/components/_commons/**/*.js',
        'src/js/components/**/*.js'
    ])
    //合并后的文件名
        .pipe(concat('components.js'))
        .pipe(gulp.dest('src/assets/js'));
});

//JS压缩
gulp.task('jsmin',() => {
    return gulp.src('output/*.js')
        .pipe(removeLogs())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('output/'))
});

//CSS压缩
gulp.task('cssmin', () => {
    return gulp.src('output/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(webpcss({
            baseClass:'.webp',
            replace_from:/\.(png|jpg|jpeg)/,
            replace_to:'.webp',
        }))
        .pipe(gulp.dest('output/'))
});

//CSS合并
gulp.task('cssconcat',() => {
    let val = gulp.src(['src/css/*.css', 'src/css/**/*.css'])
        .pipe(concat('base.css'));
if (argv['rem']) {
    val.pipe(px2rem({
        'width_design': argv['rem'] === true ? 750 : argv['rem'],
        'valid_num': 2,
        'pieces': 10,
        'ignore_px': [1, 2],
        'ignore_selector': ['@media']
    }))
}
return val.pipe(gulp.dest('output/'));
});

//组件LESS合并
gulp.task('less-components-concat',() => {
    return gulp.src(['src/less/page.less', 'src/js/components/_common/**/*.less', 'src/js/components/*.less', 'src/js/components/**/*.less'])
        .pipe(concat('_page.less'))//合并后的文件名
        .pipe(gulp.dest('src/less/'));
});

gulp.task('cssconcat-plugin',() => {
    let val = gulp.src('src/css/plugins/*.css')
        .pipe(concat('plugin.css'));
if (argv['rem']) {
    val.pipe(px2rem({
        'width_design': argv['rem'] === true ? 750 : argv['rem'],
        'valid_num': 2,
        'pieces': 10,
        'ignore_px': [1, 2],
        'ignore_selector': ['@media']
    }))
}
return val.pipe(gulp.dest('output/'));
});

gulp.task('cssconcat-dev',() => {
    let val = gulp.src(['src/css/*.css', 'src/css/**/*.css'])
        .pipe(concat('base.css'));
if (argv['rem']) {
    val.pipe(px2rem({
        'width_design': argv['rem'] === true ? 750 : argv['rem'],
        'valid_num': 2,
        'pieces': 10,
        'ignore_px': [1, 2],
        'ignore_selector': ['@media']
    }))
}
return val.pipe(gulp.dest('src/assets/css'));
});

gulp.task('cssconcat-dev-plugin',() => {
    let val = gulp.src('src/css/plugins/*.css')
        .pipe(concat('plugin.css'));
if (argv['rem']) {
    val.pipe(px2rem({
        'width_design': argv['rem'] === true ? 750 : argv['rem'],
        'valid_num': 4,
        'pieces': 10,
        'ignore_px': [1, 2],
        'ignore_selector': ['@media']
    }))
}
return val.pipe(gulp.dest('src/assets/css'));
});

//CSS添加版本号
gulp.task('cssRev', () => {
    if (argv['v']) {
    return gulp.src(['output/*.css', 'output/*.js'])
        .pipe(gulp.dest('output/'))
        .pipe(gulp.dest('output/assets'));
} else {
    return gulp.src(['output/*.css', 'output/*.js'])
        .pipe(gulp.dest('output/'))
        .pipe(rev())
        .pipe(gulp.dest('output/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('output/rev'));
}
});

//移动JS
gulp.task('movejs', () =>{
    return gulp.src('output/assets/*.js')
        .pipe(gulp.dest('dist/assets/js/'));
});

//移动CSS
gulp.task('movecss', () =>{
    return gulp.src('output/assets/*.css')
        .pipe(gulp.dest('dist/assets/css/'));
});

//移动字体
gulp.task('movefonts', () => {
    return gulp.src('src/fonts/**.*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

//HTML压缩
gulp.task('htmlmin', () => {
    const options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
return gulp.src('dist/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/'));
});

gulp.task('rev', () => {
    return gulp.src(['output/rev/*.json','src/*.html'])
        .pipe( revCollector({}))
        .pipe( gulp.dest('dist/'));
});

gulp.task('less', () => {
    return gulp.src(['src/less/_page.less', 'src/less/_commons/*.less', 'src/less/_modules/*.less'])
    //错误提示
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});
gulp.task('lesses', () => {
    return gulp.src(['src/less/nav.less', 'src/less/footer.less', 'src/less/friendlylink.less'])
    //错误提示
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});


gulp.task('dist', () => {
    return gulp.src([
        'src/images/**/*.*'
    ])
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('distWebp', () => {
    return gulp.src(['src/images/**/*.*'])
        .pipe(webp())
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('dist-dev', () => {
    return gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('src/assets/images'));
});

gulp.task('dist-js-dev', () => {
    return gulp.src('src/js/page/*.*')
        .pipe(gulp.dest('src/assets/js/page/'));
});

gulp.task('move-page-js', () => {
    return gulp.src('src/js/page/*.*')
        .pipe(removeLogs())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/page/'))
});

gulp.task('replace', () =>{
    return gulp.src('dist/*.html')
        .pipe(replace('src="images/','src="assets/images/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('replace-sec', () =>{
    return gulp.src('dist/*.html')
        .pipe(replace('src="./images/','src="assets/images/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('distres', () => {
    return gulp.src('src/resources/**.*')
        .pipe(gulp.dest('dist/resources'))
});

/*gulp.task('AutoFx', () => {
    return gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});*/

gulp.task('connectDev', () => {
    browserSync.init({
    server: "src",   //服务器根目录
    port: 8000
});
gulp.watch(['src/images/**/*.*',
    'src/js/**/*.*',
    'src/js/components/_commons/**/*.*',
    'src/js/components/**/*.*',
    'src/less/**/*.*',
    'src/resources/**/*.*',
    'src/*.html'
],['dev-re', reload]);
});

gulp.task('connectDev-less', () => {
    browserSync.init({
    server: "src",   //服务器根目录
    port: 8000
});
gulp.watch(['src/images/**/*.*',
    'src/js/**/*.*',
    'src/js/components/_commons/**/*.*',
    'src/js/components/**/*.*',
    'src/less/**/*.*',
    'src/resources/**/*.*',
    'src/*.html'
],['dev-re-less', reload]);
});

//输出生产环境文件
gulp.task('build', gulpSequence('clean', 'jsconcat', 'jsconcat-plugin', 'jsmin', 'cssconcat', 'cssconcat-plugin', 'cssmin', 'cssRev', 'movejs', 'movecss', ['dist', 'distWebp', 'distres', 'rev'], 'htmlmin', 'replace', 'replace-sec', 'move-page-js', 'movefonts' ,'addInfo'));

//使用图片压缩
gulp.task('build-min', gulpSequence('clean', ['jsconcat', 'jsconcat-plugin', 'cssconcat', 'cssconcat-plugin', 'imgMin', 'distWebp'] , ['jsmin', 'cssmin', 'htmlmin'], 'cssRev', ['movejs', 'movecss',  'move-page-js', 'movefonts'], ['distres', 'rev'],  'replace', 'replace-sec' ,'addInfo'));


gulp.task('dev-re',function(callback){
    gulpSequence('less-components-concat', 'less', 'lesses','jsconcat-dev', 'jsconcat-components-dev','jsconcat-plugin','cssconcat-dev','cssconcat-dev-plugin','dist-dev','dist-js-dev')(callback);
});

gulp.task('dev-re-less',function(callback){
    gulpSequence('less-components-concat', 'less', 'lesses','jsconcat-dev', 'jsconcat-components-dev','jsconcat-plugin','cssconcat-dev','dist-dev')(callback);
});

gulp.task('default', ['build']);

//开发环境
gulp.task('dev', gulpSequence('connectDev','jsconcat-dev','jsconcat-plugin-dev', 'jsconcat-components-dev', 'less-components-concat','cssconcat-dev','dist-dev'));
gulp.task('dev-less', gulpSequence('connectDev-less','less','jsconcat-dev','jsconcat-plugin-dev', 'jsconcat-components-dev', 'less-components-concat','cssconcat-dev','dist-dev'));