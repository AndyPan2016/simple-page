/**
 * iframe和异步加载管理 View
 * @authors 潘毅 (pye-mail@163.com)
 * @date    18-03-08 14:29:19
 */

define('ViewCompLoadManager', function(){

	exports = {
    	//组件所需要的视图目标元素
    	target: '',
    	//组件所需要的视图类名集合对象
    	className: {},
        //元素属性
        attr: {
            //是否加载完成
            dataLoaded: 'data-loaded'
        },
    	//组件所需要的html字符串集合对象
    	html: {
    		//iframe
    		iframe: '<iframe src="#URL#"></iframe>'
    	},
    	//组件所需要的html渲染函数
    	render: function(){}
	};

});
