/*
* 作者devilwjp（天堂里的花大咩）
* 2019年7月
* 解决的问题：一切不能输出分包的小程序开发框架，都是耍流氓！
* 思路：在uni-app打包完之后，再进行一次打包，再次打包不可使用webpack，使用gulp进行文件流级别的处理，解除uni对于app.js的依赖，以及解除对Page和Component的劫持
* 由于是解耦包，所以不会在app.js中留存任何uni的痕迹，可做到整个uni项目不依赖于主包运行
*
* 对uni-app在微信小程序的打包方案进行改造，形成解耦打包，并且支持微信原生页面直接在uni-app项目中使用
* 1.可以使项目输出微信小程序的分包，被其他小程序项目使用
* 2.支持微信原生页面直接在uni-app项目中使用（还支持任何原生的js、wxss在uni-app项目中使用）
* 3.支持原生小程序项目直接在uni-app项目中进行开发，当uni-app的解耦包是主包时，uni-app包可以通过globalData进行方法公开，被原生小程序的其他页面和分包使用
* 4.支持uni-app项目调用原生小程序项目中的资源
*
* */
const gulp = require('gulp')
const del=require('del')
const $ = require('gulp-load-plugins')()
const path= require('path')
const fs = require('fs-extra')
const stripJsonComments = require('strip-json-comments')
const rfr = require('read-file-relative').readSync
const strip = require('gulp-strip-comments')
const projectToSubPackageConfig = require('./projectToSubPackageConfig')
const readline = require('readline');

let env='dev'
if(process.env.NODE_ENV === 'production'){
    env='build'
}

const base='dist/'+env+'/mp-weixin'
const target='dist/'+env+'/mp-weixin-subpackage-project'
const basePath=path.resolve(__dirname,base)
let subModePath
let writeTimer
function writeLastLine(val) {
    // readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(val);
    clearTimeout(writeTimer)
    writeTimer=setTimeout(()=>{
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write('解耦构建，正在监听中......(此过程如果出现权限问题，请使用管理员权限运行)');
    },1000)
}

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
        console.log(`\n编译${match}-->require(${p1.replace(/@wxResource\//g,getLevelPath(pathLevel))})`)
        return `require(${p1.replace(/@wxResource\//g,getLevelPath(pathLevel))})`
    },{
        skipBinary:false
    })
}

function mergeToTargetJson(type){
    // console.log('处理app.json')
    writeLastLine('处理app.json......')
    return $.replace(/[\s\S]+/,function(match){
        let config, appJson, mainJson, targetJson={}
        let typeMap={
            pagesJson(){
                try{
                    config=JSON.parse(stripJsonComments(match))
                }catch(e){
                    config={}
                }

            },
            baseAppJson(){
                try{
                    appJson=JSON.parse(match)
                }catch(e){
                    appJson={}
                }
            },
            mainAppJson(){
                try{
                    mainJson=JSON.parse(match)
                }catch(e){
                    mainJson={}
                }
            }
        }
        typeMap[type]()
        try{
            if(!config){
                config=JSON.parse(stripJsonComments(rfr('src/pages.json')))
            }
        }catch(e){
            config={}
        }
        try{
            if(!appJson){
                appJson=JSON.parse(rfr(base+'/app.json'))
            }
        }catch(e){
            appJson={}
        }
        try{
            if(!mainJson){
                mainJson=JSON.parse(rfr(projectToSubPackageConfig.mainWeixinMpPath+'/app.json'))
            }
        }catch(e){
            mainJson={}
        }
        // 处理subpackage路径拼接
        function addSubPackagePath(pagePath){
            return projectToSubPackageConfig.subPackagePath+'/'+pagePath
        }

        if(appJson.pages){
            appJson.pages.forEach((pagePath, index)=>{
                appJson.pages[index]=addSubPackagePath(pagePath)
            })
        }

        if(appJson.subPackages){
            appJson.subPackages.forEach((subPackage)=>{
                subPackage.root=addSubPackagePath(subPackage.root)
            })
        }

        if(config.wxResource){
            if(config.wxResource.pages){
                config.wxResource.pages.forEach((pagePath, index)=>{
                    config.wxResource.pages[index]=addSubPackagePath(pagePath)
                })
            }

            if(config.wxResource.subPackages){
                config.wxResource.subPackages.forEach((subPackage)=>{
                    subPackage.root=addSubPackagePath(subPackage.root)
                })
            }
        }

        // tabBar
        if(appJson.tabBar && appJson.tabBar.list){
            appJson.tabBar.list.forEach(({pagePath, iconPath, selectedIconPath, ...others}, index)=>{
                appJson.tabBar.list[index]={
                    pagePath: pagePath ? addSubPackagePath(pagePath) : '',
                    iconPath: iconPath ? addSubPackagePath(iconPath) : '',
                    selectedIconPath: selectedIconPath ? addSubPackagePath(selectedIconPath) : '',
                    ...others
                }
            })
        }

        // merge all first
        targetJson= {
            ...appJson,
            ...mainJson
        }

        // merge pages
        targetJson.pages=Array.from(new Set([
                ...(config.indexPage ? [addSubPackagePath(config.indexPage)] : []),
                ...mainJson.pages || [],
                ...appJson.pages || [],
                ...config.wxResource && config.wxResource.pages || []
            ]
        ))

        // merge subPackages
        targetJson.subPackages=[
            ...config.wxResource && config.wxResource.subPackages || [],
            ...appJson.subPackages || [],
            ...mainJson.subPackages || []
        ]

        // usingComponents
        if(appJson.usingComponents){
            for(let i in appJson.usingComponents){
                appJson.usingComponents[i] = '/' + projectToSubPackageConfig.subPackagePath + appJson.usingComponents[i]
            }
            targetJson.usingComponents={
                ...targetJson.usingComponents || {},
                ...appJson.usingComponents
            }
        }
        return JSON.stringify(targetJson)
    },{
        skipBinary:false
    })
}

gulp.task('clean:base',async function(done){
    await del([base+'/**/*'])
    done()
});

gulp.task('clean:subModePath',async function(done){
    await del([subModePath+'/**/*'])
    done()
});

gulp.task('clean:previewDist',async function(done){
    await del([target+'/**/*'])
    done()
});

gulp.task('watch:pagesJson',function(){
    return gulp.src('src/pages.json',{base:'src',allowEmpty:true})
        .pipe($.if(env==='dev',$.watch('src/pages.json',{base:'src'},function(event){
            // console.log('处理'+event.path)
            writeLastLine('处理'+event.path+'......')
        })))
        .pipe(mergeToTargetJson('pagesJson'))
        .pipe($.rename('app.json'))
        .pipe(gulp.dest(target))
})

gulp.task('watch:baseAppJson',function(){
    return gulp.src(base+'/app.json',{base,allowEmpty:true})
        .pipe($.if(env==='dev',$.watch(base+'/app.json',{base},function(event){
            // console.log('处理'+event.path)
            writeLastLine('处理'+event.path+'......')
        })))
        .pipe(mergeToTargetJson('baseAppJson'))
        .pipe(gulp.dest(target))
})

gulp.task('watch:mainAppJson',function(){
    let base=projectToSubPackageConfig.mainWeixinMpPath
    return gulp.src(base+'/app.json',{base,allowEmpty:true})
        .pipe($.if(env==='dev',$.watch(base+'/app.json',{base},function(event){
            // console.log('处理'+event.path)
            writeLastLine('处理'+event.path+'......')
        })))
        .pipe(mergeToTargetJson('mainAppJson'))
        .pipe(gulp.dest(target))
})

gulp.task('watch:mainWeixinMp',function(){
    let base=projectToSubPackageConfig.mainWeixinMpPath
    let basePackPath=base+'/'+projectToSubPackageConfig.subPackagePath
    return gulp.src([base+'/**/*','!'+base+'/app.json','!'+basePackPath+'/**/*'],{base, allowEmpty: true})
        .pipe($.if(env==='dev',$.watch([base+'/**/*','!'+base+'/app.json','!'+base+'/**/*.*___jb_tmp___','!'+basePackPath+'/**/*'],{base},function(event){
            // console.log('处理'+event.path)w
            writeLastLine('处理'+event.path+'......')
        })))
        .pipe(gulp.dest(target));
})


gulp.task('subMode:createUniSubPackage',async function(done){
    await (fs.mkdirs(base))
    let f=$.filter([base+'/common/vendor.js',base+'/common/main.js',base+'/common/runtime.js',base+'/pages/**/*.js'],{restore:true})
    let filterVendor=$.filter([base+'/common/vendor.js'],{restore:true})
    let filterJs=$.filter([base+'/**/*.js','!'+base+'/common/vendor.js','!'+base+'/common/main.js','!'+base+'/common/runtime.js'],{restore:true})
    let filterWxss=$.filter([base+'/**/*.wxss'],{restore:true})
    let filterJson=$.filter([base+'/**/*.json'],{restore:true})
    // let filterWxml=$.filter([base+'/**/*.wxml'],{restore:true})
    return gulp.src([base+'/**',base,'!'+base+'/*.*'],{base,allowEmpty:true})
        .pipe($.if(env==='dev',$.watch([base+'/**',base,'!'+base+'/*.*'],{base},function(event){
            // console.log('处理'+event.path)
            writeLastLine('处理'+event.path+'......')
        })))
        .pipe($.filter(async function(file){
            if(file.event === 'unlink'){
                try{
                    await del([file.path.replace(basePath,path.resolve(__dirname,subModePath))],{force:true})
                }catch(e){}
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
            if(!fs.existsSync('./src/'+this.file.relative.replace(/json$/,'vue')) && !fs.existsSync('./src/'+this.file.relative.replace(/json$/,'nvue'))){
                return match
            }
            let json=JSON.parse(this.file.contents.toString())
            for(let i in json.usingComponents){
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
        .pipe($.if(env === 'build',$.cleanCss({
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
            let result=`\n${match}`
            if(!this.file.relative.match(/^common[\\/]+main.wxss/i)){
                result=mainWxss+result
            }
            return result
        },{
            skipBinary:false
        }))
        .pipe(filterWxss.restore)
        .pipe(gulp.dest(subModePath))
})

gulp.task('subMode:copyWxResource',function(){
    let filterJs=$.filter(['src/wxresource/**/*.js'],{restore:true})
    return gulp.src(['src/wxresource/**','src/wxresource'],{base:'src/wxresource',allowEmpty: true})
        .pipe($.if(env === 'dev',$.watch(['src/wxresource/**','src/wxresource','!src/wxresource/**/*.*___jb_tmp___'],{base:'src/wxresource'},function(event){
            // console.log('处理'+event.path)
            writeLastLine('处理'+event.path+'......')
        })))
        .pipe(filterJs)
        .pipe(strip())
        .pipe(uniRequireWxResource())
        .pipe(filterJs.restore)
        .pipe($.filter(async function(file){
            if(file.event === 'unlink'){
                await del([file.path.replace(path.resolve(__dirname,'src/wxresource'),path.resolve(__dirname,subModePath))],{force:true})
                return false
            }else{
                return true
            }
        }))
        .pipe(gulp.dest(subModePath));
})


gulp.task('mpWxSubMode',gulp.series(function(done){
    subModePath = path.resolve(__dirname, target, projectToSubPackageConfig.subPackagePath)
    console.log('对uni-app进行解耦构建，解除uni-app对原生小程序方法的改写，此过程如果出现权限问题，请使用管理员权限运行')
    done()
},'clean:previewDist', async function(done){
    await fs.outputFile(subModePath+'/pack.config.js', `module.exports={packPath:'/${projectToSubPackageConfig.subPackagePath}'}`)
    done()
}, gulp.parallel('subMode:createUniSubPackage','subMode:copyWxResource','watch:pagesJson','watch:baseAppJson','watch:mainAppJson','watch:mainWeixinMp'),function(done){
    if(env === 'build'){
        return  gulp.src([base+'/app.json'],{base,allowEmpty: true})
            .pipe(gulp.dest(target));
    }else{
        done()
    }
},function(done){
    done()
    if(env === 'build'){
        process.exit()
    }
}))

gulp.task('startToPackServe',gulp.series(async function(done){
    if(!(await (fs.exists(base)))){
        await (fs.mkdirs(base))
    }
    done()
},'clean:base',function(done){
    gulp.watch(base+'/app.json',{events:['all']}, function(){
        done()
    })
},'mpWxSubMode'))
