var rm = require('rimraf');
var path = require('path');
var base = require('./webpack.base.config');
var webpack = require('webpack');
var merge = require('webpack-merge');

module.exports = merge(base, {
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            include: [path.resolve('assets')],
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            include: [path.resolve('assets')],
            loader: "style-loader!css-loader!sass-loader"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
