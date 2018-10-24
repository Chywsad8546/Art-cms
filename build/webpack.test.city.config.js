const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');
fs.open('./build/configdir/domain/domain.js', 'w', function(err, fd) {
    const buf = 'import domain from \'./domain.dev_or_test\';\n' +
        'export default domain;\n';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export const errortip  = true;export const xiangmu = "jingjiren";export default "production";export const qufencity = 1;';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});
fs.open('./build/router.build.hook.js', 'w', function(err, fd) {
    const buf = 'import router from \'@/router/split/city.router\'\n' +
        'export const loginRouter = router.loginRouter;\n' +
        'export const homeRouter = router.homeRouter;\n' +
        'export const otherRouter  = router.otherRouter;\n' +
        'export const appRouter  = router.appRouter;\n' +
        'export const aloneRouter  = router.aloneRouter;\n' +
        'export const isdev = false;';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});


module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',  // 修改 https://iv...admin 这部分为你的服务器域名
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendors',
            // filename: 'vendors.[hash].js'
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new UglifyJsParallelPlugin({
        //     workers: os.cpus().length,
        //     mangle: true,
        //     compressor: {
        //       warnings: false,
        //       drop_console: true,
        //       drop_debugger: true
        //      }
        // }),
        new CopyWebpackPlugin([
            {
                from: 'td_icon.ico'
            },
            {
                from: 'src/styles/fonts',
                to: 'fonts'
            },
            {
                from: 'src/views/main-components/theme-switch/theme'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        }),
        new HtmlWebpackPlugin({
            title: '懂房帝',
            favicon: './td_icon.ico',
            filename: '../index.html',
            template: '!!ejs-loader!./src/template/index.ejs',
            inject: false
        })
    ]
});
