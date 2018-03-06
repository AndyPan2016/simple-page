/**
 * 验证
 * @authors AndyPan (pye-mail@163.com)
 * @date    2017-06-23 16:45:07
 *
 * 使用：   var validate = require('validate');
 *          var result = validate.verify({
                //指定验证表单
                form: $('#j-form-submit'),
                //回调消息
                callBack: function(msg){ alert(msg); },
                //验证通过，并且获取表单数据后，是否清空表单
                flag: true
            });
            result为表单数据对象
 */

'use strict';

module.define('validate', function(options){

    var self = this;

    var defaults = {
        form: '.J-comp-validate-form',
        rules: {
            qq: {regular: /^[1-9]*[1-9][0-9]*$/, remark: ''},
            phone: {regular: /^1[3-9]{1}[0-9]{9}$/, remark: ''},
            email: {regular: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, remark: ''},
            'qq-len': function(val){
                var result = { status: true, msg: 'success' };
                if(val.length < 6){
                    result = { status: false, msg: 'QQ号的长度不合法！' }
                }
                return result;
            }
        },
        target: 'J-validate'
    };

    //默认参数与自定义参数合并后的参数对象
    var setting = $.extend(true, {}, defaults, options || {});

    var verify = function(opts){
        var form = $(opts.form || setting.form);
        var callBack = opts.callBack;
        var flag = opts.flag == undefined ? true : opts.flag;
        var rules = setting.rules;

        var dataRequireTip, dataErrorTip, name, value, className;
        var result = {};
        var verifyNodes = form.find('.'+setting.target);
        var i = 0, len = verifyNodes.length, node;
        var status = true;
        for(;i<len;i++){
            node = verifyNodes.eq(i);
            className = node.attr('class').split(' ');
            name = node.attr('name');
            dataRequireTip = node.attr('data-require-tip') || node.attr('placeholder') || '请输入';
            dataErrorTip = node.attr('data-error-tip');
            value = node.val();

            if(!value){
                if(callBack)
                    callBack.call(node, dataRequireTip);
                else{
                    alert(dataRequireTip);
                }
                node.focus();
                status = false;
                break;
            }
            var ruleData, verifyStatus = {};
            var j = 0, lenJ = className.length, clas;
            for(;j<lenJ;j++){
                clas = className[j];
                ruleData = rules[clas];
                if(ruleData){
                    if(typeof(ruleData) == 'function'){
                        verifyStatus = ruleData.call(node, value);
                    }
                    else{
                        verifyStatus = { 
                            status: ruleData.regular.test(value),
                            msg: ruleData.remark || dataErrorTip
                        };
                    }
                    if(!verifyStatus.status){
                        if(callBack)
                            callBack.call(node, verifyStatus.msg);
                        else
                            alert(verifyStatus.msg);
                        node.focus();
                        status = false;
                        break;
                    }
                }
            }
            if(verifyStatus.status == false){break;}
            result[name] = value;
        }
        if(status && flag){
            verifyNodes.val('');
        }

        return status ? result : false;
    };

    self.verify = verify;

    module.exports = self;

});

