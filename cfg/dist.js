const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let baseConfig = require('./base');

const plugins = [
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.BannerPlugin('@author LSZH'),
    new ExtractTextPlugin({
        filename: 'css/[name].[chunkhash:8].css' //路径以及命名
    }),
    new UglifyJsPlugin({
      uglifyOptions : {
        output:{
          // 删除所有的注释
          comments: false
        },
        compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
        }
      }
    })
];
baseConfig = baseConfig(plugins);

let config = {
    devtool: 'sourcemap',
    plugins: baseConfig.plugins,
    entry : baseConfig.entryChunks,
    output:{
        path:  path.resolve(__dirname, '../build'),
        filename: 'js/[name].[chunkhash:8].js'
    },
    resolveLoader: {
      modules: ['node_modules']
    },
    //添加css处理
    module: {
        rules: [{
            test:  path.resolve(__dirname, '../lib/js/jquery.js'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            },{
                loader: 'expose-loader',
                options: '$'
            }]
        },
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: {
              loader : "html-loader",
              options :{
                attrs: ['img:src', 'link:href']
              }
          },
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use:[{
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              limit: 8192,
              outputPath: "images/",
              useRelativePath : true
            }  
          }]
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                }]
            })
        }]
    },
    resolve: {
      extensions: ['.js', '.json', '.coffee']
    }
};
module.exports = config;