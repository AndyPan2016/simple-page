/**
 * 转盘抽奖
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-07-19 10:40:01
 * @remark 
 *         事件：
 *         on('draw', [Function]) 抽奖结果返回，转盘未开始
 *         on('drawFail', [Function]) 抽奖接口报错，失败
 *         on('noWin', [Function]) 未中奖
 *         on('win', [Function]) 中奖
 */

'use strict';

module.define('turntable-lottery', function(options){

    var self = this;

    var delegates = module.require('delegates');

    var defaults = {
        //抽奖接口url
        drawUrl: 'http://hdsupport.178.com/api/index?aid=105&cid=1&s=tryluck',
        //获取剩余抽奖次数接口
        tryCountUrl: 'http://hdsupport.178.com/api/index?aid=105&cid=1&s=get_counts',
        //抽奖按钮
        drawBtn: $('#J-draw-btn'),
        //容器
        container: $('#J-region-prize'),
        //剩余抽奖次数容器
        tryCountLab: $('#J-try-count'),
        //active
        acitve: 'active',
        //每一项的公共class
        item: 'region-prize-item',
        //奖品转盘位置数据
        prizeListObjs: {
            '键盘': [9, 13, 14, 17, 21, 22],
            '10QB': [8, 16, 24, 32],
            '小米充电宝': [11, 19, 27, 35],
            '50京东卡': [6, 14, 22, 30],
            '谢谢参与': [7, 10, 12, 15, 18, 20]
        },
        //转盘每一项class
        drawSwitchAry: [
            'draw-switch-1', 'draw-switch-2', 'draw-switch-3', 'draw-switch-4',
            'draw-switch-5', 'draw-switch-6', 'draw-switch-7', 'draw-switch-8'
        ]
    };

    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});
    var fn = {};
    delegates.call(self, fn);

    var install = function() {
        //(如果组价有操作事件)绑定组件事件
        bindEvent();
        //获取剩余抽奖次数
        renderTryCount();
    };

    var bindEvent = function(){
        //抽奖
        var drawBtn = setting.drawBtn;
        drawBtn.click(function(){
            $.ajax({
                url: setting.drawUrl,
                dataType: 'jsonp',
                success: function(res){
                    if(res){
                        if(res.code == 0){
                            var result = res.result;
                            var awardName = result.award_name;
                            var listObjs = setting.prizeListObjs[awardName];
                            var numbers = randoms(0, listObjs.length-1);
                            var eventResult = fn.delegates.fire('draw', [res], setting.container, false);
                            if(eventResult == false) return;
                            switchs(listObjs[numbers], 0, result);
                            renderTryCount();
                        }
                        else{
                            var eventResult = fn.delegates.fire('drawFail', [res], setting.container, false);
                            if(eventResult != false)
                                alert(res.msg);
                        }
                    }
                }
            });
        });
    };
    
    //转盘
    var switchs = function(count, start, res){
        count = count || 1;
        start = start || 0;
        var i = 0;
        var item, prevItem;
        var drawSwitchAry = setting.drawSwitchAry;
        var regionPrize = setting.container;

        var render = function(){
            if(prevItem)
                prevItem.removeClass(setting.active);
            item = regionPrize.find('.'+drawSwitchAry[start]);
            item.addClass(setting.active);
            prevItem = item;
            start++;
            if(start >= drawSwitchAry.length){
                start = 0;
            }
            i++;
            if(i >= count){
                setTimeout(function(){
                    var awardName = res.award_name;
                    if(res.award_id == 0){
                        regionPrize.find('.'+setting.item).removeClass(setting.active);
                        var eventResult = fn.delegates.fire('noWin', [res], setting.container, false);
                        if(eventResult != false)
                    	   alert('很遗憾没有中奖请明天再来吧！');
                    }
                    else{
                        fn.delegates.fire('win', [res], setting.container, false);
                    }
                }, 1000);
            }
            else{
                setTimeout(function(){
                    render();
                }, 200);
            }
        };
        render();
    };

    var randoms = function(b, e){
        return parseInt(Math.random()*(e-b+1)+b);
    };

    var renderTryCount = function(){
        $.ajax({
            url: setting.tryCountUrl,
            dataType: 'jsonp',
            success: function(res){
                if(res.code == 0){
                    var tryCounts = res.result.try_counts;
                    setting.tryCountLab.html(tryCounts);
                }
            }
        });
    };

    install();
    
});

