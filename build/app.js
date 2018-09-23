const ejs = require('ejs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('../server/routers');

const expressConfig = require('../config/express.config');
const log4jsConfig = require('../config/log4j.config');

const app = express();

//设置模版变量
Object.keys(expressConfig.locals).forEach(function(idx) {
    app.locals[idx] = expressConfig.locals[idx];
});

//开发配置
if (process.env.DEV_MODE === "dev") {

    const webpack = require('webpack');
    const webpackDevMiddleWare = require('webpack-dev-middleware');
    const webpackHotMiddleWare = require('webpack-hot-middleware');
    const webpackDevConfig = require('./webpack.dev.config');
    const complier = webpack(webpackDevConfig);

    app.use('/' + expressConfig.productName, webpackDevMiddleWare(complier, {
        stats: {
            assets: true,
            children: false,
            modules: false,
            colors: true
        }
    }));

    app.use(webpackHotMiddleWare(complier));

}
//设置模板引擎
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//设置模板目录
app.set('views', path.resolve(__dirname, '../dist/views'));

//设置静态资源目录
app.use('/' + expressConfig.productName, express.static(path.resolve(__dirname, '../dist')));

//设置favicon
app.use(favicon(path.resolve(__dirname, '../dist/favicon.ico')));

//设置日志
// app.use(logs.useLogger(log4jsConfig));


//解析 application/x-www-form-urlencoded 与 application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//设置session和cookie
app.use(cookieParser(expressConfig.session.secret));
app.use(session(expressConfig.session));

//绑定全部路由
router(app, express, expressConfig);

//监听端口号
app.listen(expressConfig.port);