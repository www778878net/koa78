"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
//import Config78 from "./Config78";
const routers_1 = require("./routers");
const app = new Koa();
//Config78.init();
let port = 83;
app.use(routers_1.default.routes());
app.listen(port, () => {
    console.log('listen  OK' + port);
});
//# sourceMappingURL=index.js.map