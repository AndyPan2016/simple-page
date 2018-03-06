## 参数
Barrage不支持无参数的调用，部分参数会有默认值，。一个典型的自定义参数如下：
```
   var barrage = require('barrage', {
        ele : '#j-barrage',
        //dataUrl : 'http://hdsupport.tgbus.com/api/index?aid=67&cid=2&s=get_targets',
        speed: 2,
        row: 5,
        number: 40,
        hoverStop: true,
        direction: "right",
        margin: 50,
        itemNumber : 3,

        dataScreen : function (data) {
            return data.result.list;
        },

        structure: function (data, index, pos) {
            return '<li class="barrage-item">' + data.title + '</li>';
        },

        onChang : function (index) {
           // console.log(index)
        }
    });
    
    //也可以这样调用一些函数
    barrage.dataScreen = function (data) {
        return data.result.list;
    }
    
```
### dataUrl [string]
JSON数据源
当此处为空时，读取box内的数据，多为CMS渲染。


### box [string] 必须
容器，必须为ID选择符。

### direction [string]
弹幕移动方向，默认为'left'。

### speed [number]
弹幕移动速度，值越大，速度越快，支持非零的所有正数。默认为1。

### row [number]
加载多少行弹幕，默认为2，仅作用与direction值为'left'时，其他状态无效。

### number [number]
页面允许生成多少条数据，默认为4。

### margin [Array || 0]
弹幕间距，值为数组时，表示随机生成弹幕间距区间，第一个数为最小值，第二个值为最大值。若要固定间距，请使用CSS，默认值为0。direction值为"left"时，设置弹幕margin-right。direction值为"top"时，设置弹幕margin-bottom。

### hoverStop [Boolean]
是否hover暂停弹幕，当值为true时开启。默认为false。

## 回调函数

- structure

### structure(item, index, pos) [function]
```
    structure : function (item,index) {
         return '<li class="barrage-item">'+ data +'</li>';
    }
```

这个参数允许完全自定义弹幕元素结构。接受数据及索引作为参数。如出现单双数弹幕样式不一样，请使用nth-child选择器。

- dataScreen
### dataScreen(data) [function]
```
    dataScreen : function (data) {
        return data.result.list;
    },
```
返回ajax返回的数据，请将列表返回。

- onChang
### onChang(data) [function]
当弹幕删除添加时触发
