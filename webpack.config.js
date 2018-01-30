const args = require('minimist')(process.argv.slice(2));
let webpackConfig;
if( args && args.env){
    if(args.env === 'dev'){
        webpackConfig = require('./cfg/dev.js');
    }
    else if(args.env === 'dist'){
        webpackConfig = require('./cfg/dist.js');
    }
}
else{
    console.log("未声明配置参数，默认开发环境运行");
    webpackConfig = require('./cfg/dev.js');
}

module.exports = webpackConfig;