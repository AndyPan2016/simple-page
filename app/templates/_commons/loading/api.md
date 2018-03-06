## 参数
loading不支持无参数的调用，部分参数会有默认值，。一个典型的自定义参数如下：
```
	var loading = require("loading", {
        url : 'http://ol.tgbus.com/v2_indexlist01/index_{page}.html',
        dataType : 'html',
        moreBtnText : '通过配置moreBtnText参数定义文字',
        render : function (ele, data) {
            var str = data.toString().replace(/<li[^>]*>[^<\/li>].*<\/li>/mg, '');
            console.log(str);
            ele.append()
        },

        request : function (index, url) {
            return {
                url : url.replace(/{page}/, index)
            }
        }
    })
```

### url [string]
数据源
当此处为空时,支持请求HTML数据及JSON数据，请配合request方法，返回一个请求URL。

### dataType [string] 必须
数据类型，支持HTML/JSON/JSONP

### moreBtnText [string]
按钮的文字