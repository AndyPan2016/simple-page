/**
 * 留言+投票组件  ( 后台组件 投票-20160810)
 * @authors 又帅又正直的小飞机
 *
 * 使用：
 *
 * var option = {
 *   aid: 74,
 *   cid: 2,
 *   origin: 'ptbus',
 *   pageWrapId: 'pageWrap',
 *   containerId: 'j-item-wrap',
 *   voteBtnClass: 'vote-btn',
 *   voteNumClass: 'vote-text',
 *   voteItemClass: 'vote-item',
 *   popupId: 'popup',
 *   joinBtnId: 'j-btn-test',
 *   maskId: 'J-popup-mask',
 *   popupCloseBtnClass: 'popup-btn-close',
 *   popupUploadBtnId: 'j-submit',
 *   popupNickId: 'nick',
 *   popupContactId: 'contact',
 *   popupBlessingId: 'blessing',
 *   popupOtherId: 'other',
 *   render: function(db){
 *     var html = [];
 *     html.push('<div class="list-item">');
 *     html.push(db.title);
 *     html.push('<div class="vote-text">'+db.poll+'</div>');
 *     html.push('<div class="vote-btn">投票</div>');
 *     html.push('</div>');
 *     return html.join('');
 *   }
 * }
 *
 * require('blessingVote',option);
 *
 *---------------------
 * 参数说明
 * 
 * 参数               描述
 * aid                活动id  必填
 * cid                组件id  必填
 * origin             活动平台(178||ptbus||tgbus) 默认178
 * pageWrapId         指定一个容器的id，分页的结构会在这个容器里面生成 默认pagewrap
 * containerId        指定一个容器的id，留言内容的结构会在这个容器里面生成 默认container
 * listSize           每一页显示的留言条数 默认8
 * pageSize           分页结构中，最多显示的页码个数 默认5
 * voteBtnClass       点赞按钮容器的的class 默认vote-btn
 * voteNumClass       点赞数容器的class  默认vote-text
 * voteItemClass      每条留言容器的class 默认vote-item
 * popupId            信息提交框的id  默认popup
 * joinBtnId          参与留言按钮id 可不填 填上之后会自动绑定点击显示弹框和遮罩的事件
 * maskId             遮罩id 可不填 填上之后 会同弹框一起进行显示与隐藏
 * popupCloseBtnClass 弹框关闭按钮class 可不填 填上之后会绑定弹框的关闭事件
 * popupNickId        信息提交框中用户昵称容器的id  默认nick
 * popupContactId     信息提交框中用户联系方式容器的id  默认contact
 * popupBlessingId    信息提交框中留言内容容器的id  默认blessing
 * popupOtherId       信息提交框中其它信息容器的id  默认other
 * popupUploadBtnId   信息提交框中提交按钮的id  默认submit
 *
 * uploadedReload     是否在提交成功后刷新页面数据  默认false
 * uploadedShowTip    是否在提交成功后显示提示信息 默认true
 *
 * Fun  以下参数为函数
 * render             每条留言的渲染结构，函数会传入当前留言的数据，需要拼接好html结构并return出来
 * error              可以自定义错误函数，所有错误信息都会以参数传入该函数中 默认alert
 * onInit             组件初始化之后的生命周期函数
 * willSubmit         数据提交前的生命周期函数 会传入将要提交的数据 可以对数据进行更改
 * uploadSuccess      数据上传成功后的生命周期函数
 *
 *
 * --------------------
 * 其它说明
 * 在信息提交框的html结构中，用户昵称、用户联系方式、留言内容以及其它
 * 这些dom元素可以定义一些属性
 *
 * 例如  <input type="text" placeholder="请输入你的qq号" reg="qq" error-tip="QQ号格式错误" id="contact">
 *
 * reg属性为当前内容的验证正则  内置了 qq(qq号)  phone(手机号) email(邮箱) notEmpty(不为空)
 * 也可以自己写正则 比如  reg='/^\d{6,12}$/' **不填写该属性视为不对当前内容进行校验
 *
 * error-tip属性为当前内容校验错误后的提示信息 会传入error函数当中
 */


'use strict';

define('blessingVote', function(options){

  //定义当前对应，用于存储对外方法
  var self = this;
  //组件默认参数或组件内部全局变量
  var defaults = {
    origin: '178',
    pageWrapId: 'pageWrap',
    containerId: 'container',
    listSize: 8,
    pageSize: 5,
    voteBtnClass: 'vote-btn',
    voteNumClass: 'vote-text',
    voteItemClass: 'vote-item',

    popupId: 'popup',
    joinBtnId: '',
    maskId: '',
    popupCloseBtnClass: '',
    popupNickId: 'nick',
    popupContactId: 'contact',
    popupBlessingId: 'blessing',
    popupOtherId: 'other',
    popupUploadBtnId: 'submit',

    uploadedReload: false,   //是否在提交成功后刷新页面数据
    uploadedShowTip: true,   //是否在提交成功后显示提示信息

    error: function(str){
      str && alert(str)
    },
    render: function(db){
      return '';
    },
    onInit: function(){},
    willSubmit: function(db){},
    uploadSuccess: function(){}
  };

  //拼接接口url
  var getUrl = function(origin, aid, cid) {
    var baseUrl = "http://hdsupport." + origin + ".com/api/index?aid=" + aid + "&cid=" + cid + "&s=";
    return {
      urlGet: baseUrl + "get_targets",
      urlPost: baseUrl + "vote",
      urlJoin: baseUrl + "participate",
      urlGetTopVoter: baseUrl + "get_top_voter",
      urlGetTopTarget: baseUrl + "get_top_targets",
      urlGetVoter: baseUrl + "get_voter",
      urlCheckLogin: "http://hdsupport." + origin + ".com/user/check_login?aid=" + aid,
      urlGetUser: "http://hdsupport." + origin + ".com/user/get_user?aid=" + aid
    }
  }

  //ajax
  var ajax = function(obj){
    $.ajax({
        url:obj.url,
        type:'get',
        dataType:'jsonp',
        data:obj.db || '',
        success:function(db){
          var code = db.code;
          if(code == 0){
            obj.cb(db);
          }else{
            setting.error(db.msg || require('testcode',code));
          }
        },
        error:function(err){
          alert('网络连接失败，请稍后再试');
        }
    })
  }

  //默认参数与自定义参数合并后的参数对象
  var setting = $.extend(true, {}, defaults, options || {});

  setting.urls = getUrl(setting.origin,setting.aid,setting.cid);

  //组件初始化
  var install = function(){
    setting.nowPage = 1;

    //获取数据
    getDB(function(db){
      //渲染视图
      render(db.result.list);

      runPagination(db);

      bindEvent();

      setting.onInit();
    });
  };

  //获取数据
  var getDB = function(cb){
    ajax({
      url: setting.urls.urlGet,
      db: {
        page: setting.nowPage,
        page_size: setting.listSize
      },
      cb: function(db){
        var list = db.result.list;

        setting.ids = [];
        //保存id数组
        for(var i=0,len = list.length;i<len;i++){
          setting.ids.push(list[i].id)
        }

        cb(db);
      }
    });
  }

  //渲染方法
  var render = function(db){
    var html = [];

    for(var i=0,len = db.length;i<len;i++){
      html.push(setting.render(db[i]));
    }

    $('#'+setting.containerId).html(html.join(''));
  }

  //渲染页面
  var renderHTML = function(){
    getDB(function(db){
      render(db.result.list);
    });
  }

  //调用分页
  var runPagination = function(db){

    //设置页码容器
    setting.wrap = setting.pageWrapId;

    //设置总页数
    setting.totalPage = db.result.page_total;

    //首页点击
    setting.firstClick = function(){
      setting.nowPage = 1;
      renderHTML();
    }

    //尾页点击
    setting.endClick = function(){
      setting.nowPage = setting.totalPage;
      renderHTML();
    }

    //上一页点击
    setting.prevClick = function(){
      --setting.nowPage
      renderHTML();
    }

    //下一页点击
    setting.nextClick = function(){
      ++setting.nowPage
      renderHTML();
    }

    //页码点击
    setting.itemClick = function(num){
      setting.nowPage = num;
      renderHTML();
    }


    require('pagination',setting);
  }

  //组件事件绑定
  var bindEvent = function(){

    //投票点击
    $('#'+setting.containerId).on('click','.'+setting.voteBtnClass,function(e){

      var p = $(this).parents('.'+setting.voteItemClass),
          index = p.index('.'+setting.voteItemClass),
          tid = setting.ids[index],
          voteText = p.find('.'+setting.voteNumClass);

      ajax({
        url: setting.urls.urlPost,
        db: {
          aid: setting.aid,
          cid: setting.cid,
          s: 'vote',
          tid: tid
        },
        cb: function(db){
          var poll = +voteText.text();
          voteText.text(++poll);
        }
      });
      
    });

    //显示弹框和遮罩
    if(setting.joinBtnId){

      $('#'+setting.joinBtnId).click(function(event) {

        setting.maskId && $('#'+setting.maskId).show();

        $('#'+setting.popupId).show();
      });
    }

    //关闭弹框和遮罩
    if(setting.popupCloseBtnClass){

      $('#'+setting.popupId).find('.'+setting.popupCloseBtnClass).click(function(event) {
        
        $('#'+setting.popupId).hide();

        setting.maskId && $('#'+setting.maskId).hide();
      });
    }

    //上传点击
    $('#'+setting.popupId).find('#'+setting.popupUploadBtnId).click(function(event) {
      var p = $('#'+setting.popupId),
          tips = $(this).attr('tip') || '上传成功';

      var nick = getElementInfo(p,setting.popupNickId),
          contact = getElementInfo(p,setting.popupContactId),
          blessing = getElementInfo(p,setting.popupBlessingId),
          other = getElementInfo(p,setting.popupOtherId);

      var tempArr = [nick,contact,blessing,other]

      //校验字段
      for(var i=0,len = tempArr.length;i<len;i++){
        var obj = tempArr[i],
            reg = filtrationReg(obj.reg);

        //有指定正则的情况下才进行验证
        if(reg){
          reg = new RegExp(reg);
          if(!reg.test(obj.val)){
            setting.error(obj.errorTip);
            return;
          } 
        }
      }

      var data = {
        aid: setting.aid,
        cid: setting.cid,
        s: 'participate',
        nick: nick.val,
        contact: contact.val,
        title: blessing.val,
        desc: [other.val]
      }

      //用于在外部更改提交的数据
      setting.willSubmit(data);


      //全部校验成功后提交数据
      ajax({
        url: setting.urls.urlJoin,
        db: data,
        cb: function(db){

          //是否关闭弹窗并显示提示信息
          if(setting.uploadedShowTip){
            alert(tips);

            $('#'+setting.popupId).hide();
            setting.maskId && $('#'+setting.maskId).hide();
          }

          //是否需要刷新页面数制
          if(setting.uploadedReload){
            setting.nowPage = 1;

            //获取数据
            getDB(function(db){
              //渲染视图
              render(db.result.list);

              runPagination(db);
            });
          }
          setting.uploadSuccess();
        }
      });

    });

  };

  //获取元素信息(节点 值 正则)
  var getElementInfo = function(p,cls){

    var e = p.find('#'+cls);

    return {
      e: e,
      val: e.val() || '',
      reg : e.attr('reg') || '' ,
      errorTip: e.attr('error-tip') || '输入格式错误'
    }
  }

  //过滤内置正则
  var filtrationReg = function(str){

    switch(str){
      case 'qq':
        //不以0开头的6-13位数字
        str = '^[1-9]{1}\\d{5,12}$';
        break;
      case 'phone':
        //潘毅写的 出了问题找他
        str = '^1[3-9]{1}[0-9]{9}$';
        break;
      case 'email':
        //也是潘毅写的
        str = '^\\w+((-\\w+)|(\.\\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$';
        break;
      case 'notEmpty':
        //不为空
        str = '^.+$';
        break;
    }

    return str;
  }

  //初始化执行
  install();
  
  
  //组件方法输出
  module.exports = self;
});