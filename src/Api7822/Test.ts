import Base7817 from "../dllbase/Base7817";
export default class Test extends Base7817 {
    constructor(ctx: any) {

        super(ctx);
        //this.uidcid = "uid";
        this.tbname = "Services78";
        //这个不是表
        this.colsImp = [];
        this.cols = this.colsImp.concat(this.colsremark);
    }

    testfun() {
        return 3;
    }

    //通用入口 为了截获错误 及处理日志
    out(method: string): Promise<any> {
        const self = this;

        return new Promise(async (resolve, reject) => {
            if (typeof self[method] !== 'function') {
                resolve('apifun not find');
                return;
            }
            let back: any;  

            try {
                back = await self[method]();
                //数字转文本 对象转文本       
            } catch (e) {
                //这里记录错误
                console.log("doing err log3" + e);
                back = e; 
            };

            try {
                if (!isNaN(back)) back = back.toString();  
              
                back = "{\"res\":" + "0" + ",\"errmsg\":\""
                    + "" + "\",\"kind\":\"" + "test" + "\",\"back\":"
                    + back + "}"  
                resolve(back);  
 

            } catch (e) {
                e = JSON.stringify(e); 
                reject(e);
            }
        }).catch(function (e) {
            //这里记录错误 建议最好不要reject 通过res<0返回
            console.log("doing err log2" + e);

        });
    }
}