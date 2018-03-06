/**
 * 分页 view
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-08-08 13:59:36
 */

'use strict';

module.define('view-pager', function(){

	module.exports = {
		pagerWrap: $('#j-pager'),
		itemWrapDy: $('#j-item-wrap'),
		className: {
			pageFirst: 'pager-item-first',
			pagePrev: 'pager-item-prev',
			pageDefault: 'pager-item-default',
			pageNext: 'pager-item-next',
			pageLast: 'pager-item-last',
			pageMore: 'ui-pager-more'
		},
		pageHtml: {
			pageWrap: '<span class="ui-pager-wrap">#pageitem#</span>',
			first: '<a href="javascript:;" class="ui-pager-item pager-item-first">首页</a>',
			prev: '<a href="javascript:;" class="ui-pager-item pager-item-prev">上一页</a>',
			item: '<a href="javascript:;" class="ui-pager-item pager-item-default">#item#</a>',
			itemActive: '<a href="javascript:;" class="ui-pager-item pager-item-default active">#item#</a>',
			next: '<a href="javascript:;" class="ui-pager-item pager-item-next">下一页</a>',
			end: '<a href="javascript:;" class="ui-pager-item pager-item-last">末页</a>',
			more: '<a href="javascript:;" class="ui-pager-more">换一换</a>',
			noData: '<div class="no-data">暂无数据！</div>'
		},
		renderItemHtml: function(item, pageHtmlIdx){
			var html = [];
	        html.push('<div class="list-item item-'+pageHtmlIdx+'">');
	        html.push(' <span class="item-hd">'+item.contact[0]+'</span>');
	        html.push(' <span class="item-txt">'+item.content+'</span>');
	        html.push('</div>');

	        return html.join('\r\n');
		}
	};
	
});

