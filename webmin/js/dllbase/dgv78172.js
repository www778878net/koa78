/**
 * 修改为传统模式
 */
var dgv78 = function () {

};

dgv78.prototype.settings = {
    pg: 'page',// 外面包的那个 ex:rmb
    url: null,  //必须
    cols: [],//必须{name,head,title,mode(""不能修改 HTML不关闭>)
    //, v,h
    //, def(新增默认值或Select的option)
    //, tooltip(说明文字 必填数字日期自动)
    //,showmode("" 正常显示状态)   
    getm: 'get',//get方法可自定义
    m: 'm',//修改方法可自定义 
    dbcols: ["all"],//获取的列名 all全部
    des: [],//说明
    canclick: 2,//0不可单击 1单选 2多选   
    cache: 'random',//get方法WEB缓存 空:全缓存 随机:不缓存 mid行缓存 bcid cid公司缓存 sid用户缓存
    //idmodel: "",//弃用 如果不用模态窗的话是否模态窗口    

    idmodel: "",//是否模态窗口 暂不考虑
    title: "",//页头   
    commonhelp:true,//常用帮助
    qqservices: "657225485",//客服QQ可以变    
    tb: '',//自动 rmb_wintb表格窗体id 方便操作
    bcid: 'd4856531-e9d3-20f3-4c22-fe3c65fb009c',//bcid
    order: 'idpk',//排序字段
    getstart: 0,//post78
    getnumber: 1000,//post78

    //按钮
    btnstart: null,//向前增加按钮
    btnend: null,//向后增加按钮
    divtop: '',//窗体DIV头部添加
    divleft: '',//表格左边添加
    tbtop: '',//表格上部按钮  
    rowtop: '',//表格行按钮
    tbhead:'',//表格头部第一行第一列自定义
    showdefmenu: true,//是否显示默认按钮
    candel: true,//是否显示删除按钮
    canadd: true,//是否显示添加按钮
    canmodify: true,//是否可以更改
    canremark: true,//是否显示自定按钮
    showpagenext: true,//是否显示翻页按钮
    showexcel: true,//是否显示导出按钮

    isLoading: true,//是否载入数据中 不重复载入
    isOrderAsc: true,//排序 点一次正排2次反排
    canalert: true,//出错是否弹出提示
    //事件
    oninibef: null,//初始化HTML前事件
    oninihtml: null,//初始化HTML后事件
    ongetcus: null,//载入自定义栏位后（ex:多dgv)
    onloadbef: null,//载入数据前 有这个初始不会载入数据
    onloaded: null,//行载入后
    onloadrowbef:null,//行写入前
    onallloaded: null,//全部载入后调用 暂不返回
    onadding: null,//新增前调用 返回false不新增
    onadded: null,//新增后调用
    onsaveing: null,//(mid)保存前函数 返回false不保存
    ontbclick: null,//单击事件 (传入td) 暂不返回
    ondelbef: null,//删除之前
    ondeleted: null,//删除之后
    onming: null,//行进入编辑模式前 返回false不进入
    onmodify: null,//行进入编辑模式后 

    apipt: null,//可设置调用ALI或QQ 默认自动
    loadrows: null,//覆盖载入数据方法 传入pars(array)
    loadrowspars: null,//载入数据方法参数array 传入wait不更新
    getcustomcolspars: '',//载入自定义控件参数
    mpars: null,//保存方法 追加参数array
    rowlen:0,//获取的行数
    


};

/**
 * 初始化
 */
dgv78.prototype.init = function (options) {
    var that = this;
    this.settings = $.extend({}, this.settings, options);
    this.settings.basiccols = [{ name: "remark", head: '备注', h: 0 }
        , { name: "remark2", head: '自定栏位1', h: 1 }, { name: "remark3", head: '自定栏位2', h: 1 }
        , { name: "remark4", head: '自定栏位3', h: 1 }, { name: "remark5", head: '自定栏位4', h: 1 }
        , { name: "remark6", head: '自定栏位5', h: 1 }
        , { name: "upby", head: '修改人', mode: "" }, { name: "uptime", head: '修改时间', mode: "" }
    ]
    this.settings.cols = options.cols.concat(this.settings.basiccols);
    //this.settings.iddiv =  "div_tb";
    if (this.settings.tb == "")
        this.settings.tb = "tb_" + this.settings.pg;

    if (!that.settings.showdefmenu) {
        that.settings.canadd = false;
        that.settings.canmodify = false;
        that.settings.candel = false;
        that.settings.canremark = false;
    }

    //补全默认值
    var cols = this.settings.cols;
    for (var i = 0; i < cols.length; i++) {

        if (!cols[i].v) cols[i].v = {};
        if (cols[i].mode == undefined) {
            cols[i].mode = '<input type="text" ';
        }
        //补全tooltip
        if (!cols[i].tooltip) {
            if (cols[i].v.num) {
                cols[i].tooltip = cols[i].head + "必须输入数字型";
                cols[i]["def"] = 1;
            }
            if (cols[i].v.date) {
                cols[i].tooltip = cols[i].head + "必须输入日期型";
                var today = new Date();
                cols[i]["def"] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            }

            if (cols[i].v.time) {
                cols[i].tooltip = cols[i].head + "必须输入时间(00:00:00)";
                cols[i]["def"] = "00:00:00";
            }

            if (!cols[i].tooltip && cols[i].v.must)
                cols[i].tooltip = cols[i].head + "必须输入";
        }
        //mode+tooltip
        if (cols[i].tooltip) {
            cols[i].mode += ' title="' + cols[i].tooltip + '"';
        }
        //闭合
        if (cols[i].mode != "")
            cols[i].mode += "/>";

    }

    var pg = this.settings.pg;
    var div = $("#win_" + pg);

    div.data("dgv", that);

    this._inithtml();
    this._initcustom();
    this._bindevent();
  

};

/**
*5秒后超时
*/
dgv78.prototype.fixIsloading = function () {
    var that = this;
    setTimeout(function () {
        that.settings.isLoading = false;
    }, 5000);
}

/**
 * 绑定事件
 */
dgv78.prototype._bindevent = function () {
    var that = this;
    var id = that.settings.tb;
    var tb = $("#" + id);
    var pgdiv = $("#headtb_" + that.settings.pg);

    //自定栏位
    pgdiv.find(".window_top .pagecus").click(function () {
        that._btncus();
    })

    //help
    pgdiv.find(".window_top .pagehelp").click(function () {
        addWin78(
            {
                title: that.settings.title + "帮助"
                , content: that.settings.deshtml
                , idwin: that.settings.tb + "help"
            });
    })
    //刷新按钮
    pgdiv.find(".window_top .pageref").click(function () {
        if (that.settings.isLoading) {
            alert78("载入数据中!请等待....");
            return;
        }
        that.fixIsloading();
        that.settings.isLoading = true;
        that.settings.getstart = 0;
        if (that.settings.onloadbef != null)
            that.settings.onloadbef();
        else
            that.loadrows();
        that.setinformation("重新载入数据");
    })

    //导出
    pgdiv.find(".window_top .pageexcel").click(function () {
        alert78("打开如果有乱码<br/>请使用wps或使用记事本另存为ANSI编码<br/>无法打开建议使用CHROME浏览器", 30);
        that.JSONToCSVConvertor();
    })

    //刷页
    pgdiv.find(".window_top .pagenext").click(function () {
        if (that.settings.isLoading) {
            alert78("载入数据中!请等待....");
            return;
        }
        that.fixIsloading();
        that.settings.isLoading = true;
        that.settings.getstart += that.settings.getnumber;
        if (that.settings.onloadbef != null)
            that.settings.onloadbef();
        else
            that.loadrows();
        that.setinformation("翻页载入数据");
    });

    //表格内功能
    tb.click(function (event) {
        var even = $(event.target);
        var idrow = even.attr("data-idrow");


        //修改
        if (even.hasClass("btnm")) {
            that._btnm(even);
        }
        if (even.hasClass("btncance")) {
            that.trReback(idrow);
        }
        if (even.hasClass("btnsave")) {
            that._btnsave(idrow);
        }
        if (even.hasClass("btndel")) {
            that._btndel();
        }
        if (even.hasClass("btnadd")) {
            that._btnadd();
        }

        if (even.is("th")) {

            //if (row.attr("id") == that.settings.tb + "_head") {

            // }
            that._tbFill(even.text());
            return;
        }

        if (even.is("td")) {
            var row = even.parents("tr");

            switch (that.settings.canclick) {
                case 0:

                    break;
                case 2://多选
                    if (row.attr('class') == 'tdModify') {
                        row.removeClass();
                    } else {
                        row.addClass("tdModify");

                    }
                    break;
                case 1://单选
                    tb.find('tr.tdModify').each(function () {
                        $(this).removeClass();
                    });
                    if (row.attr('class') == 'tdModify') {
                        row.removeClass();
                    } else {
                        row.addClass("tdModify");

                    }
                    break;
            }
        }
    })



}


/**
 * 自定
 */
dgv78.prototype._btncus = function () {
    var that = this;
    var id = that.settings.tb;
    var tb = $("#" + id);

    alert78("<table id='customtb" + id + "'><thead><tr><th>序号</th><th>自定义栏位</th></tr></thead>"
        + "<tbody><tr><th>1</th><td><input type='text'/></td></tr><tr><th>2</th><td><input type='text'  /></td>"
        + "</tr><tr><th>3</th><td><input type='text'/></td></tr><tr><th>4</th><td><input type='text' /></td>"
        + "</tr><tr><th>5</th><td><input type='text'  /></td></tr></tbody></table>"
        + '<button class="btn btn-primary"  type="button" id="btnCus' + id + '">确认</button>'
        + "<p class='pShuomin'>说明:</p>"
        + "<p class='pShuominLine'>.可以增加5个自定义栏位</p><p class='pShuominLine'>.确认后刷新下页面就生效了</p>"
        + "<p class='pShuominLine'>.想删除自定义栏位设置为空即可</p>"
        , 180, {
            idwin: "alert_cus" + id
            , height: 500
            , title: that.settings.title + "自定栏位"
            , loaded: function () {
                //显示自定栏位
                var custom = $("#customtb" + id);
                var j = 0;
                custom.find(":text").each(function () {
                    $(this).val(that.settings.customcols[j++]);
                });
                $("#btnCus" + id).click(function () {
                    var cols = "";
                    var i = 0;
                    custom.find(":text").each(function () {
                        var tb = $(this);
                        if (i != 0)
                            cols += "|";
                        cols += tb.val();
                        i++;
                    });

                    api78({
                        url: that.settings.url
                        , m: 'mSaveCustomCols'
                        , pars: [cols, that.settings.getcustomcolspars]
                        , ajaxtype: "POST"
                        , back: function (data) {
                            data = data["back"]
                            var tmp = "";
                            try {
                                tmp = data.split("|");
                            } catch (e) {

                            }
                            if (tmp == "")
                                tmp = "||||".split("|");
                            that.settings.customcols = tmp;

                            that._chagetbByCus(that);
                        }
                    });
                    $("#win_alert_cus" + id).remove();
                })
            }
        })
}


/**
 * 新增功能
 */
dgv78.prototype._btnadd = function () {
    var that = this;

    var id = that.settings.tb;
    var tb = $("#" + id);
    if (that.settings.onadding != null) {
        if (!that.settings.onadding()) {
            return;
        }
    }

    var idrow = guidnew78();
    var newrow = "<tr id='" + idrow + "'><td>";
    newrow += '<a href="#" class="btnsave text-success"   data-idtb="' + id + '"  data-idrow="' + idrow + '">保存</a>'
        + '&nbsp;&nbsp;<a href="#" class="btncance text-danger"  data-idtb="' + id + '"  data-idrow="' + idrow + '">取消</a></td>';
    var cols = that.settings.cols;


    //var defval;
    for (var i = 0; i < cols.length; i++) {
        newrow = newrow + "<td>" + cols[i].mode + "</td>";
    }
    newrow = newrow + "</tr>";
    tb.children("tbody").append(newrow);

    var row = $("#" + idrow);
    var i = 0;
    row.children('td').each(function () {
        var td = $(this);
        //隐藏可能的自定义栏位

        if (tb.find("tr:first").children("th:eq(" + i + ")").is(":hidden"))
            td.hide();
        i++;
    });

    //默认值
    i = -1;
    row.children('td').each(function () {
        if (i == -1) {
            i++;
            return;
        }
        var td = $(this);
        if (cols[i].mode.indexOf('<input') >= 0) {
            if (cols[i].v != null) {
                var input = td.children(':text');
                //初始值
                //if (cols[i].v.num  ) {
                //    input.val(0);
                //}
                //if (cols[i].v.date  ) {
                //    input.datepicker().datepicker("option", "dateFormat", "yy-mm-dd");
                //    var today = new Date();
                //    input.val(today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
                //}
                if (cols[i].def) input.val(cols[i].def);

                input.validate78('bind', cols[i].v);
            }
        } else if (cols[i].mode.indexOf('<select') >= 0) {
            td.html(cols[i].mode);
            td.children('select').append(cols[i].def);
        }
        i++;
    });
    row.find(":text:first").focus();

    if (that.settings.onmodify != null)
        that.settings.onmodify(row);
    row.find(":text").attr("onfocus", "this.select()").each(resizeInput).keydown(resizeInput);//.attr("onmouseover", "this.select()")
    that.EnterToTab();
}

/**
 * 删除按钮
 */
dgv78.prototype._btndel = function () {
    var that = this;
    var id = that.settings.tb;
    var tb = $("#" + id);

    var rows = tb.find('.tdModify');
    if (rows.length == 0) {
        alert78("请单击选中一行或多行 再删除");
        return;
    }

    //弹出对话框
    alert78('<button class="btn btn-danger"  type="button" id="btndeleteDo'
        + id + '">确认删除</button>', 20, {
            idwin: "alert_deletedo" + id,
            loaded: function () {
                
                $("#btndeleteDo" + id).click(function () {
                    $("#win_alert_deletedo" + id).remove();
                    that.del(that);
                    //$("#win_alert_deletedo" + id).modal('hide');
                  
                    //$(".in").remove()
                })
            }
        })
}

/**
 * 删除功能
 */
dgv78.prototype.del = function (that) {
    //var that = this;    
    var id = that.settings.tb;
    var tb = $("#" + id);

    

    var rows = tb.find('.tdModify');
    if (rows.length == 0) {
        alert78("请单击选中一行或多行 再删除");
        return;
    }

    rows.each(function () {
        var row = $(this);
        if (that.settings.ondelbef != null) {
            var rowdate = row.data("source");
            if (!that.settings.ondelbef(rowdate)) {
                return;
            }
        }
        api78({
            url: that.settings.url
            , m: 'del'
            , mid: row.attr("id")
            , ajaxtype: "POST"
            , apipt: that.settings.apipt
            , back: function (data) {
                data = data["back"]
                if (data.length === 36) {
                    $("#" + data).remove();
                    if (that.settings.ondeleted != null)
                        that.settings.ondeleted(data);


                }
                else
                    alert78(" 删除失败:" + data);
            }
        });
    });
}


/**
 * 修改功能
 * @private
 */
dgv78.prototype._btnsave = function (idrow) {
    var that = this;

    var id = that.settings.tb;
    var tb = $("#" + id);
    if (that.settings.onsaveing != null) {
        if (!that.settings.onsaveing(idrow)) {
            return;
        }
    }


    var cols = that.settings.cols;
    var row = $("#" + idrow);
    var i = -1;
    var btn = row.find(".btnsave");

    btn.prop("disabled", true);

    var allcheck = true;
    var datas = [];

    row.find('td').each(function () {
        if (i == -1) {
            i++;
            return;
        }

        var td = $(this);
        var val;
        if (cols[i].mode.indexOf('<input') >= 0) {
            var input = td.children('input');
            if (!input.validate78('yzshow')) {
                allcheck = false;
                return false;
            }
            if (td.data("spar") == null) {
                val = input.val();
            } else {
                val = td.data("spar");
            }
        } else if (cols[i].mode.indexOf('<select') >= 0) {
            if (td.data("spar") == null)
                val = td.children('select').val();
            else
                val = td.data("spar");
        }
        if (val != null)
            datas.push(val);
        i++;
    });

    if (!allcheck) {
        btn.prop("disabled", false);
        return;
    }

    var parms = [];


    if (that.settings.mpars !== null)
        $.merge(parms, that.settings.mpars);
    $.merge(parms, datas);


    api78({
        url: that.settings.url
        , m: that.settings.m
        , mid: idrow
        , pars: parms
        , ajaxtype: "POST"
        , apipt: that.settings.apipt
        , back: function (data) {
            data=data["back"]
            that.trReback(data);

            if (that.settings.onsaved != null) {
                that.settings.onsaved(idrow);
            }


        }
    });

    that.setinformation("已提交保存!");
};

dgv78.prototype.setinformation = function (info) {
    var that = this;
    var divinfo = $("#win_" + that.settings.pg).find(".window_bottom");
    divinfo.html(info);
};

/**
 * 返回显示模式 data:行ID
 */
dgv78.prototype.trReback = function (data) {
    var that = this;

    if (data == null) {
        return;
    }
    var id = that.settings.tb;
    var tb = $("#" + id);

    if (data.length == 36) {
        var row = tb.find('#' + data);

        var i = -1;
        var cols = that.settings.cols;
        row.children('td').each(function () {
            if (i == -1) {
                //变为保存 取消
                var tmp = '<a href="#" class="btnm"   data-idtb="' + id + '"  data-idrow="' + data + '">修改</a>';
                tmp += that.settings.rowtop;
                row.children('td:eq(0)').html(tmp);
                i++;
                return;
            }
            var td = $(this);
            if (cols[i].mode != null
                && cols[i].mode.indexOf('<select') >= 0) {
                td.html(td.find('select option:selected').text());
            } else {
                td.html(td.children(':text').val());
            }
            td.removeData('old');
            i++;
        });

        row.children('td:eq(' + (i - 1) + ')').text(localStorage.getItem("uname"));

        row.removeClass();

    }
    else {

        //新用户帮他建帐套
        if (data.indexOf("为避免误存重要资料到测试帐套") === 0) {
            var pars = data.split(",");
            if (pars[1].length === 36) {
                localStorage.setItem("cid", pars[1]);
                localStorage.setItem("coname", localStorage.getItem("uname"));
                config78.setRightTop();
                that.loadrows();
                //$('#' + id + 'btnCancel').trigger("click");
            }
            data = pars[0];
        }
        alert78("更新失败:" + data, 30);


    }


};

//修改按钮
dgv78.prototype._btnm = function (even) {
    var that = this;
    var id = that.settings.tb;
    var idrow = even.attr("data-idrow");
    var row = $("#" + idrow);
    var cols = that.settings.cols;
    var length = cols.length;


    if (that.settings.onming != null) {
        if (!that.settings.onming(row)) {
            return;
        }
    }

    var i = -1;
    row.children('td').each(function () {

        if (i == -1) {
            //变为保存 取消
            var tmp = '<a href="#" class="btnsave text-success"   data-idtb="' + id + '"  data-idrow="' + idrow + '">保存</a>'
                + '&nbsp;&nbsp;<a href="#" class="btncance text-danger"  data-idtb="' + id + '"  data-idrow="' + idrow + '">取消</a>';
            row.children('td:eq(0)').html(tmp);
            i++;
            return;
        }
        var td = $(this);
        //var td = row.children('td:eq(' + i + 1 + ')');

        //if (cols[i].showmode) {

        //} else {
        td.data('old', td.text());
        //}



        if (cols[i].mode.indexOf('<input') >= 0) {
            td.html(cols[i].mode);

            var input = td.children(':text');

            if (cols[i].v != null) {
                if (cols[i].v.date != null) {
                    //input.datepicker().datepicker("option", "dateFormat", "yy-mm-dd");
                    input.datepicker({
                        format: 'yyyy-mm-dd'
                        
                    })
                }
                input.validate78('bind', cols[i].v);
            }


            input.val(td.data('old'));
        } else if (cols[i].mode.indexOf('<select') >= 0) {
            td.html(cols[i].mode);
            td.children('select').append(cols[i].def);
            if (td.data('old') != "") {
                td.children('select').children("option:contains(" + td.data('old') + ")").map(function () {
                    if ($(this).text() == td.data('old'))
                        return this;
                }).attr("selected", true);
            }
            else {
                td.children('select').get(0).selectedIndex = 0;
            }
        }
        i++;
    });

    if (that.settings.onmodify != null) {
        if (!that.settings.onmodify(row)) {
            that.trReback(row.attr("id"));
            return;
        }
    }
    that.EnterToTab();
    row.find(":text").attr("onfocus", "this.select()");
    //row.find(":text").attr("onmouseover", "this.select()");
    row.find(":text").each(resizeInput).keydown(resizeInput);

}


dgv78.prototype.EnterToTab = function (btn) {
    var that = this;
    var id = that.settings.tb;
    var $inp = $('input:text:visible,select');
    $inp.bind('keydown', function (e) {
        var key = e.which;
        if (key == 13) {
            e.preventDefault();
            var nxtIdx = $inp.index(this) + 1;
            if (nxtIdx <= $inp.length - 1)
                $inp[nxtIdx].focus();
            else
                $('#btnadd' + id).trigger("click");
        }
    });
};



/**
 * 与基本样式或有不同
 */
dgv78.prototype._inithtml = function () {
    var that = this;

    var idmodel = that.settings.idmodel;
    var pg = that.settings.pg;
    var id = that.settings.tb;
    $("#" + id).data('settings', this.settings);

    config78.setting.divlist.push(id);

    //添加外套(idmode区分模态和标准表格)
    var content = $("#content");
    var tmp;
    //页面头部
    if (idmodel == "") {
        //tmp = '<div class="app-content-body"> <div class="wrapper-md">'
        //+ '<div class="panel panel-default" id="' + pg + '">'
        ////说明组件
        //+ '<div class="panel-heading" id="head' + id + '"><div class="btn-group window_top">'
        //+ '<button type="button" class="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown">'
        //+ that.settings.title + '帮助<span class="caret"></span></button>'
        //+ '<ul class="dropdown-menu" role="menu" id="des' + id + '">'
        //+ '</ul>'
        //if (that.settings.showpagenext)
        //    tmp += '<button type="button" class="btn btn-sm btn-default pagenext">翻页1/n</button>';
        //tmp += '<button type="button" class="btn btn-sm btn-primary pageref" >刷新</button>';
        //if (that.settings.canremark)
        //    tmp += '<button type="button" class="btn btn-sm btn-default pagecus">自定</button>';
        //if (that.settings.showexcel)
        //    tmp += '<button type="button" class="btn btn-sm btn-default pageexcel">导出</button>';
        //tmp += that.settings.divtop;
        //tmp+='</div></div></div></div></div>'
        //content.append(tmp);

        tmp = "";
        if (that.settings.showpagenext)
            tmp += '<button type="button" class="btn btn-sm btn-default pagenext">翻页1/n</button>';
        tmp += '<button type="button" class="btn btn-sm btn-primary pageref" >刷新</button>';
        if (that.settings.canremark)
            tmp += '<button type="button" class="btn btn-sm btn-default pagecus">自定</button>';
        if (that.settings.showexcel)
            tmp += '<button type="button" class="btn btn-sm btn-default pageexcel">导出</button>';
        tmp += that.settings.divtop;
        var headtb_page = $("#headtb_page");
        headtb_page.children(".window_top").append(tmp)
        headtb_page.find(".pagedes").html(that.settings.title + '帮助<span class="caret"></span>');
    } else {
        $("#" + idmodel).remove();
        content.append('<div id="' + idmodel + '" class="modal fade ' + idmodel + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg">'
            + '<div class="modal-content"><div class="modal-header"> <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
            //+ '<h4 class="modal-title">' + that.settings.title + '</h4>' 
            //说明组件
            + '<div class="panel-heading" id="head' + id + '"><div class="btn-group">'
            + '<button type="button" class="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown">'
            + that.settings.title + '帮助<span class="caret"></span></button>'
            + '<ul class="dropdown-menu" role="menu" id="des' + id + '">'
            + '</ul></div></div>'

            + '</div><div class="modal-body" id="' + pg + '"></div>'
            + '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">关闭</button></div>'
            + '</div></div></div>');

    }

    //说明
    var des = that.settings.des;
    var desstr = '';
    des.forEach(function (item) {
        desstr += '<li><a href="#">' + item + '</a></li>';

    });
    if (that.settings.commonhelp) {
        desstr += '<li><a href="#">.常用： 单击表头排序 回车或TAB跳到下一格 ctrl + f查找 ctrl + s保存 Esc取消 表格可直接复制粘贴到EXCEL</a> </li>'
        desstr += '<li><a href="#">.如需帮助 客服电话：88888888或点击下方客服QQ<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=' + that.settings.qqservices + '&amp;site=qq&amp;menu=yes" target="_blank">                    <img title="点此联系客服" border="0" alt="点此联系客服" src="/Content/Images/pa.gif"> </a> </a> </li>';
    }
    $("#des" + id).append(desstr);

    var div = $("#" + pg);

    //添加一个表格
    div.append("<div id='tbtop" + id + "'>"
        + '<div class="row wrapper"><div class="btn-group" id="tbtopbtns' + id + '">'
        + that.settings.tbtop + ' </div></div>'
        + "</div><div class='table-responsive' id='div_tb" + id + "' style='height:700px;'><table class='data' id='" + id + "'><thead><tr id='" + id + "_head'></tr></thead><tbody></tbody></table></div>");


   

    var tb = $("#" + id);

    //添加表头
    var tbhead = tb.find("thead tr");
    var cols = that.settings.cols;
    tmp = '<th>' + that.settings.tbhead; 
    if (that.settings.canadd)
        tmp += '&nbsp;&nbsp;<a href="#" id="btnadd' + id + '" class="btnadd text-success" data-idtb="' + id + '">新增</a>'
    if (that.settings.candel)
        tmp += '&nbsp;&nbsp;<a href="#" id="btndel' + id + '" class="btndel text-danger" data-idtb="' + id + '">删除</a>';
    tmp += '</th>';
    tbhead.append(tmp);
    for (var i = 0; i < cols.length; i++) {
        var h = "";
        if (cols[i].h)
            h = "style = 'display: none;'";
        tbhead.append("<th " + h + ">" + cols[i].head + "</th>");
    }

    if (that.settings.oninihtml != null)
        that.settings.oninihtml();


}

/**
 * 用自定栏位修改
 */
dgv78.prototype._chagetbByCus = function (that) {
    var id = that.settings.tb;
    var tb = $("#" + id);

    var tmp = that.settings.customcols;
    var length = tb.find("thead tr th").length;
    var j = 4;
     
    for (var i = length - 4; i >= length - 8; i--) {
        
        
        var m = i + 1;

        if (tmp[j] != "") {
            tb.find("thead tr th:eq(" + m + ")").show().text(tmp[j]);
            tb.find("tbody tr").each(function () {
                $(this).children("td:eq(" + m + ")").show()
            });
            that.settings.cols[i].h = 0;
        }
        else {

            tb.find("thead tr th:eq(" + m + ")").hide().text(tmp[j]);
            tb.find("tbody tr").each(function () {
                $(this).children("td:eq(" + m + ")").hide()
            });
            that.settings.cols[i].h = 1;
        }
        j--;
    }
}

//自定义栏位
dgv78.prototype._initcustom = function () {
    var that = this; 
    var id = that.settings.tb;
    var tb = $("#" + id);


    //载入
    api78({
        url: that.settings.url
        , m: 'getCustomCols'
        , cache: that.settings.cache
        , pars: [that.settings.getcustomcolspars]
        , back: function (data) {
            data = data["back"]
            var tmp = "";
            try {
                tmp = data.split("|");
            } catch (e) {

            }
            if (tmp == "")
                tmp = "||||".split("|");

            that.settings.customcols = tmp;

            that._chagetbByCus(that);
            //var length = tb.find("thead tr th").length;
            //var j = 4;
            //for (var i = length - 3; i >= length - 7; i--) {
            //    if (tmp[j] != "") {
            //        tb.find("thead tr th:eq(" + i + ")").show().text(tmp[j]);
            //        that.settings.cols[i].h = 0;
            //    }
            //    j--;
            //}
            if (that.settings.loadrowspars == "wait") {
                that.settings.isLoading = false;
                return;
            }
            if (that.settings.onloadbef != null)
                that.settings.onloadbef();
            else
                that.loadrows();
        }
    });


}

/**
 * 载入数据
 */
dgv78.prototype.loadrows = function () {
    var that = this;
    var pgdiv = $("#win_" + that.settings.pg);
    api78({
        url: that.settings.url, m: that.settings.getm
        , pars: that.settings.loadrowspars, bcid: that.settings.bcid
        , getstart: that.settings.getstart, getnumber: that.settings.getnumber
        , order: that.settings.order, cols: that.settings.dbcols
        , cache: that.settings.cache, apipt: that.settings.apipt//,ajaxtype:"POST"
        , back: function (data) {
            data = data["back"]
            //页码
            that.settings.rowlen = data.length;
            pgdiv.find(".window_top .pagenext").text("翻页" + (that.settings.getstart / that.settings.getnumber + 1).toString()
                + "/n");

            if (typeof data == 'string') {
                that.settings.isLoading = false;
                if (data == "") data = "没有获取到任何数据";
                if (that.settings.canalert)
                    alert78(data);
                return;
            }
            var tb = $("#" + that.settings.tb);

            tb.data('source', data);
            that._tbFill(null);
            that.settings.isLoading = false;
            if (that.settings.onallloaded != null)
                that.settings.onallloaded();
        }
    });
};

/**
 * 填充表格
 * @param order
 */
dgv78.prototype._tbFill = function (order) {
    var that = this;
    var id = that.settings.tb;
    var tb = $("#" + that.settings.tb);
    var tbmain = tb.children("tbody").empty();
    var data = tb.data('source');

    var length = 0;
    if (data !== null) {
        try {
            length = data.length;
        }
        catch (e) {
            alert(e.message);
        }
    }

    if (length > 0) {
        //排序
        var cols = that.settings.cols;
        var ordername = "";
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].head === order) {
                ordername = cols[i].name;
                break;
            }
        }
        if (ordername !== "") {
            that.settings.isOrderAsc = !that.settings.isOrderAsc;
            var isAsc = that.settings.isOrderAsc;
            while (true) {
                var isOrderDone = true;
                var tmp = {};
                for (var i = 1; i < length; i++) {
                    if ((isAsc && data[i][ordername] < data[i - 1][ordername]) ||
                        (!isAsc && data[i][ordername] > data[i - 1][ordername])) {
                        for (var key in data[i]) {
                            tmp[key] = data[i][key];
                        }
                        for (var key in data[i - 1]) {
                            data[i][key] = data[i - 1][key];
                        }
                        for (var key in tmp) {
                            data[i - 1][key] = tmp[key];
                        }
                        isOrderDone = false;
                    }

                }
                if (isOrderDone)
                    break;
            }
        }


        var item, newrow, td, tmp;
        for (var i = 0; i < length; i++) {
            item = data[i];

            if (item["_id"] !== undefined)
                item["id"] = item["_id"];
            if (that.settings.onloadrowbef != null)
                that.settings.onloadrowbef( item);
            tbmain.append("<tr id='" + item.id + "'></tr>");
            newrow = tbmain.children("tr:last");
            tmp = '<td>';
            if (that.settings.canmodify)
                tmp += '<a href="#" class="btnm"  data-idtb="' + id + '"  data-idrow="' + item.id + '">修改</a>';
            tmp += that.settings.rowtop;
            tmp += '</td>';
            newrow.append(tmp);
            newrow.data('source', item);

            //var cols = that.settings.cols;
            for (var j = 0; j < cols.length; j++) {
                if (cols[j].h)
                    td = "<td style='display: none;'>";
                else {
                    td = "<td>";

                }
                var col = item[cols[j].name];
                if (col == null)
                    col = "";

                //switch (cols[j].name) {
                //    case "uptime":
                //    case "ddtime":
                //        col = new Date(col).format();
                //        break;
                //    case "ddate":
                //        col = new Date(col).format("yyyy-MM-dd");
                //        break;
                //}


                if (cols[j].showmode) {
                    newrow.append(td + cols[j].showmode + "</td>");
                    if (cols[j].showmode.indexOf('<input') >= 0) {
                        var input = newrow.children("td:last");
                        input = input.children(":text");
                        if (col != "") input.val(col);
                    }
                } else
                    newrow.append(td + col + "</td>");
            }

            if (that.settings.onloaded != null)
                that.settings.onloaded(newrow, item);
        }


    }
    else {
        if (that.settings.getstart !== 0)
            alert78("已翻到末页!");
    }
};

dgv78.prototype.JSONToCSVConvertor = function () {
    var ShowLabel = true;
    var that = this;

    var ReportTitle = "778878.net";

    var JSONData = $('#' + that.settings.tb).data('source');

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    // CSV += ReportTitle + '\r\n\n';

    var cols = that.settings.cols;
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        //for (var index in arrData[0]) {
        for (var i = 0; i < cols.length; i++) {
            if (!cols[i].h)
                row += cols[i].head + ',';
            //Now convert each value to string and comma-seprated

        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }
    var value;
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        /*for (var index in arrData[i]) {
         row += '"' + arrData[i][index] + '",';
         }*/
        for (var j = 0; j < cols.length; j++) {
            if (!cols[j].h) {
                value = arrData[i][cols[j].name];
                if (typeof value !== 'undefined' && value !== null
                    //&& value.length >= 15
                    && cols[j].head.indexOf("号") >= 0)
                    value = "'" + value;


                row += '"' + value + '",';
            }

        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "www778878net_Rep_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    //var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

};