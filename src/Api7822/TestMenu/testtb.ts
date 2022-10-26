import { Base78 } from '@www778878net/koa78-base78';
/**
 * 参数表 （测试用）
 * */
export default class testtb extends Base78 {
    constructor(ctx: any) {

        super(ctx);
        //this.uidcid = "uid";//默认是cid
        this.tbname = "testtb";

        this.colsImp = [
            //类别   项目   设置值
            "kind", "item", "data"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    }

    m(): Promise<string> {
        this.up.debug = true;
        return this._m();
    }

    get(): Promise<string> {
        this.up.debug = true;
        return this._get();
    }
}