"use strict";

const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: './src/index',
        vendor: ['preact', 'redux', 'preact-router', 'preact-redux', 'react-addons-update', 'superagent', 'promise']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    plugins: [
        new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                properties: true,
                sequences: true,
                dead_code: true,
                conditionals: true,
                comparisons: true,
                evaluate: true,
                booleans: true,
                unused: true,
                loops: true,
                hoist_funs: true,
                cascade: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                drop_debugger: true,
                unsafe: true,
                hoist_vars: true,
                negate_iife: true,
            },
            mangle: {
                toplevel: true,
                sort: true,
                eval: true,
                properties: true
            },
            output: {
                space_colon: false,
                comments: function(node, comment) {
                    var text = comment.value;
                    var type = comment.type;
                    if (type == "comment2") {
                        // multiline comment
                        return /@copyright/i.test(text);
                    }
                }
            }
        }),
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