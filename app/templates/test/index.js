/**
 * 组件化 Test - 组件业务逻辑JS
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017年10月23日14:00:28
 */

'use strict';

define('test', function(options){

    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});

    //视图引用
    var views = require('view-test');
	//弹出框
    var popup = require('popup');
    //验证
    var validate = require('validate');
    //异步
    var async = require('async');


    //组件初始化
    var install = function(){
        //(如果组价有操作事件)绑定组件事件
        bindEvent();
        //do something
    };

    //组件事件绑定
    var bindEvent = function(){
        //绑定按钮点击事件
        views.testBtn.click(function(){
            popup.openSubmit(function(){
                var result = validate.verify({
                    //指定验证表单
                    form: popup.views.popupMainSubmit,
                    //回调消息
                    callBack: function(msg){ alert(msg); },
                    //验证通过，并且获取表单数据后，是否清空表单
                    flag: true
                });
                submit(result);

                return false;
            });
        });
    };

    //提交数据
    var submit = function(data){
        if(data){
            console.info(data);
            async.ajax({
                url: '',
                data: data,
                dataType: 'jsonp'
            }).then(function(res){
                console.info('then');
            }).catch(function(res){
                console.info('catch');
                console.info(res);
            }).finally(function(res){
                console.info('finally');
            });
        }
    };

    //初始化执行
    install();
    
    
    //组件方法输出
    module.exports = self;
    
});

