/**
 * 异步操作
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-06-23 18:17:26
 * 
 * 使用：	var async = require('async');
 * 			async.ajax([jquery ajax 参数对象]).then(function(res){
 * 				//ajax请求成功回调
 * 			}).catch(function(res){
 * 				//ajax请求失败回调
 * 			}).finally(function(res){
 * 				//不管成功或失败都会被调用
 * 			});
 */

'use strict';

module.define('async', function(){

	var self = this;

	var renderTCF = function(objs, response, responseText){
        var i=0, len = objs.length, objItem;
        for(;i<len;i++){
            objItem = objs[i];
            if(objItem && typeof(objItem) == 'function')
                objItem.call(self, response, responseText);
        }
	};

	self.ajax = function(opts){

		var customThen = [],
			customCatch = [],
			customFinally = [];
		var defaults = {};
		var options = $.extend(true, {}, defaults, opts || {});

		options.success = function(response, responseText){
			if(opts.success)
				opts.success(response, responseText);
            renderTCF(customThen, response, responseText);
            renderTCF(customFinally, response, responseText);
		};
		options.error = function(response, responseText){
			if(opts.error)
				opts.error(response, responseText);
            renderTCF(customCatch, response, responseText);
            renderTCF(customFinally, response, responseText);
		};
		$.ajax(options);

		return {
			then: function(fun){
				if(fun)
	                customThen.push(fun);
	            return this;
			},
			catch: function(fun){
				if(fun)
                	customCatch.push(fun);
            	return this;
			},
			finally: function(fun){
				if(fun)
                	customFinally.push(fun);
            	return this;
			}
		}
	};

	module.exports = self;

});

