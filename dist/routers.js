"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get('/', (ctx) => {
    ctx.body = 'router index';
});
router.get('/home', (ctx) => {
    ctx.body = 'router home';
});
exports.default = router;
//# sourceMappingURL=routers.js.map