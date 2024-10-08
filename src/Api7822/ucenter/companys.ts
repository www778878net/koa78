﻿import { Base78 } from "@www778878net/koa78-base78";
/**
 *公司
 */
export default class companys extends Base78  {
    //常量

    constructor(ctx) {
        super(ctx);
        this.uidcid = "uid";
        this.tbname = "companys";
        //公司名
        this.colsImp = ["coname","balance","merchant"];
        this.cols = this.colsImp.concat(this.colsremark);
    }

    m(): Promise<string> {
        const that = this;
        const up = that.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }

            const colp = ["coname"];
            const back = await that._m(colp)
            //添加账套成员表
            const sb = "insert into companysuser (cid,uid,id,upby,uptime) values (?,?,?,?,?)";
            const backs = await that.mysql.doM(sb, [up.mid, up.uid, up.getNewid(), up.uname, up.utime], up);
            resolve(back)
 
        })
    }

    mAddCompanys(): Promise<any> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }
            const idpk = up.pars[0];  //用户的idpk
            let sb;
            let back;
            sb = "SELECT `sid`,`uname`   FROM `lovers` WHERE `idpk` =?";
            back = await self.mysql.doGet(sb, [idpk], up);
            const cidnew = back[0]['sid'];
            const uname = back[0]['uname'];
            //添加账套表
            sb = "INSERT INTO companys(uid,coname,id,upby,uptime) values (?,?,?,?,?)";
            back = await self.mysql.doM(sb, [cidnew, uname, cidnew, uname, up.utime], up);
            //添加账套成员表
            sb = "insert into companysuser (cid,uid,id,upby,uptime) values (?,?,?,?,?)";
            const backs = await self.mysql.doM(sb, [cidnew, cidnew, cidnew, uname, up.utime], up);

            if (back == 1 && backs == 1) {
                back = "添加成功";
            }
            else {
                back = "添加失败";
            }
            resolve(back);
        })
    }



    getCeoid(): Promise<string> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }
            const sb = "SELECT uid FROM companys WHERE id=?";
            const tb = await self.mysql.doGet(sb, [up.cid], up);
            let back = tb[0]["uid"];
            if (back === up.uid)
                back = up.sid;
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
            const sb = "SELECT companys.coname, companys.remark,  companys.remark2, companys.remark3, companys.remark4," +
                "companys.remark5, companys.remark6, companys.id, companys.upby, companys.uptime, companys.uid" +
                "        FROM companys inner JOIN companysuser ON companysuser.cid= companys.id" +
                '   WHERE companysuser.uid=?      ';
            const back = await self.mysql1.doGet(sb, [up.uid], up);
            resolve(back);
        })    
    }

    mSetdef(): Promise<any> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }

            if (up.uname == "guest") {
                resolve("err:为方便其它新用户熟悉系统,测试用户不允许变更帐套!");
                return;
            }
            self.memcache.del(self.mem_sid+ up.sid);
            const sb = 'UPDATE lovers set idcodef=? ,uptime=? WHERE ID=?';          
            let back = await self.mysql.doM(sb, [up.mid, up.utime, up.uid], up);
            if (back == 1) back = up.mid
            resolve(back);
        })
    }

    mSetdefByConame(): Promise<any> {
        const self = this;
        const up = self.up;
        return new Promise(async (resolve, reject) => {
            try {
                await this._upcheck();
            } catch (e) {
                reject(e);
                return;
            }
         
            let sb = "SELECT id From companys WHERE coname=? ";
            let back=await self.mysql.doGet(sb, [up.pars[0]], up);
            if (back.length == 0) {
                resolve("err:帐套名称不存在!");
                return;
            }

            const newcid = back[0]["id"];
            //验证权限
            sb = "select idpk from companysuser where cid=? and uid=?";
            back = await self.mysql.doGet(sb, [newcid, up.uid], up);
            if (back.length === 0) {
                resolve("err:请先联系该帐套管理员添加你进帐套!");
                return;              
            }
       
            self.memcache.del("lovers_sid_" + up.sid);
            sb = 'UPDATE lovers set idcodef=? ,uptime=? WHERE ID=?';
            const values = [newcid, up.uptime, up.uid];
            let back2=await self.mysql.doM(sb, values, up);
            if(back2==1)back2=up.mid

            resolve(back2);
        })
    }


}