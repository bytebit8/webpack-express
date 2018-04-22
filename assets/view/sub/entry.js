/*
 * __webpack_require__.p = 'http://xxx.yyy.com/'
 * require('img/a.png') => require('http://xxx.yyy.com/img/a.png')
 *
 * */

require('../../public/css/reset.scss');
require('./css/sub.css');
require('./js/sub');


if (module.hot) {
    require('./index.html');
}
