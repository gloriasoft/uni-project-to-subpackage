const gulp = require('gulp')
const del=require('del')
const $ = require('gulp-load-plugins')()
const path= require('path')
const fs = require('fs-extra')
const stripJsonComments = require('strip-json-comments')
const rfr = require('read-file-relative').readSync
// const prompt = require('prompt');
const strip = require('gulp-strip-comments')
const projectToSubPackageConfig = require('./projectToSubPackageConfig')

let env='dev'
if(process.env.NODE_ENV=='production'){
    env='build'
}

const base='dist/'+env+'/mp-weixin'
const target='dist/'+env+'/mp-weixin-weimob'
const basePath=path.resolve(__dirname,base)
let subModePath

function getLevelPath(level){
    let arr=Array(level)
    return arr.fill('../').join('')
}
function getLevel(relative){
    return relative.split(/[\\/]/).length-1
}

function uniRequireWxResource(){
    return $.replace(/__uniRequireWx\(([a-zA-Z.\/"'@\d]+)\)/g,function(match, p1, offset, string){
        let pathLevel=getLevel(this.file.relative)
        console.log(`编译${match}-->require(${p1.replace(/@wxResource\//g,getLevelPath(pathLevel))})`)
        return `require(${p1.replace(/@wxResource\//g,getLevelPath(pathLevel))})`
    },{
        skipBinary:false
    })
}

function replaceWxPagesConfig(){
    return $.replace(/[\s\S]+/,function(match){
        let config=JSON.parse(stripJsonComments(match))
        let appJson=JSON.parse(rfr(base+'/app.json'))
        if(config.wxResource){
            if(config.wxResource.pages){
                appJson.pages=Array.from(new Set([...(config.indexPage?[config.indexPage]:[]),...appJson.pages,...config.wxResource.pages]))
            }
            if(config.wxResource.subPackages){
                let subPackageMap={}
                if(appJson.subPackages){
                    appJson.subPackages.forEach((subPackage,index)=>{
                        subPackageMap[subPackage.root]=subPackage
                    })
                }
                config.wxResource.subPackages.forEach((subPackage,index)=>{
                    subPackageMap[subPackage.root]=subPackage
                })
                let subPackages=[]
                for(var i in subPackageMap){
                    subPackages.push(subPackageMap[i])
                }
                appJson.subPackages=subPackages
            }
        }
        return JSON.stringify(appJson)
    },{
        skipBinary:false
    })
}

function replaceApp(){
    return $.replace(/[\s\S]+/,function(match){
        let config=JSON.parse(stripJsonComments(rfr('src/pages.json')))
        let appJson=JSON.parse(match)
        if(config.wxResource){
            if(config.wxResource.pages){
                appJson.pages=Array.from(new Set([...(config.indexPage?[config.indexPage]:[]),...appJson.pages,...config.wxResource.pages]))
            }
            if(config.wxResource.subPackages){
                let subPackageMap={}
                if(appJson.subPackages){
                    appJson.subPackages.forEach((subPackage,index)=>{
                        subPackageMap[subPackage.root]=subPackage
                    })
                }
                config.wxResource.subPackages.forEach((subPackage,index)=>{
                    subPackageMap[subPackage.root]=subPackage
                })
                let subPackages=[]
                for(var i in subPackageMap){
                    subPackages.push(subPackageMap[i])
                }
                appJson.subPackages=subPackages
            }
        }
        return JSON.stringify(appJson)
    },{
        skipBinary:false
    })
}

gulp.task('clean:loc',function(done){
    del.sync([target],{force:true})
    done()
});

gulp.task('clean:subModePath',function(done){
    del.sync([subModePath],{force:true})
    done()
});

gulp.task('watchSrcPages',function(){
    return gulp.src('src/pages.json',{base:'src',allowEmpty:true})
        .pipe($.watch('src/pages.json'))
        .pipe(replaceWxPagesConfig())
        .pipe($.rename('app.json'))
        .pipe(gulp.dest(target))
})

gulp.task('watchDistApp',function(){
    return gulp.src(base+'/app.json',{base,allowEmpty:true})
        .pipe($.watch(base+'/app.json',{base}))
        .pipe(replaceApp())
        .pipe(gulp.dest(target))
})

gulp.task('subMode:createUniSubPackage',function(done){
    fs.mkdirsSync(base)
    let f=$.filter([base+'/common/vendor.js',base+'/common/main.js',base+'/common/runtime.js',base+'/pages/**/*.js'],{restore:true})
    let filterVendor=$.filter([base+'/common/vendor.js'],{restore:true})
    let filterJs=$.filter([base+'/**/*.js','!'+base+'/common/vendor.js','!'+base+'/common/main.js','!'+base+'/common/runtime.js'],{restore:true})
    let filterWxss=$.filter([base+'/**/*.wxss'],{restore:true})
    let filterJson=$.filter([base+'/**/*.json'],{restore:true})
    let filterWxml=$.filter([base+'/**/*.wxml'],{restore:true})
    return gulp.src([base+'/**',base,'!'+base+'/*.*'],{base,allowEmpty:true})
        .pipe($.if(env=='dev',$.watch([base+'/**',base,'!'+base+'/*.*'],{base})))
        .pipe($.filter(function(file){
            if(file.event=='unlink'){
                del.sync([file.path.replace(basePath,path.resolve(__dirname,subModePath))],{force:true})
                return false
            }else{
                return true
            }
        }))
        .pipe(filterVendor)
        .pipe($.replace(/^/,'let App=function(){};',{
            skipBinary:false
        }))
        .pipe(filterVendor.restore)
        .pipe(f)
        .pipe(strip())
        .pipe(uniRequireWxResource())
        .pipe(f.restore)
        .pipe(filterJs)
        .pipe($.replace(/^/,function(match){
            if(fs.existsSync('./src/'+this.file.relative)){
                return match
            }
            let packagePath=getLevelPath(getLevel(this.file.relative))
            return `
                require('${packagePath}common/runtime.js');
                require('${packagePath}common/vendor.js');
                require('${packagePath}common/main.js');
                `
        },{
            skipBinary:false
        }))
        .pipe(filterJs.restore)
        .pipe(filterJson)
        .pipe($.replace(/[\s\S]*/,function(match){
            if(!fs.existsSync('./src/'+this.file.relative.replace(/json$/,'vue'))){
                return match
            }
            let json=JSON.parse(this.file.contents.toString())
            for(var i in json.usingComponents){
                if(json.usingComponents[i].indexOf('/')===0){
                    json.usingComponents[i]=getLevelPath(getLevel(this.file.relative))+json.usingComponents[i].replace(/^\//,'')
                }
            }
            return JSON.stringify(json)
        },{
            skipBinary:false
        }))
        .pipe(filterJson.restore)
        .pipe(filterWxss)
        .pipe($.if(env=='build',$.cleanCss({
            inline:['none']
        })))
        .pipe($.replace(/(}|^|\s)__uniWxss\s*{([^{}]+)}/g,function(match,p1,p2){
            let str=''
            let pathLevel=getLevel(this.file.relative)
            p2.replace(/\s*import\s*:\s*([^\s]*;)/g,function(match,p1){
                str+=`@import ${p1.replace(/@wxResource\//g,getLevelPath(pathLevel))}`
            })
            return p1+str
        },{
            skipBinary:false
        }))
        .pipe($.replace(/^[\s\S]*$/,function(match){
            let pathLevel=getLevel(this.file.relative)
            let mainWxss=`@import ${'"@wxResource/common/main.wxss";'.replace(/@wxResource\//g,getLevelPath(pathLevel))}`
            // let result=`@import ${'"@wxResource/common/formid.wxss";'.replace(/@wxResource\//g,getLevelPath(pathLevel))}\n${match}`
            let result = ''
            if(!this.file.relative.match(/^common[\\/]+main.wxss/i)){
                result=mainWxss
            }
            return result
        },{
            skipBinary:false
        }))
        .pipe(filterWxss.restore)
        .pipe(gulp.dest(subModePath))
})

gulp.task('subMode:copyWxResource',function(){
    return gulp.src(['src/wxResource/**','src/wxResource'],{base:'src/wxResource',allowEmpty: true})
        .pipe($.if(env=='dev',$.watch(['src/wxResource/**','src/wxResource'],{base:'src/wxResource'})))
        .pipe($.filter(function(file){
            if(file.event=='unlink'){
                del.sync([file.path.replace(path.resolve(__dirname,'src/wxResource'),path.resolve(__dirname,subModePath))],{force:true})
                return false
            }else{
                return true
            }
        }))
        .pipe(gulp.dest(subModePath));
})


gulp.task('mpWxSubMode',gulp.series(function(done){
    try{
        subModePath = path.resolve(__dirname, projectToSubPackageConfig.mainWeixinMpPath, projectToSubPackageConfig.subPackagePath)
        console.log(subModePath,'xxxxxxxxxxxxxxx')
    }catch(e){
        throw Error('\n\033[45;37m mainMpConfig.js不存在\n\033[37m如果是首次启动项目\n\033[37m请在项目根目录手动创建subModeConfig.js文件,并且使用\n\033[37mmodule.exports={path:"目标小程序的分包目录"}\n\033[37m并且为path设置小程序的分包目\n\033[41;37m并且目录不能错，否则该目录将被强制删除!!!!!! \033[0m')
    }
    console.log('等待uni-app进入编译状态，10秒左右之后将进行二次编译，如果遇到没有权限的错误，请调整等待时长')
    //延迟10秒再运行，等待uni-app先进入打包状态
    setTimeout(done,10000)
    // done()
},'clean:subModePath',gulp.parallel('subMode:createUniSubPackage','subMode:copyWxResource'),function(done){
    if(env=='build'){
        return  gulp.src([base+'/app.json'],{base,allowEmpty: true})
            .pipe(gulp.dest(subModePath));
    }else{
        done()
    }
},function(done){
    done()
    if(env=='build'){
        process.exit()
    }
}))
