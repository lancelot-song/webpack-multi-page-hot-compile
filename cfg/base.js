const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = function(plugins){

//-------通过循环 tmplConf配置 调用 HtmlWebpackPlugin 捕获模板配置文件 Start --------------

    //用于存储需要处理的 JS  
    let entryChunks = {
        'base' : './lib/js/base'
    };

    //模板默认参数
    let tmplConf = {
        favicon: path.resolve(__dirname,'../lib/icon.jpg'),
        filename: '',
        template: '',
        chunks: [],//单独配置模板的js依赖
        minify: {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };

    /*
        根据key生成html，根据value读取模板key的私有js文件，若模板无私有js引用则传空
        如 ： 
        {
            htmlName : {
                js_01_Name : src,
                js_02_Name : src
            },
            ...
        }
    */
    const entryTpml = {
        "index" : {
            index :"./lib/js/index",
        },
        "plandesign" : {
            plandesign :"./lib/js/plandesign"
        },
        "news" : {
            news : "./lib/js/news",
            news_two : "./lib/js/news_02"
        }
    };

    //为每个html文件 定义自身的模板参数
    for(let tempName in entryTpml){
        tmplConf.filename = tempName + '.html';//输出的html名
        tmplConf.template = path.resolve(__dirname,'../lib/' + tempName + '.tmpl.html');//读取模板地址
        tmplConf.chunks = ['common','base'];
        tmplConf.chunks.push( tempName );
        plugins.push(new HtmlWebpackPlugin( tmplConf ))

        //把 entryTpml 的所有JS配置写入 entryChunks
        if( entryTpml[tempName] !== '' ){
            for(let jsName in entryTpml[tempName] ){
                entryChunks[jsName] = entryTpml[tempName][jsName];
            }
        }
    }
//-------通过循环 tmplConf配置 调用 HtmlWebpackPlugin 捕获模板配置文件 End --------------


    //返回插件处理过的数据， 入口配置JS
    return { plugins, entryChunks }
}


module.exports = baseConfig;