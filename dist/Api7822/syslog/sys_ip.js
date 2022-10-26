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
 *后台统计用户IP
 */
class sys_ip extends koa78_base78_1.Base78 {
    //常量
    constructor(ctx) {
        super(ctx);
        this.uidcid = "cid";
        this.tbname = "sys_ip";
        //     ip
        this.colsImp = ["uid", "ip"];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    getByMaster() {
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
            let uname = up.pars[0];
            let power = yield self._vidateforuid(self.tbname + "_getByMaster");
            //await self._addWarn(JSON.stringify(power), "sys_sql", "services", "services_dinpay");
            if (power["code"] != 200) {
                resolve(power["errmsg"]);
                return;
            }
            let sb = "SELECT ip,max(uptime) as uptime,upby ,1 as id FROM  `sys_ip`    where  upby=? group by ip";
            let back = yield self.mysql.doGet(sb, up.pars, up);
            resolve(back);
        }));
    }
}
exports.default = sys_ip;
//# sourceMappingURL=sys_ip.js.map