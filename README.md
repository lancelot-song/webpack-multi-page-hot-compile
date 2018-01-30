
## 这是一个轻量的开发环境

## 仅支持 开发环境热编译、ES6编译、资源版本控制、公用JS整合/压缩、图片压缩（需要其他功能请自己改装）

在单页应用与组件模块化开发的时代，这个东西的用处并不大，但若非要用，配置起来又很麻烦
这个环境也许可用性不大，但再简单的项目也要显得专业！ （逼格）

开发环境： npm run serve
输出打包： npm run build


文件使用.tmpl.html格式， css/js不需要写入页面，而是通过webpack进行配置相关依赖

如 ： cfg/base.js:

const entryTpml = {
    "index" : {
        index :"./lib/js/index",
    }
};

等同于 

const entryTpml = {
    "index(模板名)" : {
        index(打包后script引入的js名) :"./lib/js/index(打包的文件地址)",
    }
};

css通过index.js引入 （ 目前没有找到其他便捷的方法解决 打包后将css作为link标签插入Head的方法 ）
import '../css/index.css';


