/**
 * 侧导航高亮
 * @authors 又帅又正直的小飞机
 *
 * 使用：
 *
 * var options = {
 *    mainItem: 'main-item',
 *    sideItem: 'side-item',
 *    offset: 100,
 *    active: 'on'
 * }
 *
 * require('scrollHeightLight',options)
 *
 * --------------------
 * 参数说明
 *
 * mainItem  正文区域每一块的容器class  默认main-item
 * sideItem  导航区域每一块的窗口class  默认side-item
 * offset    距离顶部的偏移值  默认0
 * active    导航激活状态的class  默认on
 */

'use strict';

define('scrollHeightLight', function(options){

  //定义当前对应，用于存储对外方法
  var self = this;
  
  var defaults = {
    mainItem : '.item',
    sideItem : '.side-item',
    active:'on',
    offset:0
  }

  //默认参数与自定义参数合并后的参数对象
  var setting = $.extend(true, {}, defaults, options || {});

  var _ = {
    mainItemTop:[],
  };

  //获取所的mianItem的top值
  var getTop = function(){
    _.mainItemTop = [];

    for(var i=0,len = setting.mainItem.length;i<len;++i){

      var temp = setting.mainItem.eq(i),
          top = temp.offset().top;
      _.mainItemTop.push(top);
    }

    // 追加一个最后一个元素的高度
    var e_top = _.mainItemTop[_.mainItemTop.length-1],
      e_height = setting.mainItem.eq(setting.mainItem.length-1).height();

    var end = e_top + e_height;
    _.mainItemTop.push(end);
  }

  // 高亮对应侧边栏
  var light = function(top){

    for(var i=0,len = _.mainItemTop.length;i<len;++i){

      var e = _.mainItemTop[i];

      if(top<e){

        setting.sideItem.removeClass(setting.active);

        if(i != 0){
          setting.sideItem.eq(i-1).addClass(setting.active);
        }
        return;

      }else{
        if(i == len-1){

          setting.sideItem.removeClass(setting.active);
          return;
        }
      }
    };
  };

  var handle = function(){

    //页面滚动事件
    $(window).scroll(function(){

      getTop();
      var top = $(document).scrollTop();

      top += setting.offset;

      light(top);

    }.bind(this));

    //左侧栏点击事件
    setting.sideItem.click(function(){

      var index = $(this).index(_.sideItem);

      $('html,body').animate({

        scrollTop: _.mainItemTop[index] - setting.offset

      },500);
    });
  };


  var init = function(){
    _.sideItem = defaults.sideItem;
    setting.mainItem = $('.'+setting.mainItem);
    setting.sideItem = $('.'+setting.sideItem);
    getTop();
    handle();
  }

  init()
  
  
  //组件方法输出
  module.exports = self;
    
});

