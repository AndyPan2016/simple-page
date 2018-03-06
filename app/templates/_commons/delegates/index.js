/**
 * 事件委托
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-06-26 14:59:05
 *
 * 使用： 	事件委托主要用于给模块代码或者组件自定义事件，当delegates与你的组件或模块结合后，使用者可通过对你的组件或模块的实例进行事件绑定
 * 			该模块对外提供了三个方法
 * 			1.on 添加事件委托(相同name的事件只允许一个存在)
 * 			2.bind 绑定事件委托(相同name的事件允许多个存在)
 * 			3.shift 移除事件监听
 * 示例： 	比如要定义一个组件[mycomps]的render事件，那么在你的组件内部首先引入事件委托模块
 * 			var delegates = require('delegates');
 * 			//定义一个你自己组件内部对象
 * 			var fn = {};
 * 			//并将这个对象传给delegates，用于创建组件自己的事件委托对象
 * 			delegates.call(self, fn);
 *
 * 			然后，在组件render的时候，定义组件的render事件委托
 * 			var result = fn.delegates.fire('render', [参数A， 参数B， 参数C, ...], 事件的this对象, false);
 *
 * 			最后，通过组件的实例绑定render事件
 * 			var case = require('mycomps');
 * 			case.on('render', function(参数A， 参数B， 参数C, ...){  });
 * 			或者使用
 * 			case.bind('render', function(参数A， 参数B， 参数C, ...){  });
 *
 * 			当不需要render事件时
 * 			case.shift('render');
 */

'use strict';


module.define('delegates', function() {

	module.exports = function(childScope, setting){
		
		var self = this;

	    //事件委托对象
	    childScope = childScope || {};
	    childScope.delegates = {};
	    //存储自定义委托对象
	    var customDelegates = {};

	    /**
	     * 添加自定义事件
	     * @param  {String} name 事件名称
	     * @param  {Function} handler 事件函数
	     * @return {Object} 当前实例对象
	     */
	    childScope.delegates.on = function(name, handler) {
	        name = name ? name.toLocaleUpperCase() : null;
	        if (name && handler)
	            customDelegates['on'+name] = [handler];

	        return self;
	    };

	    /**
	     * 绑定自定义事件
	     * @param  {String} name 事件名称
	     * @param  {Function} handler 事件函数
	     * @return {Object} 当前实例对象
	     */
	    childScope.delegates.bind = function(name, handler) {
	        name = name ? name.toLocaleUpperCase() : null;
	        if (name && handler){
	            var key = 'on'+name;
	            customDelegates[key] = customDelegates[key] || [];
	            customDelegates[key].push(handler);
	        }

	        return self;
	    };

	    /**
	     * 触发(执行或响应)已绑定的自定义事件
	     * @param  {String} name 事件名称
	     * @param  {Array} args 需要传递给事件函数的参数集合
	     * @param  {object} posing 以对象冒充的方式替换事件函数this
	     * @return {Object} 事件返回值或当前实例对象
	     */

	    childScope.delegates.fire = function(name, args, posing, async) {
	        name = name ? name.toLocaleUpperCase() : null;
	        var handlerResult;
	        var handler = function(){
	            var handlers = customDelegates['on' + name];
	            if(handlers){
	                var i = 0, len = handlers.length, result;
	                for(; i < len; i++){
	                    result = handlers[i].apply(posing || self, args || []);
	                    if(result != undefined)
	                        handlerResult = result;
	                }
	            }
	        };
	        if(async == false)
	            handler();
	        else
	            setTimeout(handler, 0);

	        return handlerResult;
	    };

	    /**
	     * 移除事件监听
	     * @param  {String} name 事件名称
	     * @param  {Function} handler 事件操作函数
	     * @return {Object} 当前实例对象
	     */
	    childScope.delegates.shift = function(name, handler) {
	        name = name ? name.toLocaleUpperCase() : null;
	        if(name && handler) {
	            var key = 'on' + name;
	            var handlers = customDelegates[key];
	            if(handlers){
	                var i = 0, len = handlers.length;
	                for(; i< len; i++){
	                    if(handler == handlers[i]){
	                        customDelegates[key].splice(i, 1);
	                        break;
	                    }
	                }
	            }
	        }
	        else if(name && !handler)
	            customDelegates['on' + name] = undefined;
	        else if(!name && !handler)
	            customDelegates = {};

	        return self;
	    };

	    /**
	     * 添加组件事件委托(相同name的事件只允许一个存在)
	     * @param  {String} name 委托事件名称
	     * @param  {Function} handler 事件操作函数
	     * @return {Object} 当前实例对象
	     * @remark 相同name的事件只允许一个存在，使用on添加事件会替换原有的使用on绑定的同名事件，并且也会替换使用bind绑定的同名事件
	     */
	    self.on = function(name, handler) {
	        if (handler) {
	            //委托事件
	            childScope.delegates.on(name, handler);
	        } else {
	            //触发事件
	            childScope.delegates.fire(name, null, null);
	        }

	        return self;
	    };

	    /**
	     * 绑定组件事件委托(相同name的事件允许多个存在)
	     * @param  {[type]} name    委托事件名称
	     * @param  {[type]} handler 事件操作函数
	     * @return {[type]}         当前实例对象
	     * @remark 相同name的事件允许多个存在，使用bind绑定的事件不会替换on绑定的同名事件，也不会替换bind绑定的同名事件，允许同名事件有多个操作
	     */
	    self.bind = function(name, handler){
	        if(handler)
	            //委托事件
	            childScope.delegates.bind(name, handler);

	        return self;
	    };

	    /**
	     * 移除事件监听
	     * @param  {String} name 事件名称
	     * @param  {Function} handler 事件操作函数
	     * @return {Object} 当前实例对象
	     */
	    self.shift = function(name, handler) {
	        return childScope.delegates.shift(name, handler);
	    };
	};
});


