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
const koa78_Base78_1 = require("@www778878net/koa78-Base78");
const dayjs = require("dayjs");
/**
 *DEBUG记录
 */
class sys_warn extends koa78_Base78_1.Base78 {
    //常量
    constructor(ctx) {
        super(ctx);
        this.uidcid = "uid";
        this.tbname = "sys_warn";
        this.colsImp = [
            //类别 .debug_source_ms_classname 
            //[debug,err,info] 来源 微服务名 类名
            "kind"
            //调试文本
            ,
            "content"
            //微服务系统 微服务对象
            ,
            "apisys", "apiobj"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    //查询付款成功最新的一条记录
    getMonitor() {
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
            let sb;
            let back;
            sb = "SELECT MAX(`uptime`) as uptime , `kind`   FROM `sys_warn` WHERE `apisys` ='monitor'"
                + " and `apiobj` = 'monitor_project' and (`kind` LIKE concat('Monitor_', '%')) GROUP BY `kind`";
            back = yield self.mysql.doGet(sb, [], up);
            resolve(back);
        }));
    }
    //清除2周数据防太多
    clearByMaster() {
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
            if (up.cid !== self.cidmy) {
                reject("err:只有管理员可以操作");
                return;
            }
            let sb = "DELETE FROM sys_warn WHERE uptime<=?";
            let back = yield self.mysql.doM(sb, [dayjs(up.uptime).add(-15, 'day').format()], up);
            resolve(back);
        }));
    }
    /**
    * 管理员获取
    */
    clear() {
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
            if (up.uname != "sysmessage") {
                reject("err:只有管理员可以操作");
                return;
            }
            let sb = "truncate table sys_warn  ";
            let back = yield self.mysql.doGet(sb, [], up);
            resolve(back);
        }));
    }
    /**
 * 管理员获取
 */
    getKind() {
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
            if (up.cid !== self.cidmy) {
                // || up.uname.indexOf("sys") !== 0) {
                reject("err:只有管理员可以操作");
                return;
            }
            let sb = "SELECT distinct kind FROM sys_warn   ";
            let back = yield self.mysql.doGet(sb, [], up);
            resolve(back);
        }));
    }
    /**
    * 管理员获取
    */
    get() {
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
            up.debug = false;
            let power = yield self._vidateforuid(self.tbname + "_get");
            //await self._addWarn(JSON.stringify(power), "sys_sql", "services", "services_dinpay");
            if (power["code"] != 200) {
                resolve(power["errmsg"]);
                return;
            }
            let kind = up.pars[0];
            let uname;
            if (up.pars.length >= 2)
                uname = up.pars[1];
            let pars = [];
            let sb = "SELECT * FROM sys_warn ";
            if (kind != "") {
                sb += " where kind=? ";
                pars.push(kind);
            }
            else {
                //sb += " where kind <>'debugsyslog'";
            }
            sb += " order by idpk desc limit 0,20 ";
            let back = yield self.mysql.doGet(sb, pars, up);
            resolve(back);
        }));
    }
}
exports.default = sys_warn;
//# sourceMappingURL=sys_warn.js.map