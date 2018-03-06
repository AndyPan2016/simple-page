/**
 * index.js
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-06-22 13:22:54
 *
 * 使用：   该popup模块为一个简单的popup打开/关闭功能的封装
 *          var popup = require('popup');
 *          popup.renderOpen('popup DOM对象 或 选择器', {sure: sure按钮回调, cancel: cancel按钮回调, close: close回调});
 */

'use strict';

module.define('popup', function(options){

	var self = this;

	var views = module.require('view-popup');

	var defaults = {
        //点击背景遮罩是否关闭
        clickEvent: false,
        //当前显示弹出框对象
        currentPopup: undefined,
        //自定义事件对象
        customEvent: {}
    };

	//默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});

    var install = function(){};

    var bindEvent = function(){
        var className = views.className;
    	setting.currentPopup[0].onclick = function(e){
    		e = e || window.event;
    		var target = $(e.target || e.srcElement);
    		if(target.hasClass(className.btnClose)){
    			hide();
    		}
    		else if(target.hasClass(className.btnSure)){
                var result = renderCustomEvent('sure');
    			if(result != false)
    				hide();
    		}
            else if(target.hasClass(className.btnCancel)){
                var result = renderCustomEvent('cancel');
                if(result != false)
                    hide();
            }
    		if(setting.clickEvent){
    			hide();
    		}
    	};
    	views.mask[0].onclick = function(){
    		if(setting.clickEvent){
    			hide();
    		}
    	};
    };

    var renderCustomEvent = function(events){
        var eventObjs = setting.customEvent[events], result;
        if(eventObjs){
            result = eventObjs.apply(setting.currentPopup, []);
        }
        return result;
    };

    var on = function(name, fun){
        if(fun){
            setting.customEvent[name] = fun;
        }
        return self;
    };

    var show = function(popup, callBack){
    	views.mask.addClass('show');
    	popup.addClass('show');
    	setting.currentPopup = popup;
    	bindEvent();
    	if(callBack){
    		callBack.call(popup);
    	}
    };

    var hide = function(popup, callBack){
    	popup = popup || setting.currentPopup;
        var result, callBackResult;
        if(callBack){
            var callBackResult = callBack.call(popup);
        }
        var closeEventResult = renderCustomEvent('close');
        result = closeEventResult != undefined ? closeEventResult : callBackResult;
        if(result != false){
        	views.mask.removeClass('show');
        	popup.removeClass('show');
        }
    };

    var renderOpen = function(popupMain, eventObjs){
        popupMain = $(popupMain);
        setting.clickEvent = false;
        show(popupMain);
        var sure = eventObjs.sure;
        on('sure', function(){
            var result;
            if(sure)
                result = sure();
            return result;
        });
        var cancel = eventObjs.cancel;
        on('cancel', function(){
            var result;
            if(cancel)
                result = cancel();
            return result;
        });
        var close = eventObjs.close;
        on('close', function(){
            var result;
            if(close)
                result = close();
            return result;
        });
    };

    self.openSubmit = function(sure, close){
        renderOpen(views.popupMainSubmit, {sure: sure, close: close });
    };

    self.views = views;
    self.show = show;
    self.hide = hide;

    self.renderOpen = renderOpen;

	module.exports = self;

});



