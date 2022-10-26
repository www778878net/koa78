import { Base78 } from '@www778878net/koa78-base78';
/**
 * 参数表 （测试用）
 * */
export default class testtb2 extends Base78 {
    constructor(ctx: any) {

        super(ctx);
        //this.uidcid = "uid";//默认是cid
        this.tbname = "testtb2";

        this.colsImp = [
            //类别   项目   设置值
            "kind", "item", "data"

            ,"d2","d3","d4","d5","d6"
        ];
        this.cols = this.colsImp.concat(this.colsremark);
    }

  
}