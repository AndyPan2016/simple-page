/**
 * tab
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-11-15 13:44:40
 */

'use strict';

module.define('tab', function(options){

    //定义当前对应，用于存储对外方法
    var self = this;

    //视图引用
    var views = require('view-tab');
    var delegates = module.require('delegates');

    //组件默认参数或组件内部全局变量
    var defaults = {}, fn = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});
    //事件委托
    delegates.call(self, fn);


    //初始化参数状态
    var initState = function(){
    	if(setting.target){
    		//重置view中的target
    		views.target = $(setting.target);
    	}
    };

    //组件初始化
    var install = function(){
    	//初始化状态
    	initState();
        //(如果组价有操作事件)绑定组件事件
        bindEvent();
    };

    //组件事件绑定
    var bindEvent = function(){
        var className = views.className;
        var attr = views.attr;
        var target = views.target;

        target.each(function(idx, elem){
        	elem = $(elem);
        	var triggerMode = elem.attr(attr.triggerMode) || '';
        	if(triggerMode.toLowerCase() == 'hover')
        		bindTabHover(elem);
        	else
        		bindTabClick(elem);
        });
    };

    //绑定hover事件
    var bindTabHover = function(target){
    	target.on('mouseover', '.'+views.className.tabHdItem, tabSwitch);
    };

    //绑定click事件
    var bindTabClick = function(target){
    	target.on('click', '.'+views.className.tabHdItem, tabSwitch);
    };

    //切换操作
    var tabSwitch = function(e){
    	var target = $(this);
        var idx = target.index();
        var className = views.className;

        var components = target.parents('.'+className.tab).eq(0);
        var tabContItems = components.find('.'+className.tabContItem);
        var thisItem = tabContItems.eq(idx);

        if(thisItem.length){
        	//切换前选中项
        	var tagSiblings = target.siblings(), prevTarget;
        	var i = 0, len = tagSiblings.length, item;
        	for(;i<len;i++){
        		item = tagSiblings.eq(i);
        		if(item.hasClass(className.active)){
        			prevTarget = item;
        			break;
        		}
        	}
        	if(prevTarget){
        		if(prevTarget.get(0) == target.get(0)){
        			return false;
        		}
        	}
        	//切换前选中内容
        	var prevContItem, contItem;
        	i = 0, len = tabContItems.length;
        	for(;i<len;i++){
        		contItem = tabContItems.eq(i);
        		if(contItem.hasClass(className.active)){
        			prevContItem = contItem;
        			break;
        		}
        	}
	        //响应switch事件
	        var result = fn.delegates.fire('switch', [target, thisItem, idx, [prevTarget, prevContItem]], components, true);
	        if(result == false){ return false; }
        	//选中tabItem
        	if(prevTarget)
	        	prevTarget.removeClass(className.active);
	        target.addClass(className.active);
	        //选中tab内容
	        if(prevContItem)
	        	prevContItem.removeClass(className.active);
	        thisItem.addClass(className.active);
	    }
	    else{
	    	alert('Not Found！');
	    }
    };

    //初始化执行
    install();
    
    
    //组件方法输出
    module.exports = self;

});

