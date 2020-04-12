module.exports=function(content,loader){
    const hotRequire = require('./uni-pages-hot-modules')(loader)
    return hotRequire('./2.js')
}
