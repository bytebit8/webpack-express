var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebPackConfig = require('../config/webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');


function getFileOrDirecotr(type) {

    let obj = type === 'entry' ? {} : [];

    glob.sync(path.resolve('assets/view/*'))
        .forEach((item) => {

            let itemSplit = item.split('/');
            if (type === 'entry') {

                if (process.env.DEV_MODE === 'dev') {
                    obj[itemSplit[itemSplit.length - 1]] = [item + '/entry.js', 'webpack-hot-middleware/client?reload=true'];
                } else {
                    obj[itemSplit[itemSplit.length - 1]] = item + '/entry.js';
                }

            }

            if (type === 'dir') {
                obj.push(itemSplit[itemSplit.length - 1]);
            }

        });
    type === 'entry' && (obj["vendors"] = WebPackConfig.vendors);

    return obj;
}

module.exports = {
    resolve: {
        modules: ['node_modules', path.resolve('assets/public'), path.resolve('assets/view')],
        extensions: ['.js'],
        alias: WebPackConfig.alias
    },
    externals: WebPackConfig.externals,
    entry: getFileOrDirecotr('entry'),
    module: {
        noParse: WebPackConfig.noParse,
        rules: [{
            test: /\.(jpg|jpeg|png|gif|webp)$/,
            include: [path.resolve('assets')],
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name: "img/[name]-[hash:8].[ext]"
                }
            }]
        }, {
            test: /\.(ttf|otf|svg|woff|eot|woff2)$/,
            include: [path.resolve('assets')],
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: 'font/[name]-[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10240,
                name: 'media/[name].[hash:8].[ext]'
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.ejs$/,
            include: [path.resolve('assets')],
            loader: 'ejs-loader?variable=data'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ names: ['vendors'], minChunks: Infinity }),
        new CleanWebpackPlugin(WebPackConfig.cleanDirector, { root: path.resolve(), verbose: false }),
        ...getFileOrDirecotr('dir').map(file => {
            return new HtmlWebpackPlugin({
                filename: process.env.DEV_MODE === 'dev' ? file + ".html" : path.resolve('dist/views/', file + ".html"),
                inject: true,
                template: path.resolve('assets/view/' + file + '/index.html'),
                chunks: ['vendors', file],
                minify: process.env.DEV_MODE === 'dev' ? false : { removeContents: true, collapseWhitespace: true, removeAttributeQuotes: true }
            })
        })
    ],
    stats: {
        assets: true,
        children: false,
        modules: false,
        colors: true
    }
}
