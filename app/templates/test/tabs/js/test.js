/**
 * 选项卡组件测试
 * @authors 潘毅 (pye-mail@163.com)
 * @date    18-03-09 11:50:34
 */

$(function() {

	console.info('Welcome!');

	var tabs = CompTabs({
		data: [
			{ title: '选项A', content: '文本内容A', iframe: 'http://www.baidu.com/', async: '' },
            { title: '选项B', content: '文本内容B', iframe: '', async: 'async/test.html', active: true },
            { title: '选项C', content: '文本内容C', iframe: '', async: '', disabled: true }
		]
	});

	tabs.on('switch', function(target, thisItem, idx){
		console.info(idx);
	});

});
