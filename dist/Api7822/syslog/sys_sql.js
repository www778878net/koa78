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
 *后台统计SQL效率
 */
class sys_sql extends koa78_base78_1.Base78 {
    //常量
    constructor(ctx) {
        super(ctx);
        //this.uidcid = "uid";
        this.tbname = "sys_sql";
        //          SQL语句       调用次数 耗时   返回字节    用户名（暂不用）
        this.colsImp = [
            //api版本 api目录  api实体
            "apiv", "apisys", "apiobj",
            //SQL语句       调用次数 耗时   返回字节 
            "cmdtext", "num", "dlong", "downlen"
            // 用户名（暂不用）
            //, "uname"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
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
            let sb = "truncate table sys_sql  ";
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
            //if (   ) {
            //    reject("err:只有管理员可以操作");
            //    return;
            //}
            //let power = await self._vidateforuid(self.tbname + "_get");
            ////await self._addWarn(JSON.stringify(power), "sys_sql", "services", "services_dinpay");
            //if (power["code"] != 200) {
            //    resolve(power["errmsg"]);
            //    return;
            //}
            let sb = "SELECT * FROM sys_sql order by dlong desc limit 0,100 ";
            let back = yield self.mysql.doGet(sb, [], up);
            resolve(back);
        }));
    }
}
exports.default = sys_sql;
//# sourceMappingURL=sys_sql.js.map