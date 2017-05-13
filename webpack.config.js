/**
 * Created by 李伟 on 2017/3/11.
 */
var webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    context: __dirname + '/src',
    entry: './js/root.js',
    output: {
        path: __dirname + '/src/',
        filename: 'bundle.js',
        publicPath: '/src'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()//热模块替换插件
    ],


}
