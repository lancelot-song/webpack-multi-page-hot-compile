const path = require('path');
const webpack = require('webpack');

let baseConfig = require('./base');
const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.BannerPlugin('@author LSZH')
]
baseConfig = baseConfig(plugins);

let config = {
    devtool: 'eval',
    plugins: baseConfig.plugins,
    entry : baseConfig.entryChunks,
    output:{
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].js'
    },
    resolveLoader: {
      modules: ['node_modules']
    },
    devServer: {
        contentBase:  path.resolve(__dirname, '../build/'),
        host: 'localhost',
        port: 8083, // 默认8080
        inline: true, // 可以监控js变化
        hot: true, // 热启动
        noInfo: false
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
          use: [ "html-loader" ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use:[{
            loader: 'url-loader',
            options: {
              name: '[hash:8].[ext]',
              limit: 8192,
              outputPath: "images/",
              useRelativePath : true
            }  
          }]
        },
        {
            test: /\.css$/,
            use: [
                    {
                      loader: 'style-loader'
                    },
                    {
                      loader: 'css-loader'
                    }
                ]
        },
        {
            test: /\.scss$/,
            use: [
                    {
                      loader: 'style-loader'
                    },
                    {
                      loader: 'css-loader'
                    },
                    {
                      loader: 'sass-loader'
                    }
                ]
        }]
    },
    resolve: {
      extensions: ['.js', '.json', '.coffee']
    }
};

module.exports = config;