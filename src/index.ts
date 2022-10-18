import Koa = require('koa') 
//import Config78 from "./Config78";
import router from './routers';
const app = new Koa();

var iconv = require('iconv-lite');
var fs = require('fs');
console.log(process.argv)
var fspath = process.argv[3]
var Config78 = loadjson(fspath);
function loadjson(filepath) {
    var data;
    try {
        var jsondata = iconv.decode(fs.readFileSync(filepath, "binary"), "utf8");
        data = JSON.parse(jsondata);
    }
    catch (err) {
        console.log(err);
    }
    return data;
}
console.log(Config78)

//Config78.init();
let port = 88;
 
app.use(router.routes());
 

app.listen(port, () => {
    console.log('listen  OK' + port);
});
