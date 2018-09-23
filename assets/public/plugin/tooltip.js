(function (win) {

    /*
     *@ version :  1.0
     *@ datetime:  2018/1/26
     *@ author  :  gtshen
     */


    /* 默认配置 */
    var defaults = {
        'url': '',
        'dom': 'tooltip',
        /* tooltip 盒子的类名 */
        'tips': 'tips',
        /* tooltip 元素上用于保存内容的盒子属性名 */
        'type': 1,
        /* tooltip 的类型，1表示图片，2表示文字 */
        'loading': '',
        /* 是否有loading图片，值为loading图片的URL，一般为相对路径 */
        'tipBoxId': 'tip-content-box',
        /* 存放tooltip内容盒子的ID */
        'textPosition': 'center' /* 定义文字类型的tooltip内容盒子相对于tooltip盒子的对齐方式，值有: left，center(默认)，right */
    };

    /* 通过指定类名获取元素数组 */
    function getClass(className) {

        var elements = [];
        var allElement;
        var pattern = new RegExp('\\s*' + className + '\\s*');


        if (document.querySelectorAll) {
            return document.querySelectorAll('.' + className);
        } else {

            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            }

            allElement = document.getElementsByTagName('*');

            for (var i in allElement) {
                if (pattern.test(allElement[i].className)) {
                    elements.push(allElement[i]);
                }
            }

            return elements;
        }
    }

    /* 获取tooltip盒子的位置 */
    function getPos(obj) {

        var offsetLeft = obj.offsetLeft;
        var offsetTop = obj.offsetTop;
        var offsetWidth = obj.offsetWidth;
        var offsetHeight = obj.offsetHeight;
        var parentElement = obj.offsetParent;

        while (offsetLeft += parentElement.offsetLeft, offsetTop += parentElement.offsetTop, parentElement = parentElement.offsetParent) {
            ;
        }
        return {
            'left': offsetLeft,
            'top': offsetTop,
            'width': offsetWidth,
            'height': offsetHeight
        };
    }

    /* 移开时用于删除存放tooltip内容的盒子 */
    function remove(id) {

        var element = document.getElementById(id);
        if (element && element.parentNode && element.tagName != 'BODY') {
            element.parentNode.removeChild(element);
        }

    }

    /* 处理图片类型tooltip的显示 */
    function handleIMG(img, oDiv, pos, params) {

        var width = img.width || img.offsetWidth;
        var height = img.height || img.offsetHeight;
        var left = pos.left;
        var top = pos.top;
        var tw = pos.width;
        var th = pos.height;
        var ch = Math.max(document.documentElement.offsetHeight || document.body.offsetHeight, document.documentElement.scrollHeight);
        var cw = document.documentElement.clientWidth || document.body.clientWidth;

        if (height + top + th > ch) {
            oDiv.style.top = top - height + 'px';
        }

        if (width + left > cw) {
            oDiv.style.left = left - width + tw + 'px';
        }

        oDiv.innerHTML = '';
        oDiv.appendChild(img);
        oDiv.style.display = "block";
    }

    /* 处理文字类型tooltip的显示 */
    function handleText(text, oDiv, pos, selfWidth, params) {

        var width = 0;
        var height = 0;

        oDiv.style.display = "block";
        oDiv.innerHTML = text;

        width = oDiv.offsetWidth;
        height = oDiv.offsetHeight;

        if (params.textPosition === 'right') {
            oDiv.style.left = pos.left - width + selfWidth + 'px';
        } else if (params.textPosition === 'center') {
            oDiv.style.left = pos.left - (width - selfWidth) / 2 + 'px';
        }

    }

    /* tooltip 核心功能，入口函数 */
    function tooltip(params) {

        /* 加载自定义配置参数 */
        var params = params || {};

        /* 将自定义参数与默认参数循环比较*/
        for (var k in defaults) {
            if (params[k] === undefined) {
                params[k] = defaults[k];
            }
        }

        var tips = params.tips;
        var tipBoxId = params.tipBoxId;
        var dom = getClass(params.dom);
        var type = params.type;
        var loading = params.loading;


        for (var i = 0; i < dom.length; i++) {

            dom[i].onmouseover = function (e) {

                var pos = getPos(this);
                var img = new Image();
                var source = params.url ? params.url + this.getAttribute(tips) : this.getAttribute(tips);
                var oDiv = document.createElement('DIV');
                var selfWidth = this.offsetWidth;

                oDiv.id = tipBoxId;
                oDiv.style.cssText = 'display:none;position:absolute;left:' + pos.left + 'px;top:' + (pos.top + pos.height) + 'px;z-index:999999';

                //事先插入DOM，隐藏掉，防止img onload事件与 oDiv onmouseout事件异步操作，无法正确删除插入的DOM。
                document.body.appendChild(oDiv);

                if (loading && type === 1) {
                    oDiv.innerHTML = '<img src="' + params.loading + '" />';
                    oDiv.style.display = "block";
                }

                if (source && type === 1) {

                    if (window.attachEvent) {
                        img.attachEvent('onload', function () {
                            handleIMG(img, oDiv, pos, params);
                        });
                    } else {
                        img.onload = function () {
                            handleIMG(img, oDiv, pos, params);
                        }
                    }

                    img.onerror = onabort = function () {
                        handleIMG(img, oDiv, pos, params);
                    }

                    //support commonJS
                    if (typeof module != 'undefined' && typeof exports === 'object') {
                        img.src = require('../../view/index/img/' + source + '.jpg');
                    } else {
                        img.src = source;
                    }

                }

                if (source && type === 2) {
                    handleText(source, oDiv, pos, selfWidth, params);
                }

            };

            dom[i].onmouseout = function () {
                remove(tipBoxId);
            }

        }

    }

    if (typeof module != undefined && typeof exports === 'object') {
        module.exports = tooltip;
    } else {
        win.tooltip = tooltip;
    }

}(window));