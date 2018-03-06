/**
 * 组件化 DEMO View - 组件DOM操作、渲染、获取等
 * @authors AndyPan (pye-mail@163.com)
 * @date 2017年10月23日14:06:10
 */

'use strict';

module.define('view-test', function(){

	//组件视图输出
    module.exports = {
    	//组件所需要的视图目标元素
    	target: $('selector'),
        //按钮
        testBtn: $('#j-btn-test'),
    	//组件所需要的视图类名集合对象
    	className: {},
    	//组件所需要的html字符串集合对象
    	html: {},
    	//组件所需要的html渲染函数
    	render: function(){}
    };

});

