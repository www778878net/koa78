import { Base78 } from "@www778878net/koa78-Base78";
/**
 *后台统计SQL效率
 */
export default class sys_nodejs extends Base78  {
    //常量

    constructor(ctx: any) {
        super(ctx);
        //this.uidcid = "uid";
        this.tbname = "sys_nodejs";
        
        this.colsImp = [
            //api版本 api目录  api实体
            "apiv", "apisys", "apiobj",
             // api方法   调用次数 耗时  上传字节 返回字节 
            "method", "num", "dlong", "uplen", "downlen"
            // 用户名（暂不用）
            //, "uname"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    }

    /**
 * 管理员获取
 */
    clear(): Promise<string> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }
            if (up.uname != "sysmessage") {
                reject("err:只有管理员可以操作");
                return;
            }
            let sb = "truncate table sys_nodejs  ";
            let back = await self.mysql.doGet(sb, [], up);
            resolve(back);
        });
    }

    /**
    * 管理员获取
    */
    get(): Promise<string> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }
            let power = await self._vidateforuid(self.tbname + "_get");
            //await self._addWarn(JSON.stringify(power), "sys_sql", "services", "services_dinpay");
            if (power["code"] != 200) {

                resolve(power["errmsg"]);
                return;
            }
            let sb = "SELECT * FROM sys_nodejs order by  dlong desc limit 0,100 ";
            let back = await self.mysql.doGet(sb, [], up);
            resolve(back);
        });
    }
}