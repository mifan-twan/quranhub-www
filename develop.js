"use strict";

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.develop');

const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    hotApiFallback: true
});

app.listen(3001, '0.0.0.0', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is running at port 3001');
    }
})