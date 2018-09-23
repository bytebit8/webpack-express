const home = require('./controllers/home');
const sub = require('./controllers/sub');

module.exports = function(app, express, config) {

    const router = express.Router();
    const contetBase = config.productName;

    //页面路由
     app.get(/^\/xweber\/fanpai201807\/(index\.html)?$/, home);
    app.get(/(\/|\/index\.html)$/, home);
    app.get(/\/sub\.html$/, sub);

    //登录登出
    router.post('/login.htm', () => {});
    router.post('/logout.htm', () => {});

    //登录回调
    app.get('/root/passport/loginback.html', () => {});

    //访问来源限制（安全性过滤器）
    router.all('/auth/*', () => {});
    //登录拦截（权限性过滤器）
    router.all('/auth/*', () => {});

    //业务逻辑接口
    //....

    app.use(contetBase, router);

    /* 404页面
    app.get('*', function(req, res) {
        res.redirect('/404.shtml');
    });
    */

};