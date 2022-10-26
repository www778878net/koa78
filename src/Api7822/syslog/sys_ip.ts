import { Base78 } from "@www778878net/koa78-base78";
/**
 *后台统计用户IP
 */
export default class sys_ip extends Base78  {
    //常量

    constructor(ctx: any) {
        super(ctx);
        this.uidcid = "cid";
        this.tbname = "sys_ip";
        //     ip
        this.colsImp = ["uid","ip"];
        this.cols = this.colsImp.concat(this.colsremark);
    }


    getByMaster(): Promise<string> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }

            let uname = up.pars[0];
     
            let power = await self._vidateforuid(self.tbname + "_getByMaster");
            //await self._addWarn(JSON.stringify(power), "sys_sql", "services", "services_dinpay");
            if (power["code"] != 200) {

                resolve(power["errmsg"]);
                return;
            }

            let sb = "SELECT ip,max(uptime) as uptime,upby ,1 as id FROM  `sys_ip`    where  upby=? group by ip";
            let back = await self.mysql.doGet(sb, up.pars, up);

            resolve(back);

        })
    }
}