/**
*改回菜单式...
.弹出窗口应该可以改好看点

*/

/**
如果是电脑返回true
以后测试浏览器分布式计算
*/
function ispc() {
    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,
        ipad: false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;

    if (system.win || system.mac || system.xll || system.ipad) {
        return true;
    } else {

        return false;
    }
}

function Random78() {
}
//随机字符数字
Random78.getAbcNum = function (min, arrlen, arrstart, max, randomFlag) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    max = max || min;
    randomFlag = randomFlag || 0;//是否随机长度
    arrlen = arrlen || 36;//36小写+数字 62大小写+数字 10数字
    arrstart = arrstart || 10;//与arrlen配置 例：10,36即仅小写字母
    // 随机产生
    if (randomFlag) {
        range = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (var i = 0; i < range; i++) {
        str += arr[Math.floor(Math.random() * (arrlen - arrstart + 1)) + arrstart];
    }
    return str;
};

/**
 * 管理动态加载
 */
function Script78() { }
Script78.scriptsArray = [];
Script78.add = function (url, cache) {
    cache = cache || true;//缓存 
    //全局scriptsUrl
    var scriptsUrl = "/js/";
    if (url.indexOf("http") == -1) {
        url = scriptsUrl + url;
    }
    //循环script标记数组
    for (var s in Script78.scriptsArray) {
        //如果某个数组已经下载到了本地
        if (Script78.scriptsArray[s] == url) {

            return {
                //则返回一个对象字面量，其中的done之所以叫做done是为了与下面$.ajax中的done相对应
                done: function (method) {
                    if (typeof method == 'function') {  //如果传入参数为一个方法
                        method();
                    }
                }
            };
        }
    }
    //这里是jquery官方提供类似getScript实现的方法，也就是说getScript其实也就是对ajax方法的一个拓展
    var options = {
        dataType: "script",
        url: url,
        cache: true //其实现在这缓存加与不加没多大区别
    };
    if (cache)
        Script78.scriptsArray.push(url); //将url地址放入script标记数组中
    return $.ajax(options);
};

/**
 * config 全局设置
 */
var config78 = new config();
function config() {
    this.setting = {
        pt: '7788',//当前平台7788 qq weixin
        system: 'adslvps',//当前系统adslvps...
        isdebug: false,//是否输出调试信息
        divlist: [],//保存所有有效窗体 便于快捷键
        cidmy: 'd4856531-e9d3-20f3-4c22-fe3c65fb009c',//cidmy
        appid: ''//平台appid
    };
}

config.prototype._saveguest = function () {
    localStorage.setItem("uname", 'guest');
    localStorage.setItem("sid", 'GUEST888-8888-8888-8888-GUEST88GUEST');
    localStorage.setItem("cid", 'GUEST000-8888-8888-8888-GUEST00GUEST');
    localStorage.setItem("coname", '测试帐套');
    this.setRightTop();
    if (config78.setting.pt === '7788') {
        alert78("未检测到用户登录 进入游客模式 请勿保存重要数据<br/>"
            + "点击上方的实用功能或行业软件 可显示菜单<br/>"
            + "点击切换用户功能 即可登录(新用户微信扫码即可注册登录)", 15);

    }
};

/**
 * 页面初始化
 * @param option
 */
config.prototype.init = function (option, cb) {
    var self = this;
    this.setting = $.extend({}, this.setting, option);

    var main78 = $("#main78");
    localStorage.setItem("systemnow", self.setting.system);
    main78.load("/main_left.html #waitload", function () {
        //main78.prepend($("#waitload").html());

       

        //载入页面后
        pageloaded(self,cb);


        //cb();
    });



   

    //百度统计
    var _hmt = _hmt || [];    
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?314c036b7bb9d828f2a03a196af74cfe";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    

    //绑定快捷键
    Script78.add("base/jquery.hotkeys-0.7.9.min.js").done(function () {

        $(document).bind('keydown', function (e) {

            var key = e.keyCode;
            switch (key) {
                case 27:

                    for (var i = 0; i < config78.setting.divlist.length; i++) {
                        var id = config78.setting.divlist[i];
                        $('#' + id).find(".btncance").trigger("click");
                    }
                    return false;
                case 83:
                    if (!e.ctrlKey) return;

                    for (var i = 0; i < config78.setting.divlist.length; i++) {
                        var id = config78.setting.divlist[i];
                        $('#' + id).find(".btnsave").trigger("click");
                    }

                    return false;
            }

        });

    });
}

/**
 *切换帐套时会外部访问
 */
config.prototype.setRightTop = function () {
     
    if (localStorage.getItem("uname") == null) {
        localStorage.setItem("uname", "guest");
        localStorage.setItem("sid", "GUEST888-8888-8888-8888-GUEST88GUEST");
        localStorage.setItem("cid", "GUEST000-8888-8888-8888-GUEST00GUEST");
        localStorage.setItem("coname", "测试帐套");
    }
    $("#righttop").text(localStorage.getItem("coname") + ":" + localStorage.getItem("uname"));
};


/**
 * 时间对象的格式化
 */
Date.prototype.format = function (format) {

    if (typeof format === 'undefined')
        format = "yyyy-MM-dd hh:mm:ss";
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};



/**
 * 弹出窗口
 * @param message
 * @param timeToLive
 * @param options
 * @constructor
 */
function alert78(message, timeToLive, options) {
    //alert(message);
    var ttl = timeToLive || 3;
    var opt = $.extend({
        //title: "7788soft",
        //height: 200,
        //width: 385,
        //top: 5,
        //left: 7,
        idwin: guidnew78(),

        loaded: null,
    }, options || {});   
    var id = "win_" + opt.idwin;
    $("#" + id ).remove();

    $("body").append('<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="lbTxt' + id + '" aria-hidden="true">'
        + '<div class="modal-dialog"><div class="modal-content">'
        //头
        + '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">'
        + '&times;</button><h4 class="modal-title">7788SAAS平台</h4></div>'
        //body
        + '<div class="modal-body" id="lbTxt' + id + '">' + message + '<br/><br/>(' + ttl + '秒自动关闭)</div>'
        //footer
        + '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">关闭</button></div>'
        + '</div></div>');
    var divid = $("#" + id);
   
    divid.modal('show');
    if (opt.loaded != null)
        opt.loaded();
    setTimeout(function () {
        divid.modal('hide');
        divid.remove();
    }, ttl * 1000);
    return this;
}


//guid78
function guidnew78() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}

//url78
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};

//localStorage
//检测浏览器是否支持localStorage及cookie
$(function () {
    if (typeof localStorage != 'undefined') {
        //创建localStorage
        var localStorageClass = function () {
            this.options = {
                expires: 60 * 24 * 3600,
                domain: "778878.net"
            }
        };
        localStorageClass.prototype = {
            //初实化。添加过期时间
            init: function () {
                var date = new Date();
                date.setTime(date.getTime() + 60 * 24 * 3600);
                this.setItem('expires', date.toGMTString());
            },
            //内部函数 参数说明(key) 检查key是否存在
            findItem: function (key) {
                var bool = document.cookie.indexOf(key);
                if (bool < 0) {
                    return true;
                } else {
                    return false;
                }
            },
            //得到元素值 获取元素值 若不存在则返回 null
            getItem: function (key) {
                var i = this.findItem(key);
                if (!i) {
                    var array = document.cookie.split(';');
                    for (var j = 0; j < array.length; j++) {
                        var arraySplit = array[j];
                        if (arraySplit.indexOf(key) > -1) {
                            var getValue = array[j].split('=');
                            //将 getValue[0] trim删除两端空格
                            getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                            if (getValue[0] == key) {
                                return getValue[1];
                            } else {
                                return 'null';
                            }
                        }
                    }
                }
            },
            //重新设置元素
            setItem: function (key, value) {
                var i = this.findItem(key);
                document.cookie = key + '=' + value;
            },
            //清除cookie 参数一个或多一
            clear: function () {
                for (var cl = 0; cl < arguments.length; cl++) {
                    var date = new Date();
                    date.setTime(date.getTime() - 100);
                    document.cookie = arguments[cl] + "=a; expires=" + date.toGMTString();
                }
            }
        };
        var localStorage = new localStorageClass();
        localStorage.init();
    }
});

function api78(option) {

    var settings = $.extend({
        m: 'get',
        url: '',
        ajaxtype: "GET",//GET POST
        //pars: [],参数必须数组

        cache: 'random',//WEB缓存 空:全缓存 随机:不缓存 mid行缓存 bcid cid公司缓存 sid用户缓存
        mid: '',// guidnew78(),
        bcid: 'd4856531-e9d3-20f3-4c22-fe3c65fb009c',// 
        cid: '',
        //cols: ['all'],//返回哪些列['all']

        back: function (data) {
        },
        backpars: {},//回调传参
        getnumber: 1000,//获取多少行数据
        getstart: 0,//从哪行开始
        order: "idpk",//排序字段
        jsonp: 0,//jsonp
        v:18,
        uname: '',//用于报错

        apipt:null,//可指定调用ALI还是QQ 默认就自动
        //jsonbase64: 1,//已默认 pars cols数组转为字符       
    }, option || {});


    localStorage.setItem("sidref", new Date()); //维持登录1天
    if (jQuery.type(settings.pars) === 'string') {
        settings.pars = [settings.pars];
    }
    settings.cid = localStorage.getItem("cid");
    settings.sid = localStorage.getItem("sid");

    var isdebug = config78.setting.isdebug;

    var urlapi = "";

    //不跨域了 也不需智能识别了
    //var apis = Math.floor(Math.random() * 3);
    var tmps = settings.url.split("/");
    if (settings.apipt == null) {
        switch (tmps[1]) {
            case "vote":
            case "netmoney":
            case "stock":
            case "futures":
            case "futures3":
            case "testqq":
            case "account":
            case "game":
            case "gmwyjd":
            case "gmqmdg":
            case "gmqmgd":
            case "gmgjjp":
            case "gmbdwy":
            case "gmgjyp":
                settings.jsonp = 1;
                break;
        }
    } else if (settings.apipt == "qq") {
        settings.jsonp = 1;
    }
    urlapi = "/" + settings.url + "/" + settings.m;

    var pars = Base64['encode'](JSON.stringify(settings.pars)).replace('+', '*').replace('/', '-').replace('=', '.');
    if (settings.pars == null) pars = "";
    var cols = JSON.stringify(settings.cols);
    var data = {
        //uname: localStorage.getItem("uname")
        //,sid: settings.sid   
        pars: pars//下版没有也应该可以不传
        //, cols: cols//下版默认应该可以不传
        , jsonbase64: 1//下版默认为1
        //, bcid: settings.bcid
        //, cid: settings.cid
        //, mid: settings.mid
        //, getnumber: settings.getnumber
        //, getstart: settings.getstart, order: settings.order
        //, base64: true, json: 1
    }
    //if (settings.cols != "")
    //    data["cols"] = settings.cols;
    if (settings.bcid != "d4856531-e9d3-20f3-4c22-fe3c65fb009c")
        data["bcid"] = settings.bcid;
    if (settings.mid != "")
        data["mid"] = settings.mid;
    if (settings.getnumber != 1000)
        data["getnumber"] = settings.getnumber;
    if (settings.getstart != 0)
        data["getstart"] = settings.getstart;
    if (settings.order != "idpk")
        data["order"] = settings.order;
    if (settings.v != 17)
        data["v"] = settings.v;


    //缓存
    switch (settings.cache) {
        case "bcid":
            urlapi += "?cache=" + settings.bcid;
            break;
        case "cid":
            urlapi += "?cache=" + settings.cid;
            break;
        case "sid":
            urlapi += "?cache=" + settings.sid;
            break;
        case "mid":
            urlapi += "?cache=" + settings.mid;
            break;
        case "random":
            urlapi += "?cache=" + Math.random();
            break;
        case "":
            urlapi += "?cache=" + Math.random();
            break;
        default:
            urlapi += "?cache=" + settings.cache;
            break;
    }

    if (settings["jsonp"]) {
        data["jsonp"] = 1;
        var apis = Math.floor(Math.random() * 3);
        if (tmps[1] == "futures3")
            urlapi = "http://192.168.31.253" + urlapi;
        else
            urlapi = "http://qq.7788soft.com" + urlapi;

        // urlapi = "http://api" + apis + ".778878.net" + urlapi;


        $.jsonp({
            "url": urlapi,
            "data": {
                jsonp: settings.jsonp, uname: localStorage.getItem("uname"),
                sid: settings.sid, getnumber: settings.getnumber
                , bcid: settings.bcid, getstart: settings.getstart
                , cid: settings.cid, order: settings.order
                , mid: settings.mid, pars: pars, cols: cols
                , jsonbase64: 1, source: config78.setting.system
                ,v:settings.v

            },
            "success": function (data) {
                data = data.data;
                if (isdebug)
                    console.log(data);

                if (typeof data === "string" && data.indexOf("err:get u info err") >= 0) {
                    config78._saveguest()
                    alert78("登录状态已过期或用户在其它地点登录,请重新登录!", 10);
                    return;
                }
                settings.back(data, settings.backpars);
            },
            "error": function (d, msg) {
                console.log(d);
                console.log(msg);
            }
        });
    }
    else {

        $.ajax({
            type: settings.ajaxtype,
            url: urlapi,
            data: data,
            success: function (data) {
                //data = data.data;

                if (isdebug)
                    console.log(data);

                if (typeof data === "string" && data.indexOf("err:get u info err") >= 0) {
                    config78._saveguest()
                    alert78("登录状态已过期或用户在其它地点登录,请重新登录!", 10);
                    return;
                }
                else {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (e) {

                    }
                }
                settings.back(data, settings.backpars);
            },
            headers: {
                "sid": settings.sid
                , "uname": encodeURIComponent(localStorage.getItem("uname"))
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                settings.back(xhr.statusText, settings.backpars);
            }
        });
    }
}

//resizeInput
function resizeInput() {
    $input = $(this);
    var sDiv = $("<span />").text("M" + $input.val() + "M").appendTo("body"),
        size = sDiv.width();
    sDiv.detach();
    if (size < 40) size = 40;
    $input.css("width", size + 8);
}

//validate78
//must datetime date time mobile email num znum maxnum minnum maxlength cus
(function ($) {
    var methods = {
        bind: function (validate) {
            return this.each(function () {
                var $this = $(this);
                $this.data("validate", validate);
                $this.data("title", $this.attr("title"));
                $this.on('blur', Valida78.cshow);
            });
        }, yzshow: function () {
            return Valida78.cshow($(this));
        },//验证并显示
        check: function () {//仅用于验证就不用显示了
            var $this = $(this);
            return Valida78.test($this);
        }

    };



    function Valida78() {
    }

    /**
     * 验证并显示(以后说不定会加多种显示)
     */
    Valida78.cshow = function (obj) {
        var $this = $(this);
        if ($this.is(":text"))
            obj = $this;
        var back = Valida78.test(obj);
        if (back)
            Valida78.showStatus(obj, "ok");
        else
            Valida78.showStatus(obj, "false");
        return back;
    };

    //显示状态
    Valida78.showStatus = function (obj, status) {
        if (status == "ok") {
            obj.css("border-color", "green");
            obj.css("background-color", "white");
            obj.attr("title", "");
        } else {
            obj.css("border-color", "red");
            obj.css("background-color", "red");
            obj.attr("title", obj.data("title"));
        }
    };

    //验证是否OK
    Valida78.test = function (obj) {
        var back = true;

        if (obj.is(":text")) {
            var validate = obj.data("validate");
            if (validate == null)
                return true;
            $.each(validate, function (name, value) {
                var objvalue = obj.val();

                switch (name) {
                    case "cus":
                        if (objvalue === '') return true;
                        if (value.test(objvalue)) {
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "datetime":
                        if (objvalue === '') return true;
                        if (/^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])([-/.]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/.]?)(?:29|30)|(?:0?[13578]|1[02])([-/.]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2([-/.]?)29)\s(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/.test(objvalue)) {
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "time":
                        if (objvalue === '') return true;
                        if (/^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/.test(objvalue)) {
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "date":
                        if (objvalue === '') return true;
                        if (/^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])([-/.]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/.]?)(?:29|30)|(?:0?[13578]|1[02])([-/.]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2([-/.]?)29)$/.test(objvalue)) {
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "mobile":
                        if (objvalue === '') return true;
                        if (/^1[3|4|5|7|8][0-9]\d{8}$/.test(objvalue)) {
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "email":
                        if (objvalue === '') return true;
                        if (/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(objvalue)) {
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "znum"://整数
                        if (objvalue === '') return true;
                        if (/^-?(\d+)$/.test(objvalue)) {
                            obj.val(parseInt(obj.val()));
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "num":
                        if (objvalue === '') return true;
                        if (/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|\d+)$/.test(objvalue)) {
                            obj.val(parseFloat(obj.val()));
                            return true;
                        } else {
                            back = false;
                        }
                        return false;
                    case "maxnum":
                        if (objvalue > value) {
                            back = false;
                            return false;
                        }
                        break;
                    case "minnum":
                        if (objvalue < value) {
                            back = false;
                            return false;
                        }
                        break;
                    case "must":
                        if (value && objvalue === "") {
                            back = false;
                            return false;
                        }
                        break;
                    case "maxlength":
                        if (objvalue.length > value) {
                            back = false;
                            return false;
                        }
                        break;
                    case "minlength":
                        if (objvalue.length < value) {
                            back = false;
                            return false;
                        }
                        break;
                }
            });
        }
        return back;
    };

    $.fn.validate78 = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else {
            $.error(method + '方法不存在');
            return this;
        }

        return method.apply(this, arguments);
    };


})(jQuery);

//base64
(function (global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.Base64;
    var version = "2.1.8";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        buffer = require('buffer').Buffer;
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function (bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function (c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                    + fromCharCode(0x80 | (cc & 0x3f)))
                    : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                        + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + fromCharCode(0x80 | (cc & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                + fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function (u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function (ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16
                | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
                | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
            chars = [
                b64chars.charAt(ord >>> 18),
                b64chars.charAt((ord >>> 12) & 63),
                padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
            ];
        return chars.join('');
    };
    var btoa = global.btoa ? function (b) {
        return global.btoa(b);
    } : function (b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ? function (u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u))
            .toString('base64')
    }
        : function (u) { return btoa(utob(u)) }
        ;
    var encode = function (u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function (m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function (u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function (cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3)),
                    offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    | (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6)
                    | (0x3f & cccc.charCodeAt(1))
                );
        }
    };
    var btou = function (b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function (cccc) {
        var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
                | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
                | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0)
                | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [
                fromCharCode(n >>> 16),
                fromCharCode((n >>> 8) & 0xff),
                fromCharCode(n & 0xff)
            ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function (a) {
        return global.atob(a);
    } : function (a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ? function (a) {
        return (a.constructor === buffer.constructor
            ? a : new buffer(a, 'base64')).toString();
    }
        : function (a) { return btou(atob(a)) };
    var decode = function (a) {
        return _decode(
            String(a).replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function () {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function (v) {
            return { value: v, enumerable: false, writable: true, configurable: true };
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    // that's it!
    if (global['Meteor']) {
        Base64 = global.Base64; // for normal export in Meteor.js
    }
})(this);


//jquery.jsonp
(function ($) {

    // ###################### UTILITIES ##

    // Noop
    function noop() {
    }

    // Generic callback
    function genericCallback(data) {
        lastValue = [data];
    }

    // Call if defined
    function callIfDefined(method, object, parameters) {
        return method && method.apply(object.context || object, parameters);
    }

    // Give joining character given url
    function qMarkOrAmp(url) {
        return /\?/.test(url) ? "&" : "?";
    }

    var // String constants (for better minification)
        STR_ASYNC = "async",
        STR_CHARSET = "charset",
        STR_EMPTY = "",
        STR_ERROR = "error",
        STR_INSERT_BEFORE = "insertBefore",
        STR_JQUERY_JSONP = "_jqjsp",
        STR_ON = "on",
        STR_ON_CLICK = STR_ON + "click",
        STR_ON_ERROR = STR_ON + STR_ERROR,
        STR_ON_LOAD = STR_ON + "load",
        STR_ON_READY_STATE_CHANGE = STR_ON + "readystatechange",
        STR_READY_STATE = "readyState",
        STR_REMOVE_CHILD = "removeChild",
        STR_SCRIPT_TAG = "<script>",
        STR_SUCCESS = "success",
        STR_TIMEOUT = "timeout",

        // Window
        win = window,
        // Deferred
        Deferred = $.Deferred,
        // Head element
        head = $("head")[0] || document.documentElement,
        // Page cache
        pageCache = {},
        // Counter
        count = 0,
        // Last returned value
        lastValue,

        // ###################### DEFAULT OPTIONS ##
        xOptionsDefaults = {
            //beforeSend: undefined,
            //cache: false,
            callback: STR_JQUERY_JSONP,
            //callbackParameter: undefined,
            //charset: undefined,
            //complete: undefined,
            //context: undefined,
            //data: "",
            //dataFilter: undefined,
            //error: undefined,
            //pageCache: false,
            //success: undefined,
            //timeout: 0,
            //traditional: false,
            url: location.href
        },

        // opera demands sniffing :/
        opera = win.opera,

        // IE < 10
        oldIE = !!$("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;

    // ###################### MAIN FUNCTION ##
    function jsonp(xOptions) {

        // Build data with default
        xOptions = $.extend({}, xOptionsDefaults, xOptions);

        // References to xOptions members (for better minification)
        var successCallback = xOptions.success,
            errorCallback = xOptions.error,
            completeCallback = xOptions.complete,
            dataFilter = xOptions.dataFilter,
            callbackParameter = xOptions.callbackParameter,
            successCallbackName = xOptions.callback,
            cacheFlag = xOptions.cache,
            pageCacheFlag = xOptions.pageCache,
            charset = xOptions.charset,
            url = xOptions.url,
            data = xOptions.data,
            timeout = xOptions.timeout,
            pageCached,

            // Abort/done flag
            done = 0,

            // Life-cycle functions
            cleanUp = noop,

            // Support vars
            supportOnload,
            supportOnreadystatechange,

            // Request execution vars
            firstChild,
            script,
            scriptAfter,
            timeoutTimer;

        // If we have Deferreds:
        // - substitute callbacks
        // - promote xOptions to a promise
        Deferred && Deferred(function (defer) {
            defer.done(successCallback).fail(errorCallback);
            successCallback = defer.resolve;
            errorCallback = defer.reject;
        }).promise(xOptions);

        // Create the abort method
        xOptions.abort = function () {
            !(done++) && cleanUp();
        };

        // Call beforeSend if provided (early abort if false returned)
        if (callIfDefined(xOptions.beforeSend, xOptions, [xOptions]) === !1 || done) {
            return xOptions;
        }

        // Control entries
        url = url || STR_EMPTY;
        data = data ? ((typeof data) == "string" ? data : $.param(data, xOptions.traditional)) : STR_EMPTY;

        // Build final url
        url += data ? (qMarkOrAmp(url) + data) : STR_EMPTY;

        // Add callback parameter if provided as option
        callbackParameter && (url += qMarkOrAmp(url) + encodeURIComponent(callbackParameter) + "=?");

        // Add anticache parameter if needed
        !cacheFlag && !pageCacheFlag && (url += qMarkOrAmp(url) + "_" + (new Date()).getTime() + "=");

        // Replace last ? by callback parameter
        url = url.replace(/=\?(&|$)/, "=" + successCallbackName + "$1");

        // Success notifier
        function notifySuccess(json) {

            if (!(done++)) {

                cleanUp();
                // Pagecache if needed
                pageCacheFlag && (pageCache[url] = { s: [json] });
                // Apply the data filter if provided
                dataFilter && (json = dataFilter.apply(xOptions, [json]));
                // Call success then complete
                callIfDefined(successCallback, xOptions, [json, STR_SUCCESS, xOptions]);
                callIfDefined(completeCallback, xOptions, [xOptions, STR_SUCCESS]);

            }
        }

        // Error notifier
        function notifyError(type) {

            if (!(done++)) {

                // Clean up
                cleanUp();
                // If pure error (not timeout), cache if needed
                pageCacheFlag && type != STR_TIMEOUT && (pageCache[url] = type);
                // Call error then complete
                callIfDefined(errorCallback, xOptions, [xOptions, type]);
                callIfDefined(completeCallback, xOptions, [xOptions, type]);

            }
        }

        // Check page cache
        if (pageCacheFlag && (pageCached = pageCache[url])) {

            pageCached.s ? notifySuccess(pageCached.s[0]) : notifyError(pageCached);

        } else {

            // Install the generic callback
            // (BEWARE: global namespace pollution ahoy)
            win[successCallbackName] = genericCallback;

            // Create the script tag
            script = $(STR_SCRIPT_TAG)[0];
            script.id = STR_JQUERY_JSONP + count++;

            // Set charset if provided
            if (charset) {
                script[STR_CHARSET] = charset;
            }

            opera && opera.version() < 11.60 ?
                // onerror is not supported: do not set as async and assume in-order execution.
                // Add a trailing script to emulate the event
                ((scriptAfter = $(STR_SCRIPT_TAG)[0]).text = "document.getElementById('" + script.id + "')." + STR_ON_ERROR + "()")
                :
                // onerror is supported: set the script as async to avoid requests blocking each others
                (script[STR_ASYNC] = STR_ASYNC)

                ;

            // Internet Explorer: event/htmlFor trick
            if (oldIE) {
                script.htmlFor = script.id;
                script.event = STR_ON_CLICK;
            }

            // Attached event handlers
            script[STR_ON_LOAD] = script[STR_ON_ERROR] = script[STR_ON_READY_STATE_CHANGE] = function (result) {

                // Test readyState if it exists
                if (!script[STR_READY_STATE] || !/i/.test(script[STR_READY_STATE])) {

                    try {

                        script[STR_ON_CLICK] && script[STR_ON_CLICK]();

                    } catch (_) { }

                    result = lastValue;
                    lastValue = 0;
                    result ? notifySuccess(result[0]) : notifyError(STR_ERROR);

                }
            };

            // Set source
            script.src = url;

            // Re-declare cleanUp function
            cleanUp = function (i) {
                timeoutTimer && clearTimeout(timeoutTimer);
                script[STR_ON_READY_STATE_CHANGE] = script[STR_ON_LOAD] = script[STR_ON_ERROR] = null;
                head[STR_REMOVE_CHILD](script);
                scriptAfter && head[STR_REMOVE_CHILD](scriptAfter);
            };

            // Append main script
            head[STR_INSERT_BEFORE](script, (firstChild = head.firstChild));

            // Append trailing script if needed
            scriptAfter && head[STR_INSERT_BEFORE](scriptAfter, firstChild);

            // If a timeout is needed, install it
            timeoutTimer = timeout > 0 && setTimeout(function () {
                notifyError(STR_TIMEOUT);
            }, timeout);

        }

        return xOptions;
    }

    // ###################### SETUP FUNCTION ##
    jsonp.setup = function (xOptions) {
        $.extend(xOptionsDefaults, xOptions);
    };

    // ###################### INSTALL in jQuery ##
    $.jsonp = jsonp;

})(jQuery);

// h+ 下拉控制
$(document).on('click', '[ui-nav] a', function (e) {
    var $this = $(e.target), $active;
    $this.is('a') || ($this = $this.closest('a'));

    $active = $this.parent().siblings(".active");
    $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);

    ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
    $this.parent().toggleClass('active');

    $this.next().is('ul') && e.preventDefault();
});

//h+右边放大缩小控制
$(document).on('click', '[ui-toggle-class]', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this.attr('ui-toggle-class') || ($this = $this.closest('[ui-toggle-class]'));

    var classes = $this.attr('ui-toggle-class').split(','),
        targets = ($this.attr('target') && $this.attr('target').split(',')) || Array($this),
        key = 0;
    $.each(classes, function (index, value) {
        var target = targets[(targets.length && key)];
        $(target).toggleClass(classes[index]);
        key++;
    });
    $this.toggleClass('active');

});

/**
 * 首页载入HTML完成后
 */
function pageloaded(self, cb) {
    var code = $.getUrlParam("code")
    var codesave = localStorage.getItem("wxcode")
    $("#logout").click(function () {
        localStorage.setItem("uname", "guest");
        localStorage.setItem("sid", "GUEST888-8888-8888-8888-GUEST88GUEST");
        localStorage.setItem("cid", "GUEST000-8888-8888-8888-GUEST00GUEST");
        localStorage.setItem("coname", "测试帐套");
        self.setRightTop();
        alert78("已安全注销!");
    });

    $("#lbright-sidebar").click(function () {
        $("#right-sidebar").toggleClass("sidebar-open");
    })

    if (code) {
        if (code == codesave) {            
            cb();
            return;
        }
        localStorage.setItem("wxcode", code)
        //在微信平台清除用户
        if ($.getUrlParam("state") == "weixin") {
            localStorage.removeItem("sid");
        }
        //如果没有保存用户名 又不是点击微信菜单过来的 清除
        if (!$.getUrlParam("local") && !localStorage.getItem("cbSave")
            && new Date().getHours() - new Date(Date.parse(localStorage.getItem("sidref"))).getHours() >= 2
        ) {
            localStorage.removeItem("sid");
        }
        if (localStorage.getItem("sid") == null) {
            //这里还应该加上一个通过URL参数带SID 直接登录
            //淘宝登录 微信登录
            var appid = $.getUrlParam("app_id");
            var auth_code = $.getUrlParam("auth_code");
            if (appid === null)
                appid = $.getUrlParam("state");
            switch (appid) {
                case "weixin":
                    api78({
                        url: "api7817/ucenter/lovers",
                        m: 'loginWeixin'
                        , pars: [$.getUrlParam("code")],
                        back: function (data) {
                            if (data[0].length == 36) {
                                localStorage.setItem("u", data[3]);
                                localStorage.setItem("uname", data[3]);
                                localStorage.setItem("sid", data[0]);
                                localStorage.setItem("cid", data[1]);
                                localStorage.setItem("coname", data[2]);
                                localStorage.setItem("unameweixin", data[4]);
                                localStorage.setItem("sidref", new Date());
                                self.setRightTop();
                                cb();
                            }
                            else
                                alert78(data);
                        }
                    });
                    break;
                case "2015072400185421":
                    api78({
                        url: "api7817/ucenter/lovers",
                        m: 'loginAli'
                        , pars: [auth_code],
                        back: function (data) {
                            if (data[0].length == 36) {
                                localStorage.setItem("u", data[3]);
                                localStorage.setItem("uname", data[3]);
                                localStorage.setItem("sid", data[0]);
                                localStorage.setItem("cid", data[1]);
                                localStorage.setItem("coname", data[2]);
                                localStorage.setItem("unameali", data[4]);
                                localStorage.setItem("sidref", new Date());
                                self.setRightTop();
                                cb();
                            }
                            else
                                alert78(data);
                        }
                    });
                    break;
                default:
                    self._saveguest();
                    break;
            }
            return;
        }
    }
    self.setRightTop();

    
    cb();
}
