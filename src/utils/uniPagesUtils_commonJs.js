/**
 * 此文件作为pages.js的工具包，遵循CommonJs规范
 */

/**
 * 对pages进行去重，并且可以设置首页
 * @param pages <Array> uni-app pages数组
 * @param indexPath <String> 首页地址，可省
 * @returns {Array} 返回去重和排序后pages
 */
function removeDuplicationAndSetIndexPage(pages = [], indexPath = pages[0] && pages[0].path || ''){
    let uniquePageMap = {}, resultPages=[], indexPage=[]

    // 去重
    pages.forEach((page) => {
        uniquePageMap[page.path] = page
    })

    // 抽出首页
    if (uniquePageMap[indexPath]) {
        indexPage.push(uniquePageMap[indexPath])
        delete uniquePageMap[indexPath]
    }

    for (let i in uniquePageMap){
        resultPages.push(uniquePageMap[i])
    }

    return [
        ...indexPage,
        ...resultPages
    ]
}

/**
 * 导出uni-simple-router需要的路由表格式
 * @param modules {Array} uni的pages.json中的pages数组
 * @returns {Array}
 */
function getRouterTableList (modules) {
    return modules.map(({path,style,...others}) => ({
        path: '/' + path,
        ...others
    }))
}



module.exports={
    removeDuplicationAndSetIndexPage,
    getRouterTableList
}
