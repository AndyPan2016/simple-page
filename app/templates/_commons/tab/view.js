/**
 * view-tab
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-11-15 13:47:30
 */

'use strict';

module.define('view-tab', function(){

	module.exports = {
    	//组件所需要的视图目标元素
    	target: $('.j-tab'),
    	//组件所需要的视图类名集合对象
    	className: {
    		//tab项选中class
    		active: 'active',
    		//tab模块
    		tab: 'j-tab',
    		//tab头部选项
    		tabHdItem: 'j-tab-hd-item',
    		//tab内容项
    		tabContItem: 'j-tab-cont-item',
    	},
    	//组件相关操作属性
    	attr: {
    		//触发tab切换方式
    		triggerMode: 'data-trigger-mode'
    	},
    	//组件所需要的html字符串集合对象
    	html: {},
    	//组件所需要的html渲染函数
    	render: function(){}
	};

});

