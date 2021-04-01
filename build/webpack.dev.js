const path = require('path');
// const ExtractTextPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }

  console.log(path.resolve(__dirname, 'static'),'******************************************************')
module.exports = {
    mode: 'development',
    // context: resolve( "/"),
    entry: '@/app.js',
    // output: {
    //     path: path.resolve(__dirname, 'static'),
    //     publicPath: '/',
    //     filename: 'app-webpack-bundle.js'
    // },
    target: 'web',
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js'
        },
    },
    devtool: 'source-map',
    devServer: {
        // open: true,
        port: 8888,
        host: '0.0.0.0',
        hotOnly: true,
        compress: true,
        inline: true,
        publicPath: '/',
        proxy: {
            '/api': 'http://localhost:3000',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/, 
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            { 
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: resolve('images/[name].[hash:7].[ext]'), // 图片输出的路径
                        limit: 1 * 1024
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            // {  // eslint 规则以后再配置 
            //     enforce: 'pre',
            //     test: /\.(js|vue)$/,   
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/
            // }

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true,
       }),
       new webpack.HotModuleReplacementPlugin(),
    ]
}