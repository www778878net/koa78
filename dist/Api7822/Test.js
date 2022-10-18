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
class Test extends koa78_base78_1.default {
    constructor(ctx) {
        super(ctx);
        //this.uidcid = "uid";
        this.tbname = "Services78";
        //������Ǳ�
        this.colsImp = [];
        this.cols = this.colsImp.concat(this.colsremark);
    }
    test() {
        const self = this;
        const up = self.up;
        console.log("test in" + up.uname);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            resolve("������˵��·��ok,����ok" + up.parsn);
            return;
        }));
    }
}
exports.default = Test;
//# sourceMappingURL=Test.js.map