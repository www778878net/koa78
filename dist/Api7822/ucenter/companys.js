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
const koa78_base78_1 = require("@www778878net/koa78-base78");
/**
 *公司
 */
class companys extends koa78_base78_1.Base78 {
    //常量
    constructor(ctx) {
        super(ctx);
        this.uidcid = "uid";
        this.tbname = "companys";
        //公司名
        this.colsImp = ["coname", "balance", "merchant"];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    m() {
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
            let colp = ["coname"];
            let back = yield self._m(colp);
            resolve(back);
        }));
    }
    mAddCompanys() {
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
            let idpk = up.pars[0]; //用户的idpk
            let sb;
            let back;
            sb = "SELECT `sid`,`uname`   FROM `lovers` WHERE `idpk` =?";
            back = yield self.mysql.doGet(sb, [idpk], up);
            let cidnew = back[0]['sid'];
            let uname = back[0]['uname'];
            //添加账套表
            sb = "INSERT INTO companys(uid,coname,id,upby,uptime) values (?,?,?,?,?)";
            back = yield self.mysql.doM(sb, [cidnew, uname, cidnew, uname, up.utime], up);
            //添加账套成员表
            sb = "insert into companysuser (cid,uid,id,upby,uptime) values (?,?,?,?,?)";
            let backs = yield self.mysql.doM(sb, [cidnew, cidnew, cidnew, uname, up.utime], up);
            if (back == 1 && backs == 1) {
                back = "添加成功";
            }
            else {
                back = "添加失败";
            }
            resolve(back);
        }));
    }
    getCeoid() {
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
            let sb = "SELECT uid FROM companys WHERE id=?";
            let tb = yield self.mysql.doGet(sb, [up.cid], up);
            let back = tb[0]["uid"];
            if (back === up.uid)
                back = up.sid;
            resolve(back);
        }));
    }
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
            let sb = "SELECT companys.coname, companys.remark,  companys.remark2, companys.remark3, companys.remark4," +
                "companys.remark5, companys.remark6, companys.id, companys.upby, companys.uptime, companys.uid" +
                "        FROM companys inner JOIN companysuser ON companysuser.cid= companys.id" +
                '   WHERE companysuser.uid=?      ';
            let back = yield self.mysql1.doGet(sb, [up.uid], up);
            resolve(back);
        }));
    }
    mSetdef() {
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
            if (up.uname == "guest") {
                resolve("err:为方便其它新用户熟悉系统,测试用户不允许变更帐套!");
                return;
            }
            self.memcache.del(self.mem_sid + up.sid);
            let sb = 'UPDATE lovers set idcodef=? ,uptime=? WHERE ID=?';
            let back = yield self.mysql.doM(sb, [up.mid, up.utime, up.uid], up);
            if (back == 1)
                back = up.mid;
            resolve(back);
        }));
    }
    mSetdefByConame() {
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
            let sb = "SELECT id From companys WHERE coname=? ";
            let back = yield self.mysql.doGet(sb, [up.pars[0]], up);
            if (back.length == 0) {
                resolve("err:帐套名称不存在!");
                return;
            }
            let newcid = back[0]["id"];
            //验证权限
            sb = "select idpk from companysuser where cid=? and uid=?";
            back = yield self.mysql.doGet(sb, [newcid, up.uid], up);
            if (back.length === 0) {
                resolve("err:请先联系该帐套管理员添加你进帐套!");
                return;
            }
            self.memcache.del("lovers_sid_" + up.sid);
            sb = 'UPDATE lovers set idcodef=? ,uptime=? WHERE ID=?';
            var values = [newcid, up.uptime, up.uid];
            let back2 = yield self.mysql.doM(sb, values, up);
            if (back2 == 1)
                back2 = up.mid;
            resolve(back2);
        }));
    }
}
exports.default = companys;
//# sourceMappingURL=companys.js.map