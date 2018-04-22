/*
 * __webpack_require__.p = 'http://xxx.yyy.com/'
 * require('img/a.png') => require('http://xxx.yyy.com/img/a.png')
 *
 * */

require('../../public/css/reset.scss');
require('./css/index.css');
require('./js/index');


if (module.hot) { 
    require('./index.html');
}
