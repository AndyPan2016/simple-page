'use strict';
const util = require('util');
const path = require('path');
const generator = require('abc-generator');
const fs = require('fs');
const process = require('child_process');

module.exports = Gallery;

function Gallery(args, options, config) {
    generator.UIBase.apply(this, arguments);
    console.log("模块初始化完成！");
    if (fs.existsSync('package.json')) {
        this.packJSON = JSON.parse(this.readFileAsString('package.json'));
    } else {
        this.packJSON = {}
    }

}

util.inherits(Gallery, generator.UIBase);

let prt = Gallery.prototype;

prt.askAuthor = function(){
    let cb = this.async();

    let project = {
        terminal: 'pc',  //设备
        swiper : '3',    //默认Swiper版本
        install : 'n',   //是否自动安装依赖
        company : 'd'     //M端解决方案
    };

    /*,{
        name: 'slides',
        message: '使用什么幻灯片插件Swiper或者Unslider？（s/u）',
        default: project.slides
    }*/
    
    console.log('请选择配置');
    let prompts = [{
        name: 'terminal',
        message: '项目应用于什么终端？（pc/m）',
        default: project.terminal
    },{
        name: 'install',
        message: '初始化完成是否进行依赖安装(不安装/yarn/cnpm方式)？（n/y/c）',
        default: project.install
    },
    /*{
        name: 'swiper',
        message: '使用什么版本的Swiper？（3/4）',
        default: project.swiper
    }*/
    ];

    let prompts_m = [{
        name: 'company',
        message: '使用dpi缩放还是rem？（d/r）',
        default: project.company
    }];
    
    this.prompt(prompts, function (props) {
        this.terminal = props.terminal;    
        this.install = props.install;
        if(this.terminal === 'm'){
            this.prompt(prompts_m, function(props_m){
                this.company = props_m.company;
                cb()
            }.bind(this))
        }else {
            cb()
        }
    }.bind(this));
};

//创建文件夹
prt.copyFile = function () {
    this.mkdir('src');
    this.mkdir('src/css');
    //this.mkdir('src/source');
    this.mkdir('src/css/plugins');
    this.mkdir('src/less');
    this.mkdir('src/less/_commons');
    this.mkdir('src/images');
    //this.mkdir('src/resources');
    this.mkdir('src/js');
    this.mkdir('src/js/page');
    this.mkdir('src/js/vendor');
    this.mkdir('src/js/plugins');
    this.mkdir('src/js/components');
    this.copy('README.md', 'README.md');
    this.copy('.gitignore', '.gitignore');
    this.copy('_mixins.less', 'src/less/_mixins.less');
    this.copy('_variables.less', 'src/less/_commons/_variables.less');
    this.copy('animate.less', 'src/less/_commons/animate.less');
    this.copy('common.less', 'src/less/_commons/common.less');
    this.copy('page.less', 'src/less/page.less');
    this.copy('gulpfile.js', 'gulpfile.js');
    if(this.swiper === '3') {
        this.copy('swiper.js', 'src/js/vendor/plug-swiper.js');
    }else {
        this.copy('swiper4.js', 'src/js/vendor/plug-swiper.js');
    }
    this.copy('main.js', 'src/js/page/main.js');
    this.copy('package.json', 'package.json');

    this.mkdir('src/js/components/_commons');
    this.copy('_commons/index.js', 'src/js/components/_commons/index.js');

    this.mkdir('src/js/components/_commons/async');
    this.copy('_commons/async/index.js', 'src/js/components/_commons/async/index.js');

    this.mkdir('src/js/components/_commons/delegates');
    this.copy('_commons/delegates/index.js', 'src/js/components/_commons/delegates/index.js');

    //组件案例
    this.mkdir('src/js/components/demo');
    //复制DEMO代码到项目
    this.copy('demo/index.js', 'src/js/components/demo/index.js');
    this.copy('demo/view.js', 'src/js/components/demo/view.js');
    this.copy('demo/view.less', 'src/js/components/demo/view.less');


    if(this.terminal === 'pc'){
        this.copy('index.html', 'src/index.html');
        this.copy('pc/jquery-2.2.4.js', 'src/js/vendor/rely-jquery.js');
        this.copy('pc/reset.less', 'src/less/_commons/reset.less');
    }else {
        this.copy('mobile/zepto.js', 'src/js/vendor/rely-zepto.js');
        this.copy('mobile/normalize.less', 'src/less/_commons/normalize.less');
        if(this.company === 'd'){
            this.copy('mobile/index-dpi.html', 'src/index.html');
        }else {
            this.copy('mobile/index-rem.html', 'src/index.html');
        }
    }
};

prt.begin = function () {
    console.log("【初始化完成，请查看README.md了解全部功能及命令。】");

    if(this.install === 'y' || this.install === 'c'){
        let command = null;

        switch (this.install) {
            case 'y' :
                command = 'yarn install';
                break;
            case 'c' :
                command = 'cnpm install';
                break;
        }

        console.log('执行'+ command +'命令，依赖安装中，请稍侯...');

        process.exec(command, function (err) {
            if (err !== null) {
                console.log('exec error: ' + error);
                return false;
            }
            console.log('完成安装！请Ctrl+C退出！')
        })
    }
};