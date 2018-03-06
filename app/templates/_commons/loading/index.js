/**
 * Created by ChengZheLin on 2017/11/21.
 */

'use strict';

define('loading', function (options) {
    //定义当前对应，用于存储对外方法
    var self = this;
    //组件默认参数或组件内部全局变量
    var defaults = {};
    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});
    //其他组件引用
    //var other = require('other');

    setting.ele = setting.ele ? $(setting.ele) : $('#j-loading');
    setting.dataType = setting.dataType ? setting.dataType : 'jsonp';

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
        moreBtn: null,
        index: 1,

        init: function () {
            bindEvent();

            //添加更多按钮
            this.addBtn()
        },

        getData: function (obj) {
            var that = this;
            if (obj.url) {
                $.ajax({
                    url: obj.url,
                    type: 'GET',
                    data: obj.data,
                    dataType: setting.dataType,
                    success: function (db) {
                        setting.render(setting.ele, db);
                    },
                    error: function () {
                        alert('网络错误，请稍后重试！')
                    }
                })
            }
        },

        addBtn: function () {
            var that = this;
            this.moreBtn = $('<a href="#" id="j-loading-btn" class="loading-btn">' + setting.moreBtnText + '</a>')
            setting.ele.after(that.moreBtn);
            this.addItem();
        },

        addItem: function () {
            var that = this;
            //加载更多，时间监听
            this.moreBtn.on("click", function () {
                that.getData(setting.request(++that.index, setting.url));
                return false;
            })
        }
    };


    //实例化化install方法
    var install = new Install();
    install.init();


    //组件方法输出
    module.exports = self;
});