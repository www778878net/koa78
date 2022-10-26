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
 *公司成员
 */
class companysuser extends koa78_base78_1.Base78 {
    //常量
    constructor(ctx) {
        super(ctx);
        this.tbname = "companysuser";
        //uid
        this.colsImp = ["uid", "des"];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    getWeixin() {
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
            let sb = "SELECT t2.uname,t2.`openweixin`  from `companysuser` as t1 INNER JOIN lovers as t2 on t1.`uid` =t2.id ";
            " where t1.`cid` =? and `openweixin` <>''";
            let back = yield self.mysql1.doGet(sb, [up.cid], up);
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
            let sb = "SELECT lovers.uname,companysuser.des,  companysuser.id , companysuser.upby,   companysuser.uptime    ,    companysuser.remark2,        companysuser.remark,"
                + ' companysuser.remark4,        companysuser.remark3,        companysuser.remark5,        companysuser.remark6 FROM companysuser    INNER JOIN lovers ON companysuser.uid = lovers.id'
                + '    WHERE companysuser.cid=?   ORDER BY lovers.uname';
            let back = yield self.mysql1.doGet(sb, [up.cid], up);
            resolve(back);
        }));
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
            //let sb = 'SELECT uid FROM  companys WHERE id=? ';
            //let values = [up.cid];
            //let back = await self.mysql1Get(sb, values);
            let sb, values, back;
            if (up.idceo != up.uid) {
                //if (back[0]["uid"] != up.uid) {
                back = "err:只有帐套创建人可以修改";
                resolve(back);
                return;
            }
            sb = 'SELECT id FROM lovers WHERE uname=? ';
            values = [up.pars[0]];
            back = yield self.mysql1Get(sb, values);
            if (back.length == 0) {
                back = "err:用户不存在";
                resolve(back);
                return;
            }
            up.pars[0] = back[0]["id"];
            let colp = self.cols;
            let back2 = yield self._m(colp);
            resolve(back2);
        }));
    }
}
exports.default = companysuser;
//# sourceMappingURL=companysuser.js.map