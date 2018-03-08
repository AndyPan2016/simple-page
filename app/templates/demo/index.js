/**
 * 组件化 DEMO - 组件业务逻辑JS
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017年10月23日14:00:28
 */

'use strict';

define('CompDemo', function(options){

    //视图引用
    var views = require('ViewCompDemo');
    //事件委托
    var delegates = require('delegates');
    //其他组件引用
    //var other = require('other');

    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {}, fn = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = jQuery.extend(true, {}, defaults, options || {});
    //事件委托
    delegates.call(self, fn);

    //组件初始化
    var install = function(){
        //初始化状态
        initState();
        //(如果组件有操作事件)绑定组件事件
        bindEvent();
        //组件render事件
        fn.delegates.fire('render', [], self, true);
        //do something
    };

    //初始化参数状态
    var initState = function(){
        //重置view中的target
        views.target = $(setting.target || views.target);
    };

    //组件事件绑定
    var bindEvent = function(){
        //do something
    };

    //提供外部访问的方法
    self['外部访问函数名'] = function(){};

    //初始化执行
    install();
    
    //组件方法输出
    module.exports = self;
    
});

