/**
 * 组件化 DEMO - 组件业务逻辑JS
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017年10月23日14:00:28
 */

'use strict';

define('region-schedule-match', function(options){

    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});

    //视图引用
    var views = require('view-region-schedule-match');
    var delegates = module.require('delegates');

    var fn = {};
    delegates.call(self, fn);

    //组件初始化
    var install = function(){
        renderSwiper();
        bindEvent();
    };

    var renderSwiper = function(){
        var swiperScheduleContainer = views.swiperScheduleContainer;
        swiperScheduleContainer.each(function(idx, node){
            node = $(node);
            new Swiper(node.find('.swiper-container'), {
                slidesPerView: 5,
                spaceBetween: 1,
                nextButton: node.find('.swiper-button-next'),
                prevButton: node.find('.swiper-button-prev')
            });
        });
    };

    //组件事件绑定
    var bindEvent = function(){
        var className = views.className;
        var swiperScheduleContainer = views.swiperScheduleContainer;
        swiperScheduleContainer.on('click', className.switchTabItem, function(){
            var target = $(this);
            var idx = target.index();
            var components = target.parents(className.regionComponents);
            if(components.length){
                var tabContItems = components.find(className.tabContItem);
                var thisItem = tabContItems.eq(idx);
                if(thisItem.length){
                    target.siblings().removeClass('active');
                    target.addClass('active');
                    tabContItems.removeClass('active');
                    thisItem.addClass('active');
                    //响应switch事件
                    fn.delegates.fire('switch', [target, thisItem, idx], components, true);
                }
                else{
                    alert('Not Found！');
                }
            }
        });
        
        swiperScheduleContainer.each(function(idx, node){
            node = $(node);
            node.find(className.switchTabItem).eq(0).click();
        });
    };

    //初始化执行
    install();
    
    
    //组件方法输出
    module.exports = self;
    
});

