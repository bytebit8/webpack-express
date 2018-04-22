var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.base.config');
var WebPackConfig = require('../config/webpack.config');
var ExtractTextWebpack = require('extract-text-webpack-plugin');

module.exports = merge(base, {

    module: {
        rules: [{
            test: /\.css$/,
            include: [path.resolve('assets')],
            use: ExtractTextWebpack.extract({
                use: 'css-loader?minimize=true!postcss-loader',
                publicPath: '../'
            })
        }, {
            test: /\.scss$/,
            include: [path.resolve('assets')],
            use: ExtractTextWebpack.extract({
                use: 'css-loader?minimize=true!postcss-loader!sass-loader',
                publicPath: '../'
            })
        }]
    },
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].[chunkhash:8].min.js',
        publicPath: './'
    },
    plugins: [
        new ExtractTextWebpack("css/[name].[chunkhash:8].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false, screw_ie8: false },
            mangle: { screw_ie8: false },
            output: { screw_ie8: false }
        })
    ]
});
