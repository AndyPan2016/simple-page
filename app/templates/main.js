/**
 * 页面JS
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-01-10 13:44:53
 */

'use strict';


$(function() {

	var pagerOptions = {
		//默认页
        pageIdx: 2, 
        //每页纪录条数
        pageCount: 5,
        //数据接口
        url: 'http://hdsupport.tgbus.com/api/index?aid=130&cid=2&s=get_blessing&o=content'
	};
    var result = require([
    	//test模块
    	'test',
    	//pager模块
    	'pager'
	], [
		//test模块参数，没有参数必须用null站位
    	null, 
    	//pager参数，每个模块的参数都是一个数组集合，集合里面可以有多个对象
    	[pagerOptions]
    ]);

    //当使用require加载多个模块时，result为一个集合，result集合的元素为对应require中的模块返回对象
    var pager = result[1];

    pager.on('pager', function(e, data, idx){
    	//分页事件
    	console.info(idx);
    }).on('renderButton', function(idx){
    	//按钮渲染事件
    	console.info(idx);
    });

});