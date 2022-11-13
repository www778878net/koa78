"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs = require("dayjs");
const koa78_base78_1 = require("@www778878net/koa78-base78");
class lovers extends koa78_base78_1.Base78 {
    constructor(ctx) {
        super(ctx);
        //this.uidcid = "uid";
        this.tbname = "lovers";
        this.colsImp = [
            //用户名 密码 客户端鉴权
            "uname", "pwd", "sid",
            //网页端鉴权 网页端过期时间（暂未用）
            "sid_web", "sid_web_date",
            //当前cid 
            "idcodef"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    /**
      * 微信登录
      */
    loginWeixin() {
        const self = this;
        const up = self.up;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._upcheck();
            }
            catch (e) {
                //reject(e);
                //return;
            }
            let authcode = up.pars[0];
            let back, openid;
            back = yield self.apiqq._code2token(authcode);
            if (back["errcode"] == 40163) {
                back = "";
                self._setBack(-4, "code已被使用");
                resolve(back);
                return;
            }
            if (back["errcode"] == 40029) {
                back = "";
                self._setBack(-5, "code无效");
                resolve(back);
                return;
            }
            ////await self._addWarn(JSON.stringify(back), "loginWeixin18", "monitor", "lovers");
            let weixinback = back;
            openid = back["openid"];
            //await self._addWarn(openid, "loginWeixin18", "monitor", "lovers");
            if (openid == undefined) {
                self._setBack(-3, "");
                resolve(back);
                return;
            }
            back = yield self._loginWeixin(openid);
            back["weixinback"] = weixinback;
            resolve(back);
        }));
    }
    //返回CODE200 用户登录信息 CODE: 1为未注册 CODE为2为没手机号
    _loginWeixin(openid) {
        const self = this;
        const up = self.up;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._upcheck();
            }
            catch (e) {
                //reject(e);
                //return;
            }
            let cmds = [];
            let values = [];
            let errtexts = [];
            let back;
            let sid = up.getNewid();
            let uname = openid;
            //await self._addWarn(uname, "loginWeixin18", "monitor", "lovers");
            if (!openid) {
                back = "openid error" + openid;
                self._setBack(-9, back);
                resolve(back);
                return;
            }
            let sb = "SELECT  pwd ,uname, coname,nickname,money78,truename, " +
                " mobile, sid_web, idcodef,openweixin,referrer,isvip, " +
                " lovers.id,lovers.idpk FROM lovers LEFT OUTER JOIN " +
                "   companys ON lovers.idcodef = companys.id where  openweixin=?" +
                "  order by lovers.uptime desc";
            let tb = yield self.mysql.doGet(sb, [uname], up);
            //await self._addWarn(JSON.stringify(tb), "loginWeixin18", "monitor", "lovers");
            if (tb.length == 0) {
                uname = openid;
                let sb2 = " INSERT INTO  lovers  ( uname,pwd,sid,sid_web,"
                    + " sid_web_date, id, upby, uptime"
                    + "  , idcodef, mobile,  truename,openweixin,email) values(?, ?,?,?,?,?,?,?,?,?,?,?,?,?)";
                let values = [openid, up.mid, sid, sid,
                    dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss'), sid, uname, up.utime,
                    self.cidguest, "", "", openid, ""];
                back = yield self.mysql1.doM(sb2, values, up);
                tb = yield self.mysql.doGet(sb, [uname], up);
                resolve(tb[0]);
                //back = openid
                //self._setBack(1, back)
                //resolve(back)
                return;
            }
            else {
                tb = tb[0];
                yield self.memcache.del(self.mem_sid + tb["sid_web"]);
                sb = 'UPDATE lovers SET sid_web=?,sid_web_date=?,uptime=? WHERE openweixin=?';
                values = [sid, dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss'), uname];
                yield self.mysql.doM(sb, values, up);
                tb["sid_web"] = sid;
                back = tb;
            }
            resolve(back);
        }));
    }
    /**
   * 登录
   */
    login() {
        const self = this;
        const up = self.up;
        const loginerr = "love_loginerr2_";
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._upcheck();
            }
            catch (e) {
                //reject(e);
                //return;
            }
            var uname = up.pars[0].trim();
            var pwd = up.pars[1];
            let back = "";
            let love_loginerr = yield self.memcache.get(loginerr + uname);
            if (love_loginerr >= 20) {
                reject("err:登录次失败,24小时后再试!" + love_loginerr);
                return;
            }
            var sbin = 'SELECT pwd ,uname, coname, sid_web, idcodef,lovers.idpk   FROM lovers LEFT OUTER JOIN      companys ON lovers.idcodef = companys.id ' +
                'where  uname=? ';
            let sid = up.getNewid();
            let tb = yield self.mysql1.doGet(sbin, [uname], up);
            let values;
            if (tb.length == 0) {
                ////新增用户
                //back = ['err:请先注册'];
                //resolve(back);
                if (uname.indexOf('sys') === 0) {
                    reject('err:新用户不允许以sys开头!请重新输入用户名!');
                    return;
                }
                var sb = " INSERT INTO  lovers  (cid, uname,pwd,sid,sid_web,sid_web_date,id,upby,uptime,idcodef) SELECT ?,?,?,?,?,?,?,?,?,?";
                values = ["", uname, pwd, sid, sid, dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss'), sid, uname, up.utime, self.cidguest];
                back = yield self.mysql1.doM(sb, values, up);
                let tb = yield self.mysql1.doGet(sbin, [uname], up);
                back = tb[0];
                resolve(back);
                return;
            }
            else {
                let result = tb[0];
                if (pwd !== result["pwd"]) {
                    back = ['err:用户名密码不正确', '用户名密码不正确'];
                    if (uname != "guest") {
                        if (!love_loginerr)
                            self.memcache.set(loginerr + uname, 1, 14400);
                        else
                            self.memcache.incr(loginerr + uname);
                    }
                    resolve(back);
                    return;
                }
                else {
                    self.memcache.del(loginerr + uname);
                }
                if (result["idcodef"] === null) {
                    result["idcodef"] = self.cidguest;
                    result["coname"] = "测试帐套-可进入基础数据建立帐套";
                }
                if (uname == 'guest') {
                    sid = 'GUEST888-8888-8888-8888-GUEST88GUEST';
                }
                else if (uname == "syssc" || uname == 'testfz') {
                    sid = result["sid_web"];
                }
                else {
                    self.memcache.del(self.mem_sid + result["sid_web"]);
                    sb = 'UPDATE lovers SET sid_web=?,sid_web_date=?,uptime=? WHERE uname=?';
                    values = [sid, dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss'), up.utime, uname];
                    self.mysql.doM(sb, values, up);
                }
                result["sid_web"] = sid;
                back = result;
                resolve(back);
            }
        }));
    }
    /**
  * 注册获取短信验证码
   * 同个号码5分钟发一次
   * 同个IP也是
  */
    getMobileVzReg() {
        const self = this;
        const up = self.up;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._upcheck();
            }
            catch (e) {
                reject(e);
                return;
            }
            let mobile = up.pars[0];
            //5分钟发一次
            let tmp = yield self.memcache.get(self.tbname + "getvz2" + mobile);
            if (tmp) {
                resolve("err:短信有延迟 请稍等 3分钟才允许验证一次!");
                return;
            }
            yield self.memcache.set(self.tbname + "getvz2" + mobile, 1, 180);
            //同个IP1分钟一次防刷
            tmp = yield self.memcache.get(self.tbname + "getvz" + up.ip);
            if (tmp) {
                resolve("err:短信有延迟 请稍等 1分钟才允许验证一次!");
                return;
            }
            yield self.memcache.set(self.tbname + "getvz" + up.ip, 1, 60);
            //一个随机验证码
            //后续验证验证码对不对
            let sjnum = Math.floor(Math.random() * 1000000);
            //await self._addWarn("getMobileVzReg:" + sjnum, "lovers", "lovers", "lovers");
            yield self.memcache.set(self.tbname + "mobileyz" + mobile, sjnum);
            let back = sjnum;
            //暂时没有接短信服务 直接返回先 后面要处理
            //let sb = 'insert into `services_mes_sms` (`uid`,`uname`,`mid`,`ddate`,tou,template,content,`upby`,`uptime`,`id`) ' +
            //    ' values(?,?,?,?,?,?,?,?,?,?)';
            //let back = await self.mysql.doM(sb, [up.uid, up.uname, "mobileyz"
            //    , up.utime, mobile, "SMS_168591175", "{\"code\":" + sjnum + "}", up.uname, up.utime, up.getNewid()], up);
            //back = "验证码已发出 请注意接收.";
            resolve(back);
        }));
    }
    /**
    * 注册
    */
    reg() {
        //老用户绑定微信只需要用户名 密码 微信OPENID
        //新用户注册都需要
        const self = this;
        const up = self.up;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._upcheck();
            }
            catch (e) {
                //reject(e);
                //return;
            }
            let uname = up.pars[0].trim();
            let pwd = up.pars[1];
            let qq = up.pars[2];
            let mobile = up.pars[3];
            let openwx = up.pars[4];
            let truename = up.pars[5];
            let mobilevz = up.pars[6];
            if (truename == "")
                truename = uname;
            if (openwx == null || openwx == "openwx")
                openwx = "";
            //验证码有没 是否和手机对应
            let sjnum = yield self.memcache.get(self.tbname + "mobileyz" + mobile);
            if (sjnum != mobilevz) {
                resolve('err:验证码不正确!请验证手机!');
                return;
            }
            let back = "";
            let sid = up.getNewid();
            let sb = 'SELECT pwd ,uname, coname, sid_web, idcodef,openweixin,lovers.idpk  FROM lovers LEFT OUTER JOIN      companys ON lovers.idcodef = companys.id ' +
                'where  uname=? ';
            let tb = yield self.mysql.doGet(sb, [uname], up);
            if (tb.length == 0) {
                //新增用户
                if (uname.indexOf('sys') === 0) {
                    resolve('err:新用户不允许以sys开头!请重新输入用户名!');
                    return;
                }
                sb = " INSERT INTO  lovers  ( uname,pwd,sid,sid_web,"
                    + " sid_web_date, id, upby, uptime"
                    + "  , idcodef, mobile, qq, truename,openweixin,email) values(?, ?,?,?,?,?,?,?,?,?,?,?,?,?)";
                let values = [uname, pwd, sid, sid,
                    dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss'), sid, uname, up.utime,
                    sid, mobile, qq, truename, openwx, qq + "@qq.com"];
                back = yield self.mysql1.doMAdd(sb, values, up);
                if (back) {
                    //新用户直接新建帐套
                    var cidnew = sid;
                    sb = "INSERT INTO companys(uid,coname,id,upby,uptime)SELECT ?,?,?,?,?";
                    values = [cidnew, uname, cidnew, uname, up.utime];
                    self.mysql.doM(sb, values, up);
                    sb = "insert into companysuser (cid,uid,id,upby,uptime) SELECT ?,?,?,?,?";
                    values = [cidnew, cidnew, cidnew, uname, up.utime];
                    self.mysql.doM(sb, values, up);
                }
                sb = 'SELECT pwd ,uname, coname, sid_web, idcodef,openweixin,lovers.idpk  FROM lovers LEFT OUTER JOIN      companys ON lovers.idcodef = companys.id ' +
                    'where  uname=? ';
                tb = yield self.mysql.doGet(sb, [uname], up);
                tb = tb[0];
                back = tb;
                resolve(back);
            }
            else {
                resolve('err:用户名已被占用!请重新输入用户名!');
                return;
            }
        }));
    }
}
exports.default = lovers;
//# sourceMappingURL=lovers.js.map