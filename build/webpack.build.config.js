const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebPackConfig = require('../config/webpack.config');
const ExtractTextWebpack = require('extract-text-webpack-plugin');

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
        publicPath: ''
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextWebpack("css/[name].[chunkhash:8].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false, screw_ie8: false },
            mangle: { screw_ie8: false },
            output: { screw_ie8: false }
        }),
        ...WebPackConfig.getDirectory().map(file => {
            return new HtmlWebpackPlugin({
                filename: path.resolve('dist/views/', file + ".html"),
                inject: true,
                template: path.resolve('assets/view/' + file + '/index.html'),
                chunks: ['vendors', file],
                minify: { removeContents: true, collapseWhitespace: true, removeAttributeQuotes: true }
            })
        })
    ],
    stats: 'errors-only'
});