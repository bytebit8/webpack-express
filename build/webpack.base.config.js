const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebPackConfig = require('../config/webpack.config');

module.exports = {
    resolve: {
        modules: ['node_modules', path.resolve('assets/public'), path.resolve('assets/view')],
        extensions: ['.js'],
        alias: WebPackConfig.alias
    },
    externals: WebPackConfig.externals,
    entry: WebPackConfig.getEntry(),
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
        new CleanWebpackPlugin(WebPackConfig.cleanDirector, { root: path.resolve(), verbose: false, beforeEmit: false })
    ]

}