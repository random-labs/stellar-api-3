var webpack = require('webpack');
var webpackStats = require('stats-webpack-plugin');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
  .forEach(function(mod) { nodeModules[mod] = 'commonjs ' + mod; });

module.exports = {
    entry: {
        'server/app': 'src/server/scripts/app'
    },
    target: 'node',
    devtool: 'inline-source-map',
    output: {
        path: 'build',
        filename: '[name].js',
        pathinfo: true,
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '[resource-path]'
    },
    watch: true,
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: nodeModules,
    resolve: {
        root: process.cwd(),
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.BannerPlugin("var __webpack_version_hash__ = '';", {
            raw: true
        }), new webpackStats('server/webpack.json')
    ]
};
