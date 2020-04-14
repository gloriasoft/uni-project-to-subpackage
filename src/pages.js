/**
 * 此文件为@dcloudio/webpack-uni-pages-loader的一个钩子入口，遵循CommonJs规范
 * 可以直接使用require引入其他依赖，但是不会有热重载的效果
 * uni-pages-hot-modules在被初始化之后，可以引入其他依赖，并且相关依赖具备热重载
 */

// 引入一个工具函数，用于对pages进行去重和设置首页（没有使用热重载引入，因为没必要）
const { removeDuplicationAndSetIndexPage } = require('./utils/uniPagesUtils_commonJs')

/**
 * 使用global是为了之后的模块不需要再去引入uni-pages-hot-modules
 * 更重要的是为了之后可以在客户端代码直接引入模块做准备
 * 在vue.config.js中使用DefinePlugin插件，将hotRequire替换成require
 * 就可以在客户端代码引入路由模块，可用于uni-simple-router，并且做到本地和客户端代码双向热重载
 */
global.hotRequire = require('uni-pages-hot-modules')

/**
 * 输出最终的pages.json解析内容
 * @param pagesJson <Object> src/pages.json的文件解析内容（作为初始内容传入）
 * @param loader <Object> @dcloudio/webpack-uni-pages-loader会传入一个loader对象
 * @returns {Object} uni-app需要的pages.json配置内容
 */
function exportPagesConfig (pagesJson={}, loader={}) {
    // 初始化uni-pages-hot-modules（输入loader）
    hotRequire(loader)
    // pages的初始配置
    let basePages = []
    // subPackages的初始配置
    let baseSubPackages = []

    // 要输出的pages
    let pages = removeDuplicationAndSetIndexPage(
        [
            ...basePages,
            ...hotRequire('./page_modules/index.js')
            // ...hotRequire('./page_modules/tabbar.js'),
            // // 故意重复引入，用来验证去重方法
            // ...hotRequire('./page_modules/tabbar.js'),
            // ...hotRequire('./page_modules/component.js'),
            // ...hotRequire('./page_modules/appPlus.js')
        ],
        // 设置首页(可省)
        'pages/tabBar/component/component'
    )

    // 要输出的subPackages
    let subPackages = [
        ...baseSubPackages,
        // ...hotRequire('./subpackage_modules/api.js'),
        // ...hotRequire('./subpackage_modules/extUI.js'),
        // ...hotRequire('./subpackage_modules/template.js')
    ]

    return {
        // 合并pages.json的初始内容
        ...pagesJson,
        pages,
        subPackages
    }
}

module.exports = exportPagesConfig
