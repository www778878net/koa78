"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa78_base78_1 = require("@www778878net/koa78-base78");
/**
 * 参数表 （测试用）
 * */
class testtb extends koa78_base78_1.Base78 {
    constructor(ctx) {
        super(ctx);
        //this.uidcid = "uid";//默认是cid
        this.tbname = "testtb";
        this.colsImp = [
            //类别   项目   设置值
            "kind", "item", "data"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    m() {
        this.up.debug = true;
        return this._m();
    }
    get() {
        this.up.debug = true;
        return this._get();
    }
}
exports.default = testtb;
//# sourceMappingURL=testtb.js.map