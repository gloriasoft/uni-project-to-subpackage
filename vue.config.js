// vue.config.js
const webpack = require('webpack')
// 获取uniapp2wxpack的配置文件projectToSubPackageConfig.js的内容
const projectToSubPackageConfig = require('./projectToSubPackageConfig')
module.exports = {
    // configureWebpack: {
    //     output: {
    //         // 也可以手动设置一个自己命名的常量
    //         library: projectToSubPackageConfig.subPackagePath
    //     }
    // }
}
