

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');



fs.open('./build/configdir/domain/domain.js', 'w', function(err, fd) {
    const buf = 'import domain from \'./domain.dev_or_test\';\n' +
        'export default domain;\n';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});


fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export const errortip  = true;export const xiangmu = "jingjiren";export default "development";export const qufencity = 2;';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

fs.open('./build/router.build.hook.js', 'w', function(err, fd) {
    const buf = 'import router from \'@/router/split/jingjiren.router\'\n' +
        'export const loginRouter = router.loginRouter;\n' +
        'export const homeRouter = router.homeRouter;\n' +
        'export const otherRouter  = router.otherRouter;\n' +
        'export const appRouter  = router.appRouter;\n' +
        'export const aloneRouter  = router.aloneRouter;\n' +

        'export const isdev = true;';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

// var version = new Date().getTime()
// // var versionJson = JSON.stringify({version:version})
// var str = "var version = "+version+";window.pageVersion=version"
// // console.log('开始创建版本文件...')
// fs.writeFileSync("./version.js", str);

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: '懂房帝',
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            // {
            //     from: 'version.js'
            // },
            {
                from: 'src/views/my-components/text-editor/tinymce'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ],
    //设置跨域代理
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            //匹配代理的url
            '/v1.0.0': {
                // 目标服务器地址
                target: 'http://jingjiren.test.toutiaofangchan.com/',
                //路径重写
                pathRewrite: {'^/v1.0.0' : '/v1.0.0'},
                changeOrigin: true
            },
            '/spider': {
                // 目标服务器地址
                target: 'http://jingjiren.test.toutiaofangchan.com/',
                //路径重写
                pathRewrite: {'^/spider' : '/spider'},
                changeOrigin: true
            }
        }
    }
});
