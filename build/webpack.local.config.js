var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.base.config');
var WebPackConfig = require('../config/webpack.config');
var ExtractTextWebpack = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(base, {
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].min.js',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.css$/,
            include: [path.resolve('assets')],
            use: ExtractTextWebpack.extract({
                use: 'css-loader!postcss-loader',
                publicPath: '../'
            })
        }, {
            test: /\.scss$/,
            include: [path.resolve('assets')],
            use: ExtractTextWebpack.extract({
                use: 'css-loader!postcss-loader!sass-loader',
                publicPath: '../'
            })
        }]
    },
    plugins: [
        new ExtractTextWebpack("css/[name].css"),
        ...WebPackConfig.getDirectory().map(file => {
            return new HtmlWebpackPlugin({
                filename: path.resolve('dist/views/', file + ".html"),
                inject: true,
                template: path.resolve('assets/view/' + file + '/index.html'),
                chunks: ['vendors', file],
                minify: false
            })
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${WebPackConfig.dev.host}:${WebPackConfig.dev.port}/${WebPackConfig.dev.productName}/`]
            }
        })
       

    ],
    stats: {
        assets: true,
        children: false,
        modules: false,
        colors: true
    }
});