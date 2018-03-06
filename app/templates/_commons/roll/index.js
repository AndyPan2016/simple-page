/**
 * Created by ChengZheLin on 2017/11/21.
 */

'use strict';

define('roll', function (options) {
    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});
    //其他组件引用
    //var other = require('other');

    setting.ele = setting.ele ? $(setting.ele) : $('#j-roll');

    //组件事件绑定
    var bindEvent = function () {
        //do something
    };

    //组件初始化
    var Install = function () {
        //(如果组价有操作事件)绑定组件事件

        //do something
    };

    Install.prototype = {
        //初始化
        boxLeft : 0,
        boxHeight : 0,
        parWidth :0,
        docWidth : document.body.scrollWidth,
        docHeight : window.screen.availHeight,

        init: function () {
            bindEvent();

            this.getInfo();
            this.monitor();
        },

        //获取所有距离参数
        getInfo : function () {
            var parent = setting.ele.parent();
            if (parent.css('position') === 'static') {
                parent.css('position','relative')
            }

            var ele = setting.ele;
            this.boxLeft = ele.position().left;
            this.boxHeight = ele.height();
            this.parWidth = parent.width();
        },

        //监听
        monitor : function () {
            var that = this;
            var $win = $(window);

            function pos() {
                var left = (that.docWidth - that.parWidth) / 2 + that.boxLeft;
                if($win.scrollTop() >= that.boxHeight - that.docHeight) {
                    setting.ele.css({
                        'position' : 'fixed',
                        'bottom' : 0,
                        'left' : left
                    })
                }else if(setting.ele.attr('style')){
                    setting.ele.removeAttr('style')
                }
            }

            $win.scroll(function () {
                pos()
            });

            $win.resize(function () {
                that.docWidth = document.body.scrollWidth;
                that.docHeight = window.screen.availHeight;
                pos()
            })
        }
    };


    //实例化化install方法
    var install = new Install();
    install.init();


    //组件方法输出
    module.exports = self;
});