/**
 * 页面JS
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-01-10 13:44:53
 */

'use strict';


$(function() {

	console.info('Welcome!');

	var tabs = CompTabs();

	tabs.on('switch', function(target, thisItem, idx){
		console.info(idx);
	});

});