import Router = require("koa-router");
const router: Router = new Router();

router.get('/', (ctx: any) => {
    ctx.body = 'router index';
});
router.get('/home', (ctx: any) => {
    ctx.body = 'router home';
});

export default router;
