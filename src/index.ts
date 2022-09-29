import Koa = require('koa') 
//import Config78 from "./Config78";
import router from './routers';
const app = new Koa();


//Config78.init();
let port = 83;
 
app.use(router.routes());
 

app.listen(port, () => {
    console.log('listen  OK' + port);
});
