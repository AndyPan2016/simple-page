/**
 * index.js
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-06-22 10:57:18
 */

'use strict';

window.module = {
	version: '2.0.0',
	isGlobal: true,
	objs: {}
};

//定义模块（模块名不允许重复）
window.define = module.define = function(name, handle){
	var myHandle = function(){
		var result;
		if(handle){
			var exportsObjs = { 
				exports: undefined 
			};
			if(typeof handle === 'function'){
				window.exports = module['exports'] = undefined;
				var res = handle.apply(exportsObjs, arguments);
				result = module['exports'] || exports || exportsObjs.exports || res;
				module['exports'] = exports = undefined;
			}
		}
		return result;
	};
	module.isGlobal ? window[name] = myHandle : module.objs[name] = myHandle;
};

//获取模块
window.require = module.require = module.get = function(){
	var name = arguments[0];
	if(!name)
		return;
	var result, args = [], moduleItem;
	if(Object.prototype.toString.call(name) === "[object Array]"){
		result = [];
		args = arguments[1] || [];
		var i = 0, len = name.length;
		for(;i<len;i++){
			moduleItem = module.isGlobal ? window[name[i]] : module.objs[name[i]];
			if(!moduleItem){
				console.error('Can not find module "'+name[i]+'"!');
				break;
			}
			result.push(moduleItem.apply(module, args[i]));
		}
	}
	else{
		moduleItem = module.isGlobal ? window[name] : module.objs[name];
		if(!moduleItem){
			console.error('Can not find module "'+name+'"!');
			return;
		}
		args = [];
		for(var key in arguments){
			if(key > 0)
				args.push(arguments[key]);
		}
		result = (module.isGlobal ? window[name] : module.objs[name]).apply(module, args);
	}

	return result;
};

//替换所有
String.prototype.replaceAll = function (beRep, rep) {
    /// <summary>替换所有</summary>
    /// <param name="beRep" type="String">被替换字符串</param>
    /// <param name="rep" type="String">替换字符串</param>
    /// <returns type="String" />替换后的字符串

    return this.replace(new RegExp(beRep, "gm"), rep);
};

