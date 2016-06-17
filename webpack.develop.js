"use strict";

const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-maps',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: '"develop"'}}),
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
}