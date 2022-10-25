import { Base78 } from "@www778878net/koa78-Base78";
/**
 *公司成员
 */
export default class companysuser extends Base78  {
    //常量

    constructor(ctx: any) {
        super(ctx);
    
        this.tbname = "companysuser";
        //uid
        this.colsImp = ["uid","des"];
        this.cols = this.colsImp.concat(this.colsremark);
    }

    getWeixin(): Promise<string> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }

            let sb = "SELECT t2.uname,t2.`openweixin`  from `companysuser` as t1 INNER JOIN lovers as t2 on t1.`uid` =t2.id "
            " where t1.`cid` =? and `openweixin` <>''";
            let back = await self.mysql1.doGet(sb, [up.cid], up);
            resolve(back);
        })
    }

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

            let sb = "SELECT lovers.uname,companysuser.des,  companysuser.id , companysuser.upby,   companysuser.uptime    ,    companysuser.remark2,        companysuser.remark,"
                + ' companysuser.remark4,        companysuser.remark3,        companysuser.remark5,        companysuser.remark6 FROM companysuser    INNER JOIN lovers ON companysuser.uid = lovers.id'
                + '    WHERE companysuser.cid=?   ORDER BY lovers.uname';
            let back = await self.mysql1.doGet(sb, [up.cid], up);
            resolve(back);
        })
    }

    m(): Promise<string> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }
 
            //let sb = 'SELECT uid FROM  companys WHERE id=? ';
            //let values = [up.cid];
            //let back = await self.mysql1Get(sb, values);
            let sb, values, back;
            if(up.idceo!=up.uid){
            //if (back[0]["uid"] != up.uid) {
                back = "err:只有帐套创建人可以修改";
                resolve(back);
                return;
            }

     
             sb = 'SELECT id FROM lovers WHERE uname=? ';
             values = [up.pars[0]];
             back = await self.mysql1Get(sb, values);
             if (back.length == 0) {
                 back = "err:用户不存在";
                 resolve(back);
                 return;
             }
             up.pars[0] = back[0]["id"];
             let colp = self.cols;
             let back2 = await self._m(colp);

            resolve(back2);
        })
    }
}