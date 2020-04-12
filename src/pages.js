module.exports=(pagesJson,loader)=>{
    const hotRequire = require('./uni-pages-hot-modules')(loader)
    return {
        //	indexPage配置后，会提升为整个小程序项目的首页
        // 1212
        "indexPage":"",
        "pages": [
            {
                "path": "pages/about/about",
                "style": {
                    "navigationBarTitleText": hotRequire('./1.js')(pagesJson,loader)
                }
            }
        ],
        "subPackages":[{
            "root": "pages/test",
            "pages": [{
                "path": "about",
                "style": {
                    "navigationBarTitleText": "测试"
                }
            }]
        }],
        "wxResource":{
            "subPackages":[{
                "root": "pages/test",
                "pages": ["index"]
            }]
        }
    }
}
