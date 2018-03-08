/**
 * Tabs 视图业务逻辑
 * @authors 潘毅 (pye-mail@163.com)
 * @date    18-03-08 09:57:48
 */

define('ViewCompTabs', function(){

	//组件视图输出
    module.exports = {
    	//组件所需要的视图目标元素
    	target: $('.j-tabs'),
    	//组件所需要的视图类名集合对象
    	className: {
    		//tab项选中class
    		active: 'active',
    		//tab项disabled
    		disabled: 'disabled',
    		//tab模块
    		tab: 'j-tabs',
    		//tab头部选项
    		tabHdItem: 'j-tabs-hd-item',
    		//tab内容项
    		tabContItem: 'j-tabs-cont-item',
    	},
    	//组件相关操作属性
    	attr: {
    		//触发tab切换方式
    		triggerMode: 'data-trigger-mode',
    		//data-iframe
    		dataIframe: 'data-iframe',
    		//data-async
    		dataAsync: 'data-async',
    		//data-refresh
    		dataRefresh: 'data-refresh'
    	},
    	//默认提示文本
    	tipStr: {
    		noTitle: '未设置Title',
    		noContent: '暂无内容！'
    	},
    	//组件所需要的html字符串集合对象
    	html: {
    		//选项卡选项标签
    		tabsHdItem: '<a href="javascript:;" class="tabs-hd-item j-tabs-hd-item #DISABLED#">#ITEMTEXT#</a>',
    		//选项卡内容容器
    		tabsBdItem: '<div class="tabs-bd-item j-tabs-cont-item #ISIFRAME#" data-iframe="#DATAIFRAME#" data-async="#DATAASYNC#" data-refresh="#DATAREFRESH#">#ITEMCONT#</div>',
    	},
    	//组件所需要的html渲染函数
    	render: function(data){
    		data = data || [];

    		var html = [], tabsHdItems = [], tabsBdItems = [];
    		var i = 0, len = data.length, item;
    		for(;i<len;i++){
    			item = data[i];
    			tabsHdItems.push(
    				this.html.tabsHdItem
    					.replace('#ITEMTEXT#', item.title || this.tipStr.noTitle)
    					.replace('#DISABLED#', item.disabled ? (typeof(item.disabled) === 'string' ? item.disabled : this.className.disabled) : '')
				);
    			tabsBdItems.push(
					this.html.tabsBdItem
						.replace('#ITEMCONT#', item.content || this.tipStr.noContent)
						.replace('#DATAIFRAME#', item.iframe || '')
						.replace('#DATAASYNC#', item.async || '')
						.replace('#DATAREFRESH#', item.refresh || '')
						.replace('#ISIFRAME#', item.iframe ? 'iframe' : '')
				);
    		}

    		html.push('<div class="ui-tabs j-tabs">');
            html.push('    <div class="ui-tabs-hd">');
            html.push(tabsHdItems.join('\r\n'));
            html.push('    </div>');
            html.push('    <div class="ui-tabs-bd">');
            html.push(tabsBdItems.join('\r\n'));
            html.push('    </div>');
            html.push('</div>');

            return html.join('\r\n');
    	}
    };

});
