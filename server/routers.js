const home = require('./controllers/home');
const sub = require('./controllers/sub');

module.exports = function(app, express, config) {

    const router = express.Router();
    const contetBase = config.productName;

    //首页
    app.get(/(\/|\/index\.html)$/, home);

    // 下一页
    app.get(/\/sub\.html$/, sub);

};
