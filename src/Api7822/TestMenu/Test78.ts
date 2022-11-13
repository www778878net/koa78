import { Base78 } from '@www778878net/koa78-base78';

export default class Test78 extends Base78 {
    constructor(ctx: any) {

        super(ctx);
        //this.uidcid = "uid";
        this.tbname = "Test78";
        //这个不是表
        this.colsImp = [];
        this.cols = this.colsImp.concat(this.colsremark);
    }

    testcidmy() {
        const self = this;
        const up = self.up;

        return new Promise(async (resolve, reject) => {

            resolve(self.cidmy);
            return;
        });
    }

    testmem(): Promise<string> {
        const self = this;
        const up = self.up;

        return new Promise(async (resolve, reject) => {
            let setback = await self.memcache.set("testmem", 9, 60);
            let getback = await self.memcache.get("testmem")
            resolve(getback);
            return;
        })
    }

    testredis(): Promise<string> {
        const self = this;
        const up = self.up;
      
        return new Promise(async (resolve, reject) => {
            let setback = await self.redis.set("testitem", 8, 60);
            let getback = await self.redis.get("testitem")
            resolve(getback);
            return;
        })
    }

    test(): Promise<string> {
        const self = this;
        const up = self.up;
        console.log("test in test" + up.uname);
        return new Promise(async (resolve, reject) => {
            resolve("看到我说明路由ok,中文ok,无权限调用OK" + up.parsn);
            return;
        })
    }

    getConfig78(): Promise<{}> {
        const self = this;
        const up = self.up;
        console.log("test in getConfig78" + up.uname);
  
        return new Promise(async (resolve, reject) => {
            resolve("不能公开config测试的时候用用")
            //resolve({ Argv: self.Argv, Config: self.Config });
            return;
        })
    }
}