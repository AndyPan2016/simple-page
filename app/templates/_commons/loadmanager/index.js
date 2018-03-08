/**
 * iframe和异步加载管理
 * @authors 潘毅 (pye-mail@163.com)
 * @date    18-03-08 14:22:15
 */

define('CompLoadManager', function(options){

    //视图引用
    var views = require('ViewCompLoadManager');
    //事件委托
    var delegates = require('delegates');
    //异步请求
    var async = require('async');

    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {}, fn = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = jQuery.extend(true, {}, defaults, options || {});
    //事件委托
    delegates.call(self, fn);

    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {
    	target: '',
    	content: '',
    	dataIframe: '',
    	dataAsync: '',
    	refresh: false,
    	//缓存对象
    	cache: {}
    }, fn = {};
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

    var onLoad = function(e, res, callBack){
    	var target = setting.target;
    	if(res){
    		target.html(res);
    	}
    	//设置加载完成
    	target.attr(views.attr.dataLoaded, true);
    	//清空缓存
    	setting.cache.iframe = undefined;
    	setting.cache.async = undefined;
    	if(callBack)
    		callBack.call(target);
    	fn.delegates.fire('loaded', [], target, true);
    };

    //将内容加载到指定容器
    self.loadTo = function(target, options, callBack){
    	var dataIframe = options.dataIframe,
            dataAsync = options.dataAsync,
            refresh = options.refresh;

        setting.target = target;

        var dataLoaded = target.attr(views.attr.dataLoaded);

        var selfFn = function(){
        	if(dataIframe){
        		var iframeTarget = $(views.html.iframe.replace('#URL#', dataIframe));
        		//设置缓存iframe对象
        		setting.cache.iframe = iframeTarget;
	            iframeTarget.load(function(e){onLoad(e, undefined, callBack);});
	            target.html('');
	            target.append(iframeTarget);
        	}
        	else if(dataAsync){
	        	var asyncObj = async.ajax({
	        		url: dataAsync,
	        		type: 'GET'
	        	}).then(function(res){
	        		onLoad({}, res, callBack);
	        	});
	        	//设置缓存async对象
	        	setting.cache.async = asyncObj.ajaxObj;
	        }
        };

    	if(dataLoaded == 'true'){
    		if((refresh == 'true' || refresh == true)){
    			selfFn();
    		}
    	}
    	else{
            selfFn();
        }
    };

    //中止操作
    self.abort = function(callBack){
    	var iframeTarget = setting.cache.iframe;
    	var asyncObj = setting.cache.async;
    	if(iframeTarget)
    		iframeTarget.remove();
    	if(asyncObj)
    		asyncObj.abort();
    	if(callBack)
    		callBack.call(setting.target);
    	fn.delegates.fire('abort', [], setting.target, true);
    };

    //初始化执行
    install();
    
    //组件方法输出
    module.exports = self;

});
