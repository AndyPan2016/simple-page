/**
 * 分页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-08-08 13:58:54
 *
 * 使用：   var pager = require('pager', opts); //opts为pager的可选参数，参考pager组件defaults对象
 *
 *          //分页事件（event，当前数据，当前页码，分页容器）
 *          pager.on('pager', function(e, data, pageIdx, pagerWrap){ });
 *
 *          //手动跳转到第N页
 *          pager.page(N);
 *          
 */

'use strict';

module.define('pager', function(options){
	var self = this;
	var views = require('view-pager');
	var async = module.require('async');
    var delegates = module.require('delegates');

    var defaults = {
        //当前页
        pageIdx: 1, 
        //每页纪录条数
        pageCount: 8,
        //总页数 
        pageSize: 1, 
        //总纪录数
        records: 0,
        //最大显示分页按钮个数
        maxPageSize: 10,
        //数据
        dataAllList: [],
        //是否已在最后一页
        status: false,
        //每一条数据下标
        pageHtmlIdx: 0,
        //是否使用换一换作为分页
        isMore: false,
        //静态分页起始下标
        begin: 0,
        //自动渲染
        autoRender: true,
        //数据接口
        url: 'http://hdsupport.tgbus.com/api/index?aid=130&cid=2&s=get_blessing&o=content',
        //浏览器窗口宽度，响应式时使用改变分页按钮展示形式
        winWidth: $(window).width()
    };

    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});
    var fn = {};
    delegates.call(self, fn);

	var install = function(){
		getDataList();
		bindEvent();
	};

	var bindEvent = function(){
		var className = views.className;
        if(views.pagerWrap.attr('is-bind') != true){
    	    views.pagerWrap.click(function(e){
    	        e = e || window.event;
    	        var target = $(e.target || e.srcElement);

    	        if(target.hasClass(className.pageFirst)){
    	            //首页
    	            goToPage(1, e, target);
    	        }
    	        else if(target.hasClass(className.pagePrev)){
    	            //上一页
    	            goToPage(((setting.pageIdx-1) || 1), e, target);
    	        }
    	        else if(target.hasClass(className.pageDefault)){
    	            //第N页
    	            goToPage(target.html(), e, target);
    	        }
    	        else if(target.hasClass(className.pageNext)){
    	            //下一页
    	            goToPage(((setting.pageIdx+1) > setting.pageSize ? setting.pageSize : setting.pageIdx+1), e, target);
    	        }
    	        else if(target.hasClass(className.pageLast)){
    	            //末页
    	            goToPage(setting.pageSize, e, target);
    	        }
    	        else if(target.hasClass(className.pageMore)){
    	            //换一换
    	            moreData(e, target);
    	        }
    	        renderPagerBtn(views.pagerWrap);
    	    });
            views.pagerWrap.attr('is-bind', true);
        }
	};

    var getDataList = function(){
        async.ajax({
            url: setting.url,
            dataType: 'jsonp',
        }).then(function(res){
        	if(res.code == 0){
                setting.dataAllList = res.result || [];
                pager();
            }
            else{
                alert(res.msg);
            }
        }).catch(function(res){
        	alert(res.msg);
        });
    };
    
    var pager = function(){
        setting.records = setting.dataAllList.length;
        setting.pageSize = parseInt(setting.records / setting.pageCount);
        setting.pageSize = setting.records % setting.pageCount == 0 ? setting.pageSize : setting.pageSize + 1;
        if(setting.dataAllList.length){
            views.itemWrapDy.html('');
            setting.pageIdx = setting.pageIdx || 1;
        }
        setting.status = false;
        renderPagerBtn(views.pagerWrap);
        goToPage();
    };

    var renderPagerBtn = function(container){
        var html = [];
        if(setting.winWidth <= 800 || setting.isMore){
            html = views.pageHtml.more;
        }
        else{
            //html.push(views.pageHtml.first);
            html.push(views.pageHtml.prev);
            setting.begin = setting.pageIdx-9;
            var end = setting.maxPageSize;
            if(setting.pageIdx <= setting.maxPageSize - 2){
                for(var i=1;i<setting.pageIdx;i++){
                    html.push(views.pageHtml.item.replaceAll('#item#', i));
                }
            }
            else{
                end = setting.pageIdx + 2;
                if(end > setting.pageSize){
                    end = setting.pageSize;
                }
                else{
                    setting.begin = setting.pageIdx-7;
                }
                for(var i=setting.begin;i<setting.pageIdx;i++){
                    html.push(views.pageHtml.item.replaceAll('#item#', i));
                }
            }
            if(end > setting.pageSize){
                end = setting.pageSize;
            }
            html.push(views.pageHtml.itemActive.replaceAll('#item#', setting.pageIdx));
            for(var i=setting.pageIdx+1;i<=end;i++){
                html.push(views.pageHtml.item.replaceAll('#item#', i));
            }
            html.push(views.pageHtml.next);
            //html.push(views.pageHtml.end);
            html = html.join('\r\n');
            html = views.pageHtml.pageWrap.replace('#pageitem#', html);
        }
        var result = fn.delegates.fire('renderButton', [setting.pageIdx, container], container, false);
        if(setting.dataAllList.length && result != false)
            container.html(html);
    };
    
    var pageItemHtml = function(item){
        var html = views.renderItemHtml(item, setting.pageHtmlIdx);
        setting.pageHtmlIdx++;
        return html;
    };
    var goToPage = function(idx, e, target){
        idx = idx || setting.pageIdx;
        setting.pageIdx = parseInt(idx);
        var begin = (setting.pageIdx - 1) * setting.pageCount,
            end = begin + setting.pageCount,
            item, html = [], tempData = [];

        if(setting.status){
            setting.pageIdx = 1;
            setting.status = false;
            //alert('已加载全部数据！');
            return false;
        }
        if(end == setting.records){
            setting.status = true;
        }
        setting.pageHtmlIdx = 0;
        for(var i=begin;i<end;i++){
            item = setting.dataAllList[i];
            tempData.push(item);
            if(!item){break;}
            html.push(pageItemHtml(item, i));
        }
        if(!html.length){
            html.push(views.pageHtml.noData);
            views.pagerWrap.hide();
        }
        //分页事件（event，当前数据，当前页码，分页容器）
        var result = fn.delegates.fire('pager', [e, tempData, setting.pageIdx, views.itemWrapDy], target, false);
        if(result != false)
            views.itemWrapDy.html(html.join('\r\n'));
    };

    var R = function (form, to){
        return Math.floor(Math.random()*(to-form))+form;
    }

    var randomData = function(){
        var len = setting.dataAllList.length, tempData, tempR = {};
        if(len <= setting.pageCount){
            setting.pageHtmlIdx = 0;
            tempData = setting.dataAllList;
        }
        else{
            var renderRandom = function(){
                var r = R(0, len), data;
                if(tempR[r]){
                    data = renderRandom();
                }
                else{
                    data = setting.dataAllList[r];
                    tempR[r] = true;
                }
                return data;
            };
            tempData = [];
            setting.pageHtmlIdx = 0;
            for(var i=0; i<setting.pageCount;i++){
                tempData.push(renderRandom());
            }
        }
        var html = [];
        for(var i=0, len = tempData.length; i<len;i++){
            html.push(pageItemHtml(tempData[i]));
        }
        //分页事件（event，当前数据，当前页码，分页容器）
        var result = fn.delegates.fire('pager', [e, tempData, setting.pageIdx, views.itemWrapDy], target, false);
        if(result != false)
            views.itemWrapDy.html(html.join('\r\n'));
    };

    var moreData = function(e, target){
        randomData(e, target);
    };

    self.views = views;

    self.render = install;

    self.getDataList = getDataList;

    self.page = goToPage;

    if(setting.autoRender)
        install();

    module.exports = self;
});

