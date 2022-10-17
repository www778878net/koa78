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
class Test {
    constructor() {
    }
    testfun() {
        return 3;
    }
    //ͨ����� Ϊ�˽ػ���� ��������־
    out(method) {
        const self = this;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (typeof self[method] !== 'function') {
                resolve('apifun not find');
                return;
            }
            let back;
            try {
                back = yield self[method]();
                //����ת�ı� ����ת�ı�       
            }
            catch (e) {
                //�����¼����
                console.log("doing err log3" + e);
                back = e;
            }
            ;
            try {
                if (!isNaN(back))
                    back = back.toString();
                back = "{\"res\":" + "0" + ",\"errmsg\":\""
                    + "" + "\",\"kind\":\"" + "test" + "\",\"back\":"
                    + back + "}";
                resolve(back);
            }
            catch (e) {
                e = JSON.stringify(e);
                reject(e);
            }
        })).catch(function (e) {
            //�����¼����
            console.log("doing err log2" + e);
        });
    }
}
exports.default = Test;
//# sourceMappingURL=Test.js.map