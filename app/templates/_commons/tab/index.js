/**
 * 选项卡组件
 * @authors 潘毅 (pye-mail@163.com)
 * @date    18-03-07 18:08:32
 */


'use strict';

/**
 * CompTabs(组件)
 * @param  {Object} options配置参数对象
 * @return {Object} 对外接口方法
 */
define('CompTabs', function(options){

    //视图引用
    var views = require('ViewCompTabs');
    //事件委托
    var delegates = require('delegates');
    //iframe和异步加载管理
    var loadManager = require('CompLoadManager');

    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {
        //目标元素
        target: '',
        //是否组件自己创建结构
        isSelfCreate: true,
        //如果是组建自己创建结构，那么需要传入的数据集合
        data: [
            //描述：{ 
            //          title: '每一个选项卡的文本', 
            //          content: '选项卡对应的文本内容', 
            //          iframe: '选项卡对应的iframe', 
            //          async: '选项卡对应的异步请求', 
            //          active: 是否默认选中, 
            //          disabled: 是否被禁用,
            //          refresh: 是否每次切换都刷新内容(只有设置iframe和async时有效)
            //      }
            //注意：content、iframe、ajax三者只能存在一个，即是三种不同的选项卡内容的展示方式
            { title: '选项A', content: '文本内容A', iframe: 'http://www.baidu.com/', async: '' },
            { title: '选项B', content: '文本内容B', iframe: '', async: 'html/test.html', active: true },
            { title: '选项C', content: '文本内容C', iframe: '', async: '', disabled: true }
        ]
    }, fn = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = jQuery.extend(true, {}, defaults, options || {});
    //事件委托
    delegates.call(self, fn);


    //组件初始化
    var install = function(){
        //初始化状态
        initState();
        //(如果组价有操作事件)绑定组件事件
        bindEvent();
        //组件render事件
        fn.delegates.fire('render', [], self, true);
    };

    //初始化默认选中
    var initDefaultActive = function(elem, triggerMode){
        var data = setting.data;

        var selfFn = function(idx){
            if(triggerMode.toLowerCase() == 'hover')
                elem.find('.'+views.className.tabHdItem).eq(idx).mouseover();
            else
                elem.find('.'+views.className.tabHdItem).eq(idx).click();
        }

        var i = 0, len = data.length, item, status = 0;
        for(;i<len;i++){
            item = data[i];
            if(item.active){
                selfFn(i);
                status = 1;
                break;
            }
        }
        if(!status)
            selfFn(0);
    };

    //初始化参数状态
    var initState = function(){
        //重置view中的target
        views.target = $(setting.target || views.target);
        if(setting.isSelfCreate){
            views.target.html(views.render(setting.data));
        }
    };

    //组件事件绑定
    var bindEvent = function(){
        var attr = views.attr;
        var target = views.target;

        target.each(function(idx, elem){
            elem = $(elem);
            var triggerMode = elem.attr(attr.triggerMode) || '';
            if(triggerMode.toLowerCase() == 'hover')
                bindTabHover(elem);
            else
                bindTabClick(elem);
            initDefaultActive(elem, triggerMode);
        });
    };

    //绑定hover事件
    var bindTabHover = function(target){
        target.on('mouseover', '.'+views.className.tabHdItem, tabSwitch);
    };

    //绑定click事件
    var bindTabClick = function(target){
        target.on('click', '.'+views.className.tabHdItem, tabSwitch);
    };

    //切换操作
    var tabSwitch = function(e){
        var target = $(this);
        var className = views.className;
        if(target.hasClass(className.disabled)){
            return;
        }
        var idx = target.index();

        var components = target.parents('.'+className.tab).eq(0);
        var tabContItems = components.find('.'+className.tabContItem);
        var thisItem = tabContItems.eq(idx);

        if(thisItem.length){
            //切换前选中项
            var tagSiblings = target.siblings(), prevTarget;
            var i = 0, len = tagSiblings.length, item;
            for(;i<len;i++){
                item = tagSiblings.eq(i);
                if(item.hasClass(className.active)){
                    prevTarget = item;
                    break;
                }
            }
            if(prevTarget){
                if(prevTarget.get(0) == target.get(0)){
                    return false;
                }
            }
            //切换前选中内容
            var prevContItem, contItem;
            i = 0, len = tabContItems.length;
            for(;i<len;i++){
                contItem = tabContItems.eq(i);
                if(contItem.hasClass(className.active)){
                    prevContItem = contItem;
                    break;
                }
            }
            //响应switch事件
            var result = fn.delegates.fire('switch', [target, thisItem, idx, [prevTarget, prevContItem]], self, true);
            if(result == false){ return false; }

            //处理内容加载之前，先关闭上一次未完成的加载(前提：如果是异步或iframe方式，且加载未完成)
            loadManager.abort();
            //处理内容加载
            loadContent(thisItem);

            //选中tabItem
            if(prevTarget)
                prevTarget.removeClass(className.active);
            target.addClass(className.active);
            //选中tab内容
            if(prevContItem)
                prevContItem.removeClass(className.active);
            thisItem.addClass(className.active);
        }
        else{
            alert('Not Found！');
        }
    };

    //处理内容加载
    var loadContent = function(thisItem){
        var attrs = views.attr;
        var dataIframe = thisItem.attr(attrs.dataIframe),
            dataAsync = thisItem.attr(attrs.dataAsync),
            refresh = thisItem.attr(attrs.dataRefresh);

        loadManager.loadTo(thisItem, {
            dataIframe: dataIframe, 
            dataAsync: dataAsync,
            refresh: refresh
        });
    };

    //初始化执行
    install();
    
    
    //组件方法输出
    module.exports = self;
    
});
