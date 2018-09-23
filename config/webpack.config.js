const path = require('path');
const glob = require('glob');
const expressConfig = require('./express.config');

const WebPackConfig = {
    dev: {
        host: 'localhost',
        port: expressConfig.port,
        productName: expressConfig.productName
    },
    getDirectory,
    getEntry,
    alias: {
        '@': path.resolve('assets/public'),
        'jquery': 'lib/jquery.min'
    },
    vendors: ['jquery'],
    externals: {
        '$': 'window.$',
        'jQuery': 'window.$'
    },
    noParse: [/jquery/],
    cleanDirector: ['dist/js', 'dist/css', 'dist/img', 'dist/font', 'dist/media', 'dist/views/*.html']
};

/* 
 * 返回所有页面名称
 */
function getDirectory() {

    let dirs = [];

    glob.sync(path.resolve('assets/view/*'))
        .forEach((item) => {
            let itemSplit = item.split('/');
            dirs.push(itemSplit[itemSplit.length - 1]);
        });

    return dirs;

}
/* 
 *  返回所有入口
 */
function getEntry() {

    let entry = {};
    glob.sync(path.resolve('assets/view/*'))
        .forEach((item) => {

            let itemSplit = item.split('/');
            if (process.env.DEV_MODE === 'dev') {
                entry[itemSplit[itemSplit.length - 1]] = [item + '/entry.js', 'webpack-hot-middleware/client?reload=true'];
            } else {
                entry[itemSplit[itemSplit.length - 1]] = item + '/entry.js';
            }

        });

    entry["vendors"] = WebPackConfig.vendors;
    return entry;

}

module.exports = WebPackConfig;